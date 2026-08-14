export const N8N_WEBHOOK_URL =
  "https://bernawsky.app.n8n.cloud/webhook/26561399-1024-484e-b0ae-dfe909711fd7";

export type EnvioN8nResultado = {
  ok: boolean;
  erro: string | null;
  status: number;
};

/**
 * Envio direto do navegador ao webhook do n8n (fallback do server function).
 * Segue o padrão resilient: loga erros no console e nunca lança exceção,
 * retornando um objeto de resultado para o chamador decidir o que mostrar.
 */
export async function enviarRelatorioN8nDireto(
  dados: unknown,
  url: string = N8N_WEBHOOK_URL,
): Promise<EnvioN8nResultado> {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });

    if (!response.ok) {
      const corpo = await response.text().catch(() => "");
      console.error("Erro ao enviar:", response.status, corpo);
      return {
        ok: false,
        erro: `Falha no envio ao n8n (${response.status})`,
        status: response.status,
      };
    }

    console.log("Relatório enviado ao n8n");
    return { ok: true, erro: null, status: response.status };
  } catch (err) {
    // Erro de rede/CORS — o servidor não respondeu.
    console.error("Falha de rede/CORS:", err);
    return {
      ok: false,
      erro:
        err instanceof Error
          ? `Falha de rede/CORS: ${err.message}`
          : "Falha de rede/CORS ao enviar ao n8n",
      status: 0,
    };
  }
}
