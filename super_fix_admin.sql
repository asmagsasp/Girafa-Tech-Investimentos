-- SUPER FIX: Limpeza Total de Permissões e Reativação das Ferramentas de Admin
-- Rode este código inteiro no SQL Editor para zerar qualquer trava no banco.

-- 1. Garante que a coluna is_active existe e está correta
ALTER TABLE public.investment_options ADD COLUMN IF NOT EXISTS is_active boolean DEFAULT true;
UPDATE public.investment_options SET is_active = true WHERE is_active IS NULL;

-- 2. Abre todas as portas de RLS para a tabela de planos (Acesso Total para Autenticados)
-- Isso remove qualquer conflito de políticas antigas que "se batiam".
ALTER TABLE public.investment_options DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.investment_options ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read access for investment options" ON public.investment_options;
CREATE POLICY "Public read access for investment options" ON public.investment_options FOR SELECT USING (true);

DROP POLICY IF EXISTS "Auth users can insert items" ON public.investment_options;
CREATE POLICY "Auth users can insert items" ON public.investment_options FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Auth users can update items" ON public.investment_options;
CREATE POLICY "Auth users can update items" ON public.investment_options FOR UPDATE USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Auth users can delete items" ON public.investment_options;
CREATE POLICY "Auth users can delete items" ON public.investment_options FOR DELETE USING (auth.uid() IS NOT NULL);

-- 3. Garante que a tabela user_investments não trave a exclusão dos planos (Caso você queira deletar de vez)
ALTER TABLE public.user_investments DROP CONSTRAINT IF EXISTS user_investments_option_id_fkey;
ALTER TABLE public.user_investments ADD CONSTRAINT user_investments_option_id_fkey 
  FOREIGN KEY (option_id) REFERENCES public.investment_options(id) ON DELETE SET NULL;
