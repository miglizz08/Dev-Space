"use client";

import { tipos } from "../../../lib/tipos";
import { dataHoje } from "../../../lib/datas";
import TipoIcone from "./TipoIcone";
import EditarEventoForm from "./EditarEventoForm";
import ExcluirEventoButton from "./ExcluirEventoButton";

const meses = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

export default function EventCard({ evento, onSucesso, destaque = false }) {
  const [ano, mes, dia] = evento.data.split("-");
  const hoje = dataHoje();
  const anoAtual = hoje.slice(0, 4);
  const tipo = tipos.find((item) => item.value === evento.tipo);
  const tipoLabel = tipo?.label.toLocaleLowerCase("pt-BR") ?? "evento";
  const tipoStyle = tipo ? { color: `var(--tipo-${tipo.value})` } : { color: "var(--text-muted)" };
  const classesLinha = [
    "ag-linha",
    evento.data < hoje && "ag-passado",
    destaque && "ag-proximo",
  ].filter(Boolean).join(" ");

  return (
    <li className={classesLinha}>
      <div className="ag-data">
        <div className="ag-dia">{dia?.padStart(2, "0")}</div>
        <div className="ag-mes">{meses[Number(mes) - 1] ?? ""}</div>
        {ano !== anoAtual && <div className="ag-ano">{ano}</div>}
      </div>
      <div className="ag-corpo">
        <h3 className="ag-titulo">
          {evento.titulo}
          {destaque && <span className="ag-tag">próximo</span>}
        </h3>
        <p className="ag-desc">{evento.descricao}</p>
        <div className="ag-meta">{evento.horario} · {evento.local}</div>
      </div>
      <div className="ag-lado">
        <div className="ag-tipo" style={tipoStyle}>
          <TipoIcone tipo={evento.tipo} />
          {tipoLabel}
        </div>
        <div className="ag-acoes">
          <EditarEventoForm evento={evento} onSucesso={() => onSucesso?.(`Evento "${evento.titulo}" atualizado.`)} /> · <ExcluirEventoButton id={evento.id} onSucesso={() => onSucesso?.(`Evento "${evento.titulo}" excluído.`)} />
        </div>
      </div>
    </li>
  );
}
