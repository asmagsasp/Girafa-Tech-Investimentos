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
CREATE POLICY "Users can see own loans" ON public.loans FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own loans" ON public.loans FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 2. Adição do Sistema de Indicação (Afiliados) na tabela Profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS referred_by uuid REFERENCES public.profiles(id);

-- 3. Políticas de Super Admin (Permitir ao Abel ver TUDO para o Dashboard Administrativo)
-- Usamos o e-mail extraído do JWT para dar acesso irrestrito
CREATE POLICY "Admin read all profiles" ON public.profiles FOR SELECT USING ( (auth.jwt()->>'email') IN ('abel@girafatech.com', 'abel.souza.magalhaes@hotmail.com') );
CREATE POLICY "Admin update all profiles" ON public.profiles FOR UPDATE USING ( (auth.jwt()->>'email') IN ('abel@girafatech.com', 'abel.souza.magalhaes@hotmail.com') );

CREATE POLICY "Admin read all investments" ON public.user_investments FOR SELECT USING ( (auth.jwt()->>'email') IN ('abel@girafatech.com', 'abel.souza.magalhaes@hotmail.com') );
CREATE POLICY "Admin update all investments" ON public.user_investments FOR UPDATE USING ( (auth.jwt()->>'email') IN ('abel@girafatech.com', 'abel.souza.magalhaes@hotmail.com') );

CREATE POLICY "Admin read all loans" ON public.loans FOR ALL USING ( (auth.jwt()->>'email') IN ('abel@girafatech.com', 'abel.souza.magalhaes@hotmail.com') );
CREATE POLICY "Admin update all loans" ON public.loans FOR UPDATE USING ( (auth.jwt()->>'email') IN ('abel@girafatech.com', 'abel.souza.magalhaes@hotmail.com') );

-- FIM DA ATUALIZAÇÃO
