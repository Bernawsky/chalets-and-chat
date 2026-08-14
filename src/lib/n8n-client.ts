export const N8N_WEBHOOK_URL =
  "https://bernawsky.app.n8n.cloud/webhook/26561399-1024-484e-b0ae-dfe909711fd7";

/** Envio direto do navegador ao webhook do n8n (fallback do server function). */
export async function enviarRelatorioN8nDireto(dados: unknown) {
  const res = await fetch(N8N_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  if (!res.ok) throw new Error(`Falha no envio ao n8n (${res.status})`);
  return true;
}
