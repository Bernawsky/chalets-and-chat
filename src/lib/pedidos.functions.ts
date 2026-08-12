import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { calcularTotais, validarUnidades } from "@/lib/pedidos-validacao";
import type { Pedido } from "@/lib/pedidos";

async function exigirAdmin(context: { supabase: any; userId: string }) {
  const { data, error } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "admin",
  });
  if (error || !data) throw new Error("Acesso negado: apenas administradores.");
}

/** Edita um pedido existente (validação completa no backend). */
export const editarPedido = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: number; saudacao: string; unidades: unknown }) => input)
  .handler(async ({ data, context }) => {
    await exigirAdmin(context as never);

    const id = Number(data.id);
    if (!Number.isInteger(id) || id <= 0) throw new Error("Pedido inválido.");

    const saudacao = String(data.saudacao ?? "").trim().slice(0, 200);
    if (!saudacao) throw new Error("Informe a saudação do pedido.");

    const unidades = validarUnidades(data.unidades);
    const totais = calcularTotais(unidades);

    const { data: atual, error: erroBusca } = await context.supabase
      .from("pedidos")
      .select("id, status")
      .eq("id", id)
      .maybeSingle();
    if (erroBusca) throw new Error(erroBusca.message);
    if (!atual) throw new Error("Pedido não encontrado.");
    if (atual.status === "cancelado") throw new Error("Pedido cancelado não pode ser editado.");

    const { data: atualizado, error } = await context.supabase
      .from("pedidos")
      .update({
        titulo: saudacao,
        saudacao,
        unidades: unidades as never,
        ...totais,
        atualizado_por: context.userId,
      })
      .eq("id", id)
      .select(
        "id, created_at, titulo, saudacao, unidades, total_unidades, total_itens, total_pessoas, status, motivo_cancelamento, cancelado_at, updated_at",
      )
      .maybeSingle();

    if (error) throw new Error(error.message);
    if (!atualizado) throw new Error("Não foi possível atualizar o pedido.");
    return atualizado as unknown as Pedido;
  });

/** Cancela um pedido inteiro. */
export const cancelarPedido = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: number; motivo?: string }) => input)
  .handler(async ({ data, context }) => {
    await exigirAdmin(context as never);

    const id = Number(data.id);
    if (!Number.isInteger(id) || id <= 0) throw new Error("Pedido inválido.");
    const motivo = String(data.motivo ?? "").trim().slice(0, 280);

    const { data: atual, error: erroBusca } = await context.supabase
      .from("pedidos")
      .select("id, status")
      .eq("id", id)
      .maybeSingle();
    if (erroBusca) throw new Error(erroBusca.message);
    if (!atual) throw new Error("Pedido não encontrado.");
    if (atual.status === "cancelado") throw new Error("Este pedido já está cancelado.");

    const { data: cancelado, error } = await context.supabase
      .from("pedidos")
      .update({
        status: "cancelado",
        motivo_cancelamento: motivo || null,
        cancelado_at: new Date().toISOString(),
        atualizado_por: context.userId,
      })
      .eq("id", id)
      .select(
        "id, created_at, titulo, saudacao, unidades, total_unidades, total_itens, total_pessoas, status, motivo_cancelamento, cancelado_at, updated_at",
      )
      .maybeSingle();

    if (error) throw new Error(error.message);
    if (!cancelado) throw new Error("Não foi possível cancelar o pedido.");
    return cancelado as unknown as Pedido;
  });
