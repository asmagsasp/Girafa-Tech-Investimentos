-- Atualização da Tabela de Oportunidades para Valores Mínimo e Máximo
ALTER TABLE public.investment_options ADD COLUMN IF NOT EXISTS min_amount numeric DEFAULT 0;
ALTER TABLE public.investment_options ADD COLUMN IF NOT EXISTS max_amount numeric DEFAULT 999999;

-- Migrar os dados antigos para que mantenham o valor base (evita erro)
UPDATE public.investment_options 
SET min_amount = cost, max_amount = cost * 10
WHERE min_amount = 0 AND cost > 0;
