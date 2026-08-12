import { createFileRoute } from "@tanstack/react-router";
import { MetricasDashboard } from "@/components/metricas-dashboard";

export const Route = createFileRoute("/metricas")({
  head: () => ({
    meta: [
      { title: "Métricas de Pedidos — Cestas de Café da Manhã" },
      {
        name: "description",
        content:
          "Acompanhe pedidos, unidades atendidas, pessoas no café e itens extras por dia, semana, mês e ano.",
      },
      { property: "og:title", content: "Métricas de Pedidos — Cestas de Café da Manhã" },
      {
        property: "og:description",
        content: "Fechamento de pedidos por período com gráficos e ranking por unidade.",
      },
    ],
  }),
  component: MetricasPage,
});

function MetricasPage() {
  return <MetricasDashboard />;
}
