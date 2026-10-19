import Link from "next/link";
import EventCard from "./components/EventCard";
import SiteHeader from "./components/SiteHeader";
import { dataHoje } from "../../lib/datas";

const meses = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

function diasAteEvento(data, hoje) {
  const [anoEvento, mesEvento, diaEvento] = data.split("-").map(Number);
  const [anoHoje, mesHoje, diaHoje] = hoje.split("-").map(Number);
  const timestampEvento = Date.UTC(anoEvento, mesEvento - 1, diaEvento);
  const timestampHoje = Date.UTC(anoHoje, mesHoje - 1, diaHoje);

  return Math.round((timestampEvento - timestampHoje) / 86400000);
}

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
  const hoje = dataHoje();
  const proximos = [...eventos]
    .filter((evento) => evento.data >= hoje)
    .sort((a, b) => a.data.localeCompare(b.data))
    .slice(0, 4);
  const proximoEvento = proximos[0];
  const diasRestantes = proximoEvento ? diasAteEvento(proximoEvento.data, hoje) : null;
  const [anoProximo, mesProximo, diaProximo] = proximoEvento?.data.split("-") ?? [];
  const textoDias = diasRestantes === 0 ? "hoje" : diasRestantes === 1 ? "amanhã" : `em ${diasRestantes} dias`;
  return (
    <>
      <SiteHeader />
      <main className="page-shell home-page">
        <section className="home-intro" aria-labelledby="home-title">
          <div className="home-copy">
            <h1 id="home-title">Agenda de eventos para quem programa.</h1>
            <p>Hackathon no sábado, palestra no meio da semana e um espaço para testar o jogo do colega.</p>
            <div className="home-actions">
              <Link className="button button-primary" href="/eventos">Ver agenda</Link>
              <Link className="home-secondary-link" href="/eventos#novo-evento">Cadastrar evento</Link>
            </div>
          </div>
          {proximoEvento && (
            <div className="home-term" aria-hidden="true">
              <div className="home-term-label"><span>&gt;</span> próximo_evento</div>
              <div className="home-term-title">{proximoEvento.titulo}</div>
              <div className="home-term-date">{diaProximo} {meses[Number(mesProximo) - 1]}  {proximoEvento.horario}</div>
              <div>{textoDias}</div>
            </div>
          )}
        </section>

        <section className="upcoming-section" aria-labelledby="upcoming-title">
          <div className="list-heading">
            <span id="upcoming-title">próximos eventos / {proximos.length}</span>
            <Link className="text-link" href="/eventos">todos os eventos</Link>
          </div>
          {proximos.length ? (
            <ul className="ag-lista">
              {proximos.map((evento, indice) => (
                <EventCard key={evento.id} evento={evento} destaque={indice === 0} />
              ))}
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
