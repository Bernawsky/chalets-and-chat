import { createFileRoute } from "@tanstack/react-router";
import { PedidosPortal } from "@/components/pedidos-portal";

export const Route = createFileRoute("/itaoka-belvedere")({
  head: () => ({
    meta: [
      { title: "Pousada Itaoka Belvedere — Pedidos de Café da Manhã" },
      {
        name: "description",
        content:
          "Sistema de pedidos da Pousada Itaoka Belvedere: monte as cestas dos chalés Realize, Acredite, Sonhe, Inspire e Gratidão e envie no WhatsApp.",
      },
      { property: "og:title", content: "Pousada Itaoka Belvedere — Pedidos de Café da Manhã" },
      {
        property: "og:description",
        content: "Monte as cestas de café da manhã dos chalés da Itaoka Belvedere e envie no WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <PedidosPortal slug="itaoka-belvedere" />,
});
