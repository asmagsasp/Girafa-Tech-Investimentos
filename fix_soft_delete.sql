-- Solução Definitiva: Soft Delete (Desativação Suave)
-- Em vez de apagar do Banco de Dados e causar conflitos de histórico com clientes que já compraram,
-- nós apenas mudamos o status do investimento para "inativo" e ele some da vitrine sozinho.

-- 1. Cria a coluna de controle de status (caso não exista)
ALTER TABLE public.investment_options ADD COLUMN IF NOT EXISTS is_active boolean DEFAULT true;

-- 2. Garante que todos os planos atuais estão marcados como ativos
UPDATE public.investment_options SET is_active = true WHERE is_active IS NULL;

-- 3. Atualiza as permissões para garantir que o Admin consiga atualizar o status
DROP POLICY IF EXISTS "Auth users can update items" ON public.investment_options;
CREATE POLICY "Auth users can update items" ON public.investment_options FOR UPDATE USING (auth.uid() IS NOT NULL);
