import { useState } from "react";
import { FileDown, Send, Package } from "lucide-react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { exportarPedidosCSV, exportarPedidosPDF, type Ranking } from "@/lib/export-pedidos";
import { enviarRelatorioN8n } from "@/lib/n8n.functions";
import { enviarRelatorioN8nDireto } from "@/lib/n8n-client";
import type { Pedido } from "@/lib/pedidos";

type Props = {
  aberto: boolean;
  onClose: () => void;
  pedidos: Pedido[];
  ranking: Ranking[];
  periodo: string;
  rotuloPeriodo: string;
};

type Acao = "tudo" | "webhook" | "arquivos";

export function ExportarDialog({
  aberto,
  onClose,
  pedidos,
  ranking,
  periodo,
  rotuloPeriodo,
}: Props) {
  const [ocupado, setOcupado] = useState<Acao | null>(null);
  const enviar = useServerFn(enviarRelatorioN8n);

  const executar = async (acao: Acao) => {
    setOcupado(acao);
    try {
      const baixar = acao !== "webhook";
      const { nomeArquivo, base64 } = exportarPedidosPDF(
        pedidos,
        ranking,
        periodo,
        rotuloPeriodo,
        baixar,
      );
      if (baixar) {
        exportarPedidosCSV(pedidos, ranking, periodo);
        toast.success("PDF e CSV baixados");
      }

      if (acao !== "arquivos") {
        const payload = {
          arquivo: nomeArquivo,
          pdfBase64: base64,
          periodo,
          rotuloPeriodo,
          totalPedidos: pedidos.length,
          ranking,
        };
        const r = await enviar({ data: payload });
        if (r.ok) {
          toast.success("Relatório enviado ao n8n");
        } else {
          // Fallback: envio direto pelo navegador (lida com rede/CORS internamente).
          const direto = await enviarRelatorioN8nDireto({
            origem: "lovable-quitutes",
            geradoEm: new Date().toISOString(),
            ...payload,
          });
          if (direto.ok) {
            toast.success("Relatório enviado ao n8n");
          } else {
            toast.warning(direto.erro ?? r.erro ?? "Falha no envio ao n8n");
          }
        }
      }
      onClose();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Falha na exportação");
    } finally {
      setOcupado(null);
    }
  };

  return (
    <Dialog open={aberto} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading">Exportar relatório</DialogTitle>
          <DialogDescription>
            {pedidos.length} pedido(s) {rotuloPeriodo}. Escolha o que deseja fazer.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Button
            className="justify-start gap-2"
            disabled={ocupado !== null}
            onClick={() => executar("tudo")}
          >
            <Package className="size-4" aria-hidden="true" />
            Baixar PDF e CSV + enviar ao n8n
          </Button>
          <Button
            variant="outline"
            className="justify-start gap-2"
            disabled={ocupado !== null}
            onClick={() => executar("webhook")}
          >
            <Send className="size-4" aria-hidden="true" />
            Somente enviar ao n8n
          </Button>
          <Button
            variant="outline"
            className="justify-start gap-2"
            disabled={ocupado !== null}
            onClick={() => executar("arquivos")}
          >
            <FileDown className="size-4" aria-hidden="true" />
            Somente baixar PDF e CSV
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
