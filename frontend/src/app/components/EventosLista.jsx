'use client';
import { useState } from "react";
import ExcluirEventoButton from "./ExcluirEventoButton";
import EditarEventoForm from "./EditarEventoForm";

export default function EventoLista({ eventos }) {
    const [mensagem, setMensagem] = useState('');

    return (
        <div>
            {mensagem && <p>{mensagem}</p>}
            <ul>
                {eventos.map((evento) => (
                    <li key={evento.id}>
                        <p>{evento.titulo}</p>
                        <p>{evento.data}</p>
                        <p>{evento.horario}</p>
                        <p>{evento.local}</p>
                        <p>{evento.descricao || 'Sem descrição'}</p>
                        <ExcluirEventoButton
                            id={evento.id}
                            onSucesso={() => setMensagem(`Evento "${evento.titulo}" excluído.`)}
                        />
                        <EditarEventoForm evento={evento} onSucesso={() => setMensagem(`Evento "${evento.titulo}" atualizado`)} />
                    </li>
                ))}
            </ul>
        </div>
    );
}