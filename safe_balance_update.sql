-- FUNÇÃO PARA ATUALIZAÇÃO SEGURA DO SALDO (RPC)
-- Essa versão agora também cria o perfil caso ele não exista (Auto-cura).

CREATE OR REPLACE FUNCTION public.handle_balance_change(user_id_param uuid, amount_param numeric)
RETURNS numeric
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_balance numeric;
BEGIN
  INSERT INTO public.profiles (id, balance)
  VALUES (user_id_param, COALESCE(amount_param, 0))
  ON CONFLICT (id) DO UPDATE 
  SET balance = COALESCE(profiles.balance, 0) + COALESCE(amount_param, 0)
  RETURNING balance INTO new_balance;
  
  RETURN new_balance;
END;
$$;

-- Permissões
GRANT EXECUTE ON FUNCTION public.handle_balance_change(uuid, numeric) TO authenticated;
GRANT EXECUTE ON FUNCTION public.handle_balance_change(uuid, numeric) TO anon;
GRANT EXECUTE ON FUNCTION public.handle_balance_change(uuid, numeric) TO service_role;
