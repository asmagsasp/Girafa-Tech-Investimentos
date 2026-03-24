import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7"

const RECARGAPAY_API_KEY = Deno.env.get('RECARGAPAY_API_KEY')
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { amount, pix_key, user_id } = await req.json()

    // 1. Initialize Supabase Admin
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

    // 2. Double-check balance strictly on server-side
    const { data: profile, error: profErr } = await supabase
      .from('profiles')
      .select('balance')
      .eq('id', user_id)
      .single()

    if (profErr || !profile || profile.balance < amount) {
      console.error('Saldo insuficiente:', { profErr, profile, amount })
      return new Response(JSON.stringify({ error: `Saldo insuficiente no sistema (Possui: R$ ${profile?.balance ?? 0}, Tentou: R$ ${amount}).` }), { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      })
    }

    // 3. Initiate RecargaPay PIX Withdrawal
    // Docs: https://api.recargapay.com.br/v1/pix/out
    const recargaResponse = await fetch('https://api.recargapay.com.br/v1/pix/out', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RECARGAPAY_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100), // convert to cents
        pix_key: pix_key,
        external_id: `withdraw_${Date.now()}_${user_id.slice(0,8)}`,
        description: 'Resgate Girafa Tech'
      })
    })

    const recargaData = await recargaResponse.json()

    if (!recargaResponse.ok) {
       console.error('RecargaPay API Error:', recargaData)
       return new Response(JSON.stringify({ 
         error: 'Erro no processador de pagamento (RecargaPay).', 
         details: recargaData 
       }), { 
         headers: { ...corsHeaders, 'Content-Type': 'application/json' },
         status: 500 
       })
    }

    // 4. Update Profile Balance (Subtract only AFTER success)
    // Usando RPC para garantir atomicidade se possível, ou update manual
    const newBalance = Number(profile.balance) - Number(amount)
    
    // Registrar a transação primeiro (histórico)
    const { error: transErr } = await supabase
      .from('transactions')
      .insert({
         user_id: user_id,
         amount: -amount,
         type: 'Saque',
         description: 'Resgate PIX via RecargaPay Sucesso'
      })

    const { error: updateErr } = await supabase
      .from('profiles')
      .update({ balance: newBalance })
      .eq('id', user_id)

    if (updateErr || transErr) {
       console.error('BALANCE/TRANSACTION SYNC ERROR AFTER PAYMENT:', updateErr || transErr)
    }

    return new Response(JSON.stringify({ 
      success: true, 
      transaction_id: recargaData.id, 
      new_balance: newBalance 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    })

  } catch (err) {
    console.error('SERVER FATAL ERROR:', err)
    return new Response(JSON.stringify({ error: 'Erro interno ao processar saque.', message: err.message }), { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500 
    })
  }
})

