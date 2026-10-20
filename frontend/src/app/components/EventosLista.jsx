"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import EventCard from "./EventCard";
import FiltroTipos from "./FiltroTipos";
import { dataHoje } from "../../../lib/datas";

export default function EventoLista({ eventos }) {
  const [tipoSelecionado, setTipoSelecionado] = useState("todos");
  const [mensagem, setMensagem] = useState("");
  const [idNovo, setIdNovo] = useState(null);
  const temporizadorNovo = useRef(null);
  const filtrados = useMemo(() => {
    const resultado = tipoSelecionado === "todos"
      ? eventos
      : eventos.filter((evento) => evento.tipo === tipoSelecionado);
    return [...resultado].sort((a, b) => a.data.localeCompare(b.data));
  }, [eventos, tipoSelecionado]);
  const hoje = dataHoje();
  const indiceProximo = filtrados.findIndex((evento) => evento.data >= hoje);

  useEffect(() => {
    function iniciarDestaque(id) {
      if (id === undefined || id === null) return;

      const idString = String(id);
      window.clearTimeout(temporizadorNovo.current);
      setIdNovo(idString);
      temporizadorNovo.current = window.setTimeout(() => {
        setIdNovo((atual) => (String(atual) === idString ? null : atual));
        if (sessionStorage.getItem("evento-cadastrado-id") === idString) {
          sessionStorage.removeItem("evento-cadastrado-id");
        }
      }, 2000);
    }

    function destacarRecemCadastrado(evento) {
      iniciarDestaque(evento.detail?.id);
    }

    const idPendente = sessionStorage.getItem("evento-cadastrado-id");
    if (idPendente) iniciarDestaque(idPendente);

    window.addEventListener("evento-cadastrado", destacarRecemCadastrado);
    return () => {
      window.removeEventListener("evento-cadastrado", destacarRecemCadastrado);
      window.clearTimeout(temporizadorNovo.current);
    };
  }, []);

  return (
    <section className="event-list-section" aria-label="Lista de eventos">
      <FiltroTipos selecionado={tipoSelecionado} onSelecionar={setTipoSelecionado} quantidade={filtrados.length} eventos={eventos} />
      {mensagem && <p className="status-state" role="status">{mensagem}</p>}
      {filtrados.length ? (
        <ul className="ag-lista">
          {filtrados.map((evento, indice) => (
            <EventCard
              key={evento.id}
              evento={evento}
              onSucesso={setMensagem}
              destaque={indice === indiceProximo}
              recemCadastrado={String(evento.id) === String(idNovo)}
            />
          ))}
        </ul>
      ) : (
        <p className="empty-state">Nenhum evento neste tipo ainda.</p>
      )}
    </section>
  );
}
