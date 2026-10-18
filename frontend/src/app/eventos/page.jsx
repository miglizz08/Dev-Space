import Link from "next/link";
import EventoForm from "@/app/components/EventoForm";
import EventoLista from "../components/EventosLista";
import SiteHeader from "../components/SiteHeader";

export default async function EventosPage() {
  let eventos = [];
  let erro = false;

  try {
    const resposta = await fetch("http://localhost:3001/eventos", { cache: "no-store" });
    if (!resposta.ok) throw new Error("API indisponível");
    eventos = await resposta.json();
  } catch {
    erro = true;
  }

  return (
    <>
      <SiteHeader />
      <main className="page-shell events-page">
        <div className="page-heading">
          <div>
            <p className="page-kicker">Dev&apos;Space / agenda</p>
            <h1>Eventos</h1>
          </div>
          <Link className="button button-primary" href="#novo-evento">Criar evento</Link>
        </div>

        <div id="lista-eventos">
          {erro ? (
            <p className="error-state" role="alert">Não foi possível carregar os eventos. Verifique se a API está rodando.</p>
          ) : eventos.length ? (
            <EventoLista eventos={eventos} />
          ) : (
            <p className="empty-state">Nenhum evento cadastrado. Use o formulário para criar o primeiro.</p>
          )}
        </div>

        <section id="novo-evento" className="new-event-section" aria-labelledby="new-event-title">
          <div className="section-heading">
            <h2 id="new-event-title">Novo evento</h2>
            <Link className="text-link" href="/eventos">Voltar à agenda</Link>
          </div>
          <EventoForm />
        </section>
      </main>
      <footer className="site-footer page-shell"><span>Dev&apos;Space</span><span>Feito para quem faz acontecer.</span></footer>
    </>
  );
}
