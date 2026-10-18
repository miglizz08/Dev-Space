"use client";

import { tipos } from "../../../lib/tipos";
import { dataHoje } from "../../../lib/datas";
import EditarEventoForm from "./EditarEventoForm";
import ExcluirEventoButton from "./ExcluirEventoButton";

const meses = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

export default function EventCard({ evento, onSucesso }) {
  const [ano, mes, dia] = evento.data.split("-");
  const anoAtual = dataHoje().slice(0, 4);
  const tipo = tipos.find((item) => item.value === evento.tipo);
  const tipoLabel = tipo?.label.toLocaleLowerCase("pt-BR") ?? "evento";
  const tipoStyle = tipo ? { color: `var(--tipo-${tipo.value})` } : { color: "var(--text-muted)" };

  return (
    <li className="ag-linha">
      <div className="ag-data">
        <div className="ag-dia">{dia?.padStart(2, "0")}</div>
        <div className="ag-mes">{meses[Number(mes) - 1] ?? ""}</div>
        {ano !== anoAtual && <div className="ag-ano">{ano}</div>}
      </div>
      <div className="ag-corpo">
        <h3 className="ag-titulo">{evento.titulo}</h3>
        <p className="ag-desc">{evento.descricao}</p>
        <div className="ag-meta">{evento.horario} · {evento.local}</div>
      </div>
      <div className="ag-lado">
        <div className="ag-tipo" style={tipoStyle}>{tipoLabel}</div>
        <div className="ag-acoes">
          <EditarEventoForm evento={evento} onSucesso={() => onSucesso?.(`Evento "${evento.titulo}" atualizado.`)} /> · <ExcluirEventoButton id={evento.id} onSucesso={() => onSucesso?.(`Evento "${evento.titulo}" excluído.`)} />
        </div>
      </div>
    </li>
  );
}
