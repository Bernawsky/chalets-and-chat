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
    const body = JSON.stringify({
      origem: "lovable-quitutes",
      geradoEm: new Date().toISOString(),
      ...data,
    });

    // Se o workflow não estiver ativo, a URL de produção responde 404;
    // nesse caso tentamos a URL de teste (modo "Execute workflow").
    const urls = [WEBHOOK_URL, WEBHOOK_URL.replace("/webhook/", "/webhook-test/")];

    let ultimoStatus = 0;
    for (const url of urls) {
      const res = await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body,
      });
      if (res.ok) return { ok: true as const, url };
      ultimoStatus = res.status;
      if (res.status !== 404) break;
    }

    throw new Error(
      ultimoStatus === 404
        ? "Webhook do n8n não registrado (404). Ative o workflow no n8n para a URL de produção funcionar."
        : `Falha no envio ao n8n (${ultimoStatus})`,
    );
  });

