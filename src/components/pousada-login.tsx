import { useState } from "react";
import { LogIn, Lock, User } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { autenticarPousada, type Pousada } from "@/lib/pousadas";

type Props = {
  onEntrar: (pousada: Pousada) => void;
  /** Quando definido, só aceita o login desta pousada. */
  pousadaFixa?: Pousada;
};

export function PousadaLogin({ onEntrar, pousadaFixa }: Props) {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(pousadaFixa?.usuario ?? "");
  const [senha, setSenha] = useState("");
  const [enviando, setEnviando] = useState(false);

  const submeter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (enviando) return;
    const p = autenticarPousada(usuario, senha);
    if (p && (!pousadaFixa || p.slug === pousadaFixa.slug)) {
      toast.success(`Bem-vindo, ${p.nome}!`);
      onEntrar(p);
      return;
    }

    // Enterprise/Developer entram pelo mesmo formulário, usando e-mail e senha.
    if (usuario.includes("@")) {
      setEnviando(true);
      const { error } = await supabase.auth.signInWithPassword({
        email: usuario.trim(),
        password: senha,
      });
      setEnviando(false);
      if (!error) {
        toast.success("Bem-vindo de volta!");
        void navigate({ to: "/metricas" });
        return;
      }
    }

    toast.error("Usuário ou senha inválidos");
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
          Entre com o usuário e a senha da pousada para montar os pedidos. Contas
          enterprise e developer podem entrar aqui com e-mail e senha.
        </p>

        <form className="mt-6 flex flex-col gap-4" onSubmit={submeter}>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">Usuário</span>
            <div className="flex items-center gap-2 rounded-lg border border-input bg-background px-3 focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/30">
              <User className="size-4 text-muted-foreground" aria-hidden="true" />
              <select
                required
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                className="w-full bg-transparent py-2 text-sm text-foreground outline-none"
              >
                <option value="" disabled>Escolha sua pousada</option>
                <option value="Vale do Sol">Vale do Sol</option>
                <option value="Alquimia Chalés">Alquimia Chalés</option>
                <option value="Itaoka Belvedere">Itaoka Belvedere</option>
                <option value="Ser.Tão">Ser.Tão</option>
              </select>
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

          <Button type="submit" disabled={enviando} className="gap-2">
            <LogIn className="size-4" aria-hidden="true" />
            {enviando ? "Entrando..." : "Entrar"}
          </Button>
        </form>

        <p className="mt-4 text-xs text-muted-foreground">
          Pousadas cadastradas e contas administrativas autorizadas.
        </p>
      </div>
    </div>
  );
}
