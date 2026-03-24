-- Migration: Add Reconciliation Support to Transactions
ALTER TABLE public.transactions 
ADD COLUMN IF NOT EXISTS is_conferred BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS conferred_at TIMESTAMPTZ;

-- Update RLS: Ensure admins can update the conferred status
DROP POLICY IF EXISTS "Admins can update conferred status" ON public.transactions;
CREATE POLICY "Admins can update conferred status" 
ON public.transactions 
FOR UPDATE 
TO authenticated 
USING (
  auth.jwt() ->> 'email' IN ('admin@girafatech.com', 'abel@girafatech.com', 'abel.souza.magalhaes@hotmail.com', 'asmagsasp@gmail.com')
)
WITH CHECK (
  auth.jwt() ->> 'email' IN ('admin@girafatech.com', 'abel@girafatech.com', 'abel.souza.magalhaes@hotmail.com', 'asmagsasp@gmail.com')
);
