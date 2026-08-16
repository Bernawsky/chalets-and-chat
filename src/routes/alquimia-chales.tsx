import { createFileRoute } from "@tanstack/react-router";
import { PedidosPortal } from "@/components/pedidos-portal";

export const Route = createFileRoute("/alquimia-chales")({
  head: () => ({
    meta: [
      { title: "Alquimia Chalés — Pedidos de Café da Manhã" },
      {
        name: "description",
        content:
          "Sistema de pedidos da pousada Alquimia Chalés: monte as cestas dos chalés Quartzo Rosa, Rubi, Ametista e demais e envie no grupo do WhatsApp.",
      },
      { property: "og:title", content: "Alquimia Chalés — Pedidos de Café da Manhã" },
      {
        property: "og:description",
        content: "Monte as cestas de café da manhã dos chalés da Alquimia e envie no WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <PedidosPortal slug="alquimia-chales" />,
});
