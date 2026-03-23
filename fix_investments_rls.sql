-- Habilita a leitura pública incondicional para as Oportunidades de Investimento
ALTER TABLE public.investment_options ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read access for investment options" ON public.investment_options;
CREATE POLICY "Public read access for investment options" ON public.investment_options FOR SELECT USING (true);
