-- 1. Criação da Tabela de Empréstimos (Girafa Bank)
CREATE TABLE IF NOT EXISTS public.loans (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  amount numeric NOT NULL,
  installments integer NOT NULL,
  monthly_payment numeric NOT NULL,
  total_payment numeric NOT NULL,
  status text DEFAULT 'Análise', -- Mapeia para: Análise, Aprovado, Rejeitado
  created_at timestamp with time zone DEFAULT now()
);

-- Habilitar RLS para Empréstimos
ALTER TABLE public.loans ENABLE ROW LEVEL SECURITY;

-- Políticas de RLS para Empréstimos (Usuário vê o seu, Cria o seu)
DROP POLICY IF EXISTS "Users can see own loans" ON public.loans;
CREATE POLICY "Users can see own loans" ON public.loans FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own loans" ON public.loans;
CREATE POLICY "Users can insert own loans" ON public.loans FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 2. Adição do Sistema de Indicação (Afiliados) na tabela Profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS referred_by uuid REFERENCES public.profiles(id);

-- 3. Políticas de Super Admin (Permitir ao Abel ver TUDO para o Dashboard Administrativo)
DROP POLICY IF EXISTS "Admin read all profiles" ON public.profiles;
CREATE POLICY "Admin read all profiles" ON public.profiles FOR SELECT USING ( (auth.jwt()->>'email') IN ('abel@girafatech.com', 'abel.souza.magalhaes@hotmail.com', 'asmagsasp@gmail.com', 'admin@girafatech.com') );

DROP POLICY IF EXISTS "Admin update all profiles" ON public.profiles;
CREATE POLICY "Admin update all profiles" ON public.profiles FOR UPDATE USING ( (auth.jwt()->>'email') IN ('abel@girafatech.com', 'abel.souza.magalhaes@hotmail.com', 'asmagsasp@gmail.com', 'admin@girafatech.com') );

DROP POLICY IF EXISTS "Admin read all investments" ON public.user_investments;
CREATE POLICY "Admin read all investments" ON public.user_investments FOR SELECT USING ( (auth.jwt()->>'email') IN ('abel@girafatech.com', 'abel.souza.magalhaes@hotmail.com', 'asmagsasp@gmail.com', 'admin@girafatech.com') );

DROP POLICY IF EXISTS "Admin update all investments" ON public.user_investments;
CREATE POLICY "Admin update all investments" ON public.user_investments FOR UPDATE USING ( (auth.jwt()->>'email') IN ('abel@girafatech.com', 'abel.souza.magalhaes@hotmail.com', 'asmagsasp@gmail.com', 'admin@girafatech.com') );

DROP POLICY IF EXISTS "Admin read all loans" ON public.loans;
CREATE POLICY "Admin read all loans" ON public.loans FOR ALL USING ( (auth.jwt()->>'email') IN ('abel@girafatech.com', 'abel.souza.magalhaes@hotmail.com', 'asmagsasp@gmail.com', 'admin@girafatech.com') );

DROP POLICY IF EXISTS "Admin update all loans" ON public.loans;
CREATE POLICY "Admin update all loans" ON public.loans FOR UPDATE USING ( (auth.jwt()->>'email') IN ('abel@girafatech.com', 'abel.souza.magalhaes@hotmail.com', 'asmagsasp@gmail.com', 'admin@girafatech.com') );

-- FIM DA ATUALIZAÇÃO
