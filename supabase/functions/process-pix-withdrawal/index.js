import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7"

const RECARGAPAY_API_KEY = Deno.env.get('RECARGAPAY_API_KEY')
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')

serve(async (req) => {
  const { amount, pix_key, user_id } = await req.json()

  // 1. Initialize Supabase Admin (for balance check & update)
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

  try {
    // 2. Double-check balance strictly on server-side
    const { data: profile, error: profErr } = await supabase
      .from('profiles')
      .select('balance')
      .eq('id', user_id)
      .single()

    if (profErr || !profile || profile.balance < amount) {
      return new Response(JSON.stringify({ error: 'Saldo insuficiente no sistema.' }), { status: 400 })
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
        external_id: `withdraw_${Date.now()}`,
        description: 'Resgate Girafa Tech'
      })
    })

    const recargaData = await recargaResponse.json()

    if (!recargaResponse.ok) {
       console.error('RecargaPay Error:', recargaData)
       return new Response(JSON.stringify({ error: 'Erro no processador de pagamento (RecargaPay).' }), { status: 500 })
    }

    // 4. Update Profile Balance (Subtract only AFTER success)
    const newBalance = profile.balance - amount
    const { error: updateErr } = await supabase
      .from('profiles')
      .update({ balance: newBalance })
      .eq('id', user_id)

    if (updateErr) {
       // Log internal error but the money was ALREADY SENT. This is a critical recovery state.
       console.error('BALANCE SYNC ERROR AFTER PAYMENT:', updateErr)
    }

    return new Response(JSON.stringify({ success: true, transaction_id: recargaData.id, new_balance: newBalance }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    })

  } catch (err) {
    console.error('SERVER FATAL:', err)
    return new Response(JSON.stringify({ error: 'Erro interno ao processar saque.' }), { status: 500 })
  }
})
