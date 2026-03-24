-- 1. Tabela de Orçamentos (Ecossistema)
CREATE TABLE IF NOT EXISTS public.budgets (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id), -- Opcional, se o cara estiver logado
  full_name text NOT NULL,
  email text NOT NULL,
  whatsapp text NOT NULL,
  project_type text NOT NULL, -- Aplicativo Móvel, Web Site, Automação, Outros
  description text NOT NULL,
  status text DEFAULT 'Pendente', -- Pendente, Em Análise, Respondido
  created_at timestamp with time zone DEFAULT now()
);

-- Habilitar RLS para Orçamentos
ALTER TABLE public.budgets ENABLE ROW LEVEL SECURITY;

-- Usuários podem ver apenas seus próprios orçamentos (se logados)
DROP POLICY IF EXISTS "Users can see own budgets" ON public.budgets;
CREATE POLICY "Users can see own budgets" ON public.budgets FOR SELECT USING (auth.uid() = user_id);

-- Qualquer um pode enviar um orçamento (mesmo sem estar logado na landing)
DROP POLICY IF EXISTS "Anyone can insert budgets" ON public.budgets;
CREATE POLICY "Anyone can insert budgets" ON public.budgets FOR INSERT WITH CHECK (true);

-- Admins podem gerenciar todos
DROP POLICY IF EXISTS "Admins manage budgets" ON public.budgets;
CREATE POLICY "Admins manage budgets" ON public.budgets FOR ALL USING ( 
  LOWER(auth.jwt()->>'email') IN ('abel@girafatech.com', 'abel.souza.magalhaes@hotmail.com', 'asmagsasp@gmail.com', 'admin@girafatech.com') 
);
