DROP POLICY IF EXISTS "Admins gerenciam papeis" ON public.user_roles;
REVOKE INSERT, UPDATE, DELETE ON public.user_roles FROM authenticated;