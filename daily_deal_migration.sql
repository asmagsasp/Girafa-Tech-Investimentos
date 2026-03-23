-- 1. Adicionar colunas para a Oportunidade do Dia
ALTER TABLE public.investment_options 
ADD COLUMN IF NOT EXISTS is_daily_deal BOOLEAN DEFAULT false;

ALTER TABLE public.investment_options 
ADD COLUMN IF NOT EXISTS deal_start_at TIMESTAMP WITH TIME ZONE;

ALTER TABLE public.investment_options 
ADD COLUMN IF NOT EXISTS deal_end_at TIMESTAMP WITH TIME ZONE;

-- 2. Recriar Views ou Permissões se necessário (geralmente não precisa, mas garante)
GRANT ALL ON public.investment_options TO authenticated;
GRANT ALL ON public.investment_options TO service_role;
GRANT ALL ON public.investment_options TO anon;

-- Comentário: Colunas adicionadas com sucesso. 🦒⚡🎰
