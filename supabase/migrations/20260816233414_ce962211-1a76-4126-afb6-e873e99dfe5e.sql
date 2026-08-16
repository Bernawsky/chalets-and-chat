ALTER TABLE public.pedidos ADD COLUMN IF NOT EXISTS pousada text NOT NULL DEFAULT 'Vale do Sol';

UPDATE public.pedidos SET pousada = 'Vale do Sol' WHERE pousada IS NULL OR length(trim(pousada)) = 0;

CREATE INDEX IF NOT EXISTS pedidos_pousada_idx ON public.pedidos (pousada);

DROP POLICY IF EXISTS "Qualquer pessoa pode registrar pedidos" ON public.pedidos;

CREATE POLICY "Qualquer pessoa pode registrar pedidos"
ON public.pedidos
FOR INSERT
TO anon, authenticated
WITH CHECK (
  status = 'ativo'
  AND motivo_cancelamento IS NULL
  AND cancelado_at IS NULL
  AND atualizado_por IS NULL
  AND length(titulo) <= 300
  AND (length(saudacao) >= 1 AND length(saudacao) <= 300)
  AND (length(trim(pousada)) >= 1 AND length(pousada) <= 80)
  AND jsonb_typeof(unidades) = 'array'
  AND (jsonb_array_length(unidades) >= 1 AND jsonb_array_length(unidades) <= 50)
  AND pg_column_size(unidades) <= 20000
  AND (total_unidades >= 1 AND total_unidades <= 50)
  AND (total_itens >= 0 AND total_itens <= 1000)
  AND (total_pessoas >= 1 AND total_pessoas <= 500)
);