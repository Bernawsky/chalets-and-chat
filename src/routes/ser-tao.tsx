import { createFileRoute } from "@tanstack/react-router";
import { PedidosPortal } from "@/components/pedidos-portal";

export const Route = createFileRoute("/ser-tao")({
  head: () => ({
    meta: [
      { title: "Pousada Ser.Tão — Pedidos de Café da Manhã" },
      {
        name: "description",
        content:
          "Sistema de pedidos da Pousada Ser.Tão: monte as cestas de café da manhã dos quartos e envie no grupo do WhatsApp.",
      },
      { property: "og:title", content: "Pousada Ser.Tão — Pedidos de Café da Manhã" },
      {
        property: "og:description",
        content: "Monte as cestas de café da manhã dos quartos da Ser.Tão e envie no WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <PedidosPortal slug="ser-tao" />,
});
