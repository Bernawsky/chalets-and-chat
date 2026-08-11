CREATE TABLE public.pedidos (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  titulo TEXT NOT NULL DEFAULT '',
  saudacao TEXT NOT NULL DEFAULT '',
  unidades JSONB NOT NULL DEFAULT '[]'::jsonb,
  total_unidades INTEGER NOT NULL DEFAULT 0,
  total_itens INTEGER NOT NULL DEFAULT 0,
  total_pessoas INTEGER NOT NULL DEFAULT 0
);

GRANT SELECT, INSERT ON public.pedidos TO anon;
GRANT USAGE, SELECT ON SEQUENCE public.pedidos_id_seq TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.pedidos TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE public.pedidos_id_seq TO authenticated;
GRANT ALL ON public.pedidos TO service_role;

ALTER TABLE public.pedidos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Qualquer pessoa pode ver pedidos"
  ON public.pedidos FOR SELECT
  USING (true);

CREATE POLICY "Qualquer pessoa pode registrar pedidos"
  ON public.pedidos FOR INSERT
  WITH CHECK (true);

CREATE INDEX pedidos_created_at_idx ON public.pedidos (created_at DESC);