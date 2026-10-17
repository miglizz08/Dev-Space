"use client";

import { tipos } from "../../../lib/tipos";

export default function FiltroTipos({ selecionado, onSelecionar, quantidade }) {
  return (
    <div className="ag-filtros">
      <span className="ag-contagem">próximos eventos / {quantidade}</span>
      <div className="ag-chips" role="group" aria-label="Filtrar eventos por tipo">
        <button
          type="button"
          className={selecionado === "todos" ? "ativo" : ""}
          onClick={() => onSelecionar("todos")}
          aria-pressed={selecionado === "todos"}
        >
          todos
        </button>
        {tipos.map((tipo) => (
          <button
            key={tipo.value}
            type="button"
            className={selecionado === tipo.value ? "ativo" : ""}
            onClick={() => onSelecionar(tipo.value)}
            aria-pressed={selecionado === tipo.value}
          >
            {tipo.label.toLocaleLowerCase("pt-BR")}
          </button>
        ))}
      </div>
    </div>
  );
}
