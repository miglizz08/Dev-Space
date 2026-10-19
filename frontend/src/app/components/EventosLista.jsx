"use client";

import { useMemo, useState } from "react";
import EventCard from "./EventCard";
import FiltroTipos from "./FiltroTipos";
import { dataHoje } from "../../../lib/datas";

export default function EventoLista({ eventos }) {
  const [tipoSelecionado, setTipoSelecionado] = useState("todos");
  const [mensagem, setMensagem] = useState("");
  const filtrados = useMemo(() => {
    const resultado = tipoSelecionado === "todos"
      ? eventos
      : eventos.filter((evento) => evento.tipo === tipoSelecionado);
    return [...resultado].sort((a, b) => a.data.localeCompare(b.data));
  }, [eventos, tipoSelecionado]);
  const hoje = dataHoje();
  const indiceProximo = filtrados.findIndex((evento) => evento.data >= hoje);

  return (
    <section className="event-list-section" aria-label="Lista de eventos">
      <FiltroTipos selecionado={tipoSelecionado} onSelecionar={setTipoSelecionado} quantidade={filtrados.length} />
      {mensagem && <p className="status-state" role="status">{mensagem}</p>}
      {filtrados.length ? (
        <ul className="ag-lista">
          {filtrados.map((evento, indice) => (
            <EventCard
              key={evento.id}
              evento={evento}
              onSucesso={setMensagem}
              destaque={indice === indiceProximo}
            />
          ))}
        </ul>
      ) : (
        <p className="empty-state">Nenhum evento neste tipo ainda.</p>
      )}
    </section>
  );
}
