import Link from "next/link";
import EventCard from "./components/EventCard";
import SiteHeader from "./components/SiteHeader";

async function buscarEventos() {
  try {
    const resposta = await fetch("http://localhost:3001/eventos", { cache: "no-store" });
    if (!resposta.ok) return { eventos: [], erro: true };
    return { eventos: await resposta.json(), erro: false };
  } catch {
    return { eventos: [], erro: true };
  }
}

export default async function Home() {
  const { eventos, erro } = await buscarEventos();
  const agora = new Date();
  const hoje = `${agora.getFullYear()}-${String(agora.getMonth() + 1).padStart(2, "0")}-${String(agora.getDate()).padStart(2, "0")}`;
  const proximos = [...eventos]
    .filter((evento) => evento.data >= hoje)
    .sort((a, b) => a.data.localeCompare(b.data))
    .slice(0, 4);
  return (
    <>
      <SiteHeader />
      <main className="page-shell home-page">
        <section className="home-intro" aria-labelledby="home-title">
          <h1 id="home-title">Agenda de eventos para quem programa.</h1>
          <p>Hackathon no sábado, palestra no meio da semana e um espaço para testar o jogo do colega.</p>
          <div className="home-actions">
            <Link className="button button-primary" href="/eventos">Ver agenda</Link>
            <Link className="home-secondary-link" href="/eventos#novo-evento">Cadastrar evento</Link>
          </div>
        </section>

        <section className="upcoming-section" aria-labelledby="upcoming-title">
          <div className="list-heading">
            <span id="upcoming-title">próximos eventos / {proximos.length}</span>
            <Link className="text-link" href="/eventos">todos os eventos</Link>
          </div>
          {proximos.length ? (
            <ul className="ag-lista">
              {proximos.map((evento) => <EventCard key={evento.id} evento={evento} />)}
            </ul>
          ) : erro ? (
            <p className="error-state" role="alert">Não foi possível carregar os eventos. Verifique se a API está rodando.</p>
          ) : (
            <p className="empty-state">Ainda não há eventos por aqui. Que tal criar o primeiro?</p>
          )}
        </section>
      </main>
      <footer className="site-footer page-shell">
        <span>Dev&apos;Space</span>
        <span>Agenda da comunidade dev</span>
      </footer>
    </>
  );
}
