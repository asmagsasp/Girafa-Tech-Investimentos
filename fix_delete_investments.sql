-- Correção da restrição de Chave Estrangeira (ForeignKey) permitindo a remoção de Oportunidades
-- que já foram compradas (sem quebrar ou deletar os investimentos ativos dos usuários).

ALTER TABLE public.user_investments DROP CONSTRAINT IF EXISTS user_investments_option_id_fkey;

ALTER TABLE public.user_investments 
ADD CONSTRAINT user_investments_option_id_fkey 
FOREIGN KEY (option_id) 
REFERENCES public.investment_options(id) 
ON DELETE SET NULL;
