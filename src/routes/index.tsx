import { createFileRoute } from "@tanstack/react-router";
import { PedidosPortal } from "@/components/pedidos-portal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pedidos de Café da Manhã — Pousadas Quitutes" },
      {
        name: "description",
        content:
          "Entre com o usuário da pousada, monte os pedidos das cestas de café da manhã e envie rapidamente no grupo do WhatsApp.",
      },
      { property: "og:title", content: "Pedidos de Café da Manhã — Pousadas Quitutes" },
      {
        property: "og:description",
        content: "Login por pousada para montar e enviar os pedidos das cestas de café da manhã.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  return <PedidosPortal />;
}
