CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public' AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon, authenticated;

DROP POLICY IF EXISTS "Admins podem ver pedidos" ON public.pedidos;
CREATE POLICY "Admins podem ver pedidos" ON public.pedidos FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'::app_role));

DROP POLICY IF EXISTS "Admins podem editar pedidos" ON public.pedidos;
CREATE POLICY "Admins podem editar pedidos" ON public.pedidos FOR UPDATE TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'::app_role))
WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'::app_role));

DROP POLICY IF EXISTS "Admins podem excluir pedidos" ON public.pedidos;
CREATE POLICY "Admins podem excluir pedidos" ON public.pedidos FOR DELETE TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'::app_role));

DROP POLICY IF EXISTS "Ver proprio papel" ON public.user_roles;
CREATE POLICY "Ver proprio papel" ON public.user_roles FOR SELECT TO authenticated
USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Admins gerenciam papeis" ON public.user_roles;
CREATE POLICY "Admins gerenciam papeis" ON public.user_roles FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'::app_role))
WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'::app_role));

DROP POLICY IF EXISTS "Ver proprio perfil" ON public.profiles;
CREATE POLICY "Ver proprio perfil" ON public.profiles FOR SELECT TO authenticated
USING (auth.uid() = id OR EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'::app_role));