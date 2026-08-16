import { useState } from "react";
import { LogIn, Lock, User } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { autenticarPousada, type Pousada } from "@/lib/pousadas";

type Props = {
  onEntrar: (pousada: Pousada) => void;
  /** Quando definido, só aceita o login desta pousada. */
  pousadaFixa?: Pousada;
};

export function PousadaLogin({ onEntrar, pousadaFixa }: Props) {
  const [usuario, setUsuario] = useState(pousadaFixa?.usuario ?? "");
  const [senha, setSenha] = useState("");

  const submeter = (e: React.FormEvent) => {
    e.preventDefault();
    const p = autenticarPousada(usuario, senha);
    if (!p || (pousadaFixa && p.slug !== pousadaFixa.slug)) {
      toast.error("Usuário ou senha inválidos");
      return;
    }
    toast.success(`Bem-vindo, ${p.nome}!`);
    onEntrar(p);
  };

  return (
    <div className="flex min-h-svh items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-sm">
        <span className="mb-4 flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Lock className="size-5" aria-hidden="true" />
        </span>
        <h1 className="font-heading text-xl font-bold text-card-foreground">
          {pousadaFixa ? pousadaFixa.nome : "Sistema de Pedidos"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Entre com o usuário e a senha da pousada para montar os pedidos.
        </p>

        <form className="mt-6 flex flex-col gap-4" onSubmit={submeter}>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">Usuário</span>
            <div className="flex items-center gap-2 rounded-lg border border-input bg-background px-3 focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/30">
              <User className="size-4 text-muted-foreground" aria-hidden="true" />
              <input
                type="text"
                required
                autoComplete="username"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                className="w-full bg-transparent py-2 text-sm text-foreground outline-none"
                placeholder="Vale do Sol"
              />
            </div>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">Senha</span>
            <div className="flex items-center gap-2 rounded-lg border border-input bg-background px-3 focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/30">
              <Lock className="size-4 text-muted-foreground" aria-hidden="true" />
              <input
                type="password"
                required
                autoComplete="current-password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full bg-transparent py-2 text-sm text-foreground outline-none"
                placeholder="••••"
              />
            </div>
          </label>

          <Button type="submit" className="gap-2">
            <LogIn className="size-4" aria-hidden="true" />
            Entrar
          </Button>
        </form>

        <p className="mt-4 text-xs text-muted-foreground">
          O acesso é liberado apenas para pousadas cadastradas.
        </p>
      </div>
    </div>
  );
}
