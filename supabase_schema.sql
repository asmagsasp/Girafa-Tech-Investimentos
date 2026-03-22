-- SQL Schema para Supabase (Girafa Tech Investimentos)

-- 1. Profiles (Dados do Usuário)
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  updated_at timestamp with time zone DEFAULT now(),
  full_name text,
  pix_key text,
  balance numeric DEFAULT 0,
  avatar_url text
);

-- RLS para Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can only see their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can only update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can only insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- 2. Investment Options (Disponíveis para todos)
CREATE TABLE IF NOT EXISTS public.investment_options (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT now(),
  validity integer NOT NULL,
  cost numeric NOT NULL,
  yield_percent numeric NOT NULL,
  fee numeric DEFAULT 5,
  final_amount numeric NOT NULL,
  created_by uuid REFERENCES auth.users(id)
);

-- RLS para Investment Options (Leitura para todos, Escrita para Autenticados)
ALTER TABLE public.investment_options ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access for investment options" ON public.investment_options FOR SELECT USING (true);
CREATE POLICY "Auth users can insert items" ON public.investment_options FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Auth users can delete items" ON public.investment_options FOR DELETE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Auth users can update items" ON public.investment_options FOR UPDATE USING (auth.uid() IS NOT NULL);

-- 3. User Investments (Investimentos Ativos)
CREATE TABLE IF NOT EXISTS public.user_investments (
  active_id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  option_id uuid REFERENCES public.investment_options(id),
  invested_at timestamp with time zone DEFAULT now(),
  invested_amount numeric NOT NULL,
  status text DEFAULT 'Ativo',
  -- Copia dados para histórico independente
  validity integer,
  yield_percent numeric,
  final_amount numeric
);

-- RLS para User Investments
ALTER TABLE public.user_investments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can see only their own investments" ON public.user_investments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert only their own" ON public.user_investments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete only their own" ON public.user_investments FOR DELETE USING (auth.uid() = user_id);

-- Trigger para criar perfil automaticamente no Signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, balance)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', 0);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Comente as 2 linhas abaixo caso já existam
-- DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
-- CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
