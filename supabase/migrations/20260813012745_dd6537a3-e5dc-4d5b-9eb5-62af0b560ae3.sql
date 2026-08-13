-- pedidos: restrict reads to admins
DROP POLICY IF EXISTS "Qualquer pessoa pode ver pedidos" ON public.pedidos;
CREATE POLICY "Admins podem ver pedidos"
ON public.pedidos FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

REVOKE SELECT ON public.pedidos FROM anon;
GRANT INSERT ON public.pedidos TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.pedidos TO authenticated;
GRANT ALL ON public.pedidos TO service_role;

-- pedidos: constrain public inserts
DROP POLICY IF EXISTS "Qualquer pessoa pode registrar pedidos" ON public.pedidos;
CREATE POLICY "Qualquer pessoa pode registrar pedidos"
ON public.pedidos FOR INSERT TO anon, authenticated
WITH CHECK (
  status = 'ativo'
  AND motivo_cancelamento IS NULL
  AND cancelado_at IS NULL
  AND atualizado_por IS NULL
  AND length(titulo) <= 300
  AND length(saudacao) BETWEEN 1 AND 300
  AND jsonb_typeof(unidades) = 'array'
  AND jsonb_array_length(unidades) BETWEEN 1 AND 50
  AND pg_column_size(unidades) <= 20000
  AND total_unidades BETWEEN 1 AND 50
  AND total_itens BETWEEN 0 AND 1000
  AND total_pessoas BETWEEN 1 AND 500
);

-- user_roles: own role only, admins see all
DROP POLICY IF EXISTS "Usuarios autenticados podem ver papeis" ON public.user_roles;
CREATE POLICY "Ver proprio papel"
ON public.user_roles FOR SELECT TO authenticated
USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'::app_role));

-- trigger functions must not be directly callable
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;