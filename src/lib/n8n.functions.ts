import { createServerFn } from "@tanstack/react-start";

const WEBHOOK_URL =
  "https://bernawsky.app.n8n.cloud/webhook/26561399-1024-484e-b0ae-dfe909711fd7";

export type EnvioN8nInput = {
  arquivo: string;
  pdfBase64: string;
  periodo: string;
  rotuloPeriodo: string;
  totalPedidos: number;
  ranking: { unidade: string; total: number }[];
};

export const enviarRelatorioN8n = createServerFn({ method: "POST" })
  .inputValidator((input: EnvioN8nInput) => {
    if (!input?.pdfBase64) throw new Error("PDF ausente");
    return input;
  })
  .handler(async ({ data }) => {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        origem: "lovable-quitutes",
        geradoEm: new Date().toISOString(),
        ...data,
      }),
    });
    if (!res.ok) {
      throw new Error(`Falha no envio ao n8n (${res.status})`);
    }
    return { ok: true as const };
  });
