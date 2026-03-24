-- 1. Criação da Tabela de Transações (Extrato)
CREATE TABLE IF NOT EXISTS public.transactions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  amount numeric NOT NULL,
  type text NOT NULL, -- 'Depósito', 'Saque', 'Investimento', 'Lucro', 'Estorno', 'Bônus'
  description text,
  created_at timestamp with time zone DEFAULT now()
);

-- 2. Habilitar RLS para Transações
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- 3. Políticas de RLS
DROP POLICY IF EXISTS "Users can see own transactions" ON public.transactions;
CREATE POLICY "Users can see own transactions" ON public.transactions FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admin can see all transactions" ON public.transactions;
CREATE POLICY "Admin can see all transactions" ON public.transactions FOR SELECT USING ( (auth.jwt()->>'email') IN ('admin@girafatech.com', 'abel@girafatech.com', 'abel.souza.magalhaes@hotmail.com') );

-- 4. Atualização da Função de Saldo para incluir Registro Automático de Transação
CREATE OR REPLACE FUNCTION public.handle_balance_change(user_id_param uuid, amount_param numeric, type_param text DEFAULT 'Sistema', desc_param text DEFAULT 'Ajuste de Saldo')
RETURNS numeric
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_balance numeric;
BEGIN
  -- Atualiza ou Insere o Perfil
  INSERT INTO public.profiles (id, balance)
  VALUES (user_id_param, COALESCE(amount_param, 0))
  ON CONFLICT (id) DO UPDATE 
  SET balance = COALESCE(profiles.balance, 0) + COALESCE(amount_param, 0)
  RETURNING balance INTO new_balance;

  -- Registra a Transação no Extrato
  INSERT INTO public.transactions (user_id, amount, type, description)
  VALUES (user_id_param, amount_param, type_param, desc_param);
  
  RETURN new_balance;
END;
$$;
