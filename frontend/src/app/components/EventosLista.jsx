"use client";

import { useMemo, useState } from "react";
import EventCard from "./EventCard";
import FiltroTipos from "./FiltroTipos";

export default function EventoLista({ eventos }) {
  const [tipoSelecionado, setTipoSelecionado] = useState("todos");
  const [mensagem, setMensagem] = useState("");
  const filtrados = useMemo(() => {
    const resultado = tipoSelecionado === "todos"
      ? eventos
      : eventos.filter((evento) => evento.tipo === tipoSelecionado);
    return [...resultado].sort((a, b) => a.data.localeCompare(b.data));
  }, [eventos, tipoSelecionado]);

  return (
    <section className="event-list-section" aria-label="Lista de eventos">
      <FiltroTipos selecionado={tipoSelecionado} onSelecionar={setTipoSelecionado} quantidade={filtrados.length} />
      {mensagem && <p className="status-state" role="status">{mensagem}</p>}
      {filtrados.length ? (
        <ul className="ag-lista">
          {filtrados.map((evento) => <EventCard key={evento.id} evento={evento} onSucesso={setMensagem} />)}
        </ul>
      ) : (
        <p className="empty-state">Nenhum evento neste tipo ainda.</p>
      )}
    </section>
  );
}
