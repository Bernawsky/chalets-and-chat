import { createFileRoute } from "@tanstack/react-router";
import { PedidosPortal } from "@/components/pedidos-portal";

export const Route = createFileRoute("/vale-do-sol")({
  head: () => ({
    meta: [
      { title: "Vale do Sol — Pedidos de Café da Manhã" },
      {
        name: "description",
        content:
          "Sistema de pedidos da Pousada Vale do Sol: monte as cestas dos chalés e da suíte e envie no grupo do WhatsApp.",
      },
      { property: "og:title", content: "Vale do Sol — Pedidos de Café da Manhã" },
      {
        property: "og:description",
        content: "Monte as cestas dos chalés do Vale do Sol e envie no grupo do WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <PedidosPortal slug="vale-do-sol" />,
});
