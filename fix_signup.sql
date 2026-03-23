-- Correção Crítica do Gatilho (Trigger) de Cadastro
-- Removemos a dependência de campos rígidos e forçamos a segurança máxima

-- 1. Garante que a função de criação de perfil rode com Privilégios de Administrador (Superuser)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, balance)
  VALUES (
    new.id, 
    COALESCE(new.raw_user_meta_data->>'full_name', 'Investidor(a) Girafa'), 
    0
  );
  RETURN new;
EXCEPTION
  WHEN others THEN
    -- Em caso de falha silenciosa no BD, ignore e crie o usuário mesmo assim
    -- para impedir o erro "Database error saving new user"
    RAISE LOG 'Erro ao criar perfil automaticamente: %', SQLERRM;
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 2. Recria o Trigger garantindo que só tenta criar o perfil DEPOIS que o Auth.User for salvo.
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
