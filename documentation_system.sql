-- 1. Add role column to profiles if it doesn't exist
DO $$ 
BEGIN 
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='role') THEN
    ALTER TABLE public.profiles ADD COLUMN role text DEFAULT 'user';
  END IF;
END $$;

-- 2. Create the user_documents table
CREATE TABLE IF NOT EXISTS public.user_documents (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  doc_type text NOT NULL, -- 'RG_FRONT', 'RG_BACK', 'CNH', 'PROOF_ADDRESS'
  file_url text NOT NULL,
  status text DEFAULT 'Pendente', -- 'Pendente', 'Aprovado', 'Rejeitado'
  rejection_reason text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- 3. RLS for user_documents
ALTER TABLE public.user_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can see their own documents" 
ON public.user_documents FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own documents" 
ON public.user_documents FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all documents" 
ON public.user_documents FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Admins can update documents" 
ON public.user_documents FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- 4. Storage Bucket (This should be run in Supabase UI or via API)
-- insert into storage.buckets (id, name, public) values ('user-documents', 'user-documents', true);
