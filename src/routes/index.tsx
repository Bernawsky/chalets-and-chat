import { createFileRoute } from "@tanstack/react-router";
import { ReservasApp } from "@/components/reservas-app";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sistema de Pedidos — Cestas de Café da Manhã" },
      {
        name: "description",
        content:
          "Monte os pedidos de café da manhã dos chalés e da suíte e envie rapidamente no grupo do WhatsApp.",
      },
      { property: "og:title", content: "Sistema de Pedidos — Cestas de Café da Manhã" },
      {
        property: "og:description",
        content: "Monte os pedidos dos chalés e envie rapidamente no grupo do WhatsApp.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <ReservasApp />;
}
