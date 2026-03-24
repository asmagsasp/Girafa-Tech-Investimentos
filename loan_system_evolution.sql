-- Migration: Girafa Bank Evolution (Admin Only & Installments)

-- 1. Create installments table (Carnê)
CREATE TABLE IF NOT EXISTS public.loan_installments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  loan_id uuid REFERENCES public.loans(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  installment_number integer NOT NULL,
  amount numeric NOT NULL,
  due_date date NOT NULL,
  status text DEFAULT 'Pendente', -- Pendente, Pago, Atrasado, Cancelado
  paid_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now()
);

-- 2. Add columns to loans for better tracking
ALTER TABLE public.loans ADD COLUMN IF NOT EXISTS description text;
ALTER TABLE public.loans ADD COLUMN IF NOT EXISTS approved_at timestamp with time zone;

-- 3. RLS for installments
ALTER TABLE public.loan_installments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can see own installments" ON public.loan_installments;
CREATE POLICY "Users can see own installments" ON public.loan_installments FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admin can manage all installments" ON public.loan_installments;
CREATE POLICY "Admin can manage all installments" ON public.loan_installments FOR ALL USING ( 
  (auth.jwt()->>'email') IN ('admin@girafatech.com', 'abel@girafatech.com', 'abel.souza.magalhaes@hotmail.com', 'asmagsasp@gmail.com') 
);

-- 4. Function to process automatic liquidation from balance
-- This function can be called by a Cron or manually by Admin
CREATE OR REPLACE FUNCTION public.process_loan_liquidation()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  rec RECORD;
  processed_count integer := 0;
  total_liquidated numeric := 0;
  user_bal numeric;
BEGIN
  -- Iterate through pending or late installments due today or earlier
  FOR rec IN 
    SELECT i.*, p.balance 
    FROM public.loan_installments i
    JOIN public.profiles p ON i.user_id = p.id
    WHERE i.status IN ('Pendente', 'Atrasado')
      AND i.due_date <= CURRENT_DATE
      AND p.balance >= i.amount
  LOOP
    -- 1. Subtract from profile balance
    UPDATE public.profiles 
    SET balance = balance - rec.amount 
    WHERE id = rec.user_id
    RETURNING balance INTO user_bal;

    -- 2. Mark installment as paid
    UPDATE public.loan_installments 
    SET status = 'Pago', paid_at = now() 
    WHERE id = rec.id;

    -- 3. Register transaction
    INSERT INTO public.transactions (user_id, amount, type, description)
    VALUES (rec.user_id, -rec.amount, 'Saque', 'Liquidação Automática de Parcela #' || rec.installment_number || ' (Empréstimo)');

    processed_count := processed_count + 1;
    total_liquidated := total_liquidated + rec.amount;
  END LOOP;

  RETURN json_build_object(
    'processed', processed_count,
    'total_amount', total_liquidated
  );
END;
$$;
