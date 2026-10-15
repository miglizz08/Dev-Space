'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditarEventoForm({ evento, onSucesso }){
    const [editando, setEditando] = useState(false);
    const [mensagem, setMensagem] = useState('');
    const [salvando, setSalvando] = useState(false);
    const router = useRouter();

    async function salvar(event) {
        event.preventDefault();

        setMensagem('');
        setSalvando(true);

        let sucesso = false;

        try {
            const formData = new FormData(event.currentTarget);
            const dados = Object.fromEntries(formData);
            
            const resposta = await fetch(`http://localhost:3001/eventos/${evento.id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json' },
                body: JSON.stringify(dados),
            });

            const resultado = await resposta.json();

            if(!resposta.ok) {
                throw new Error(resultado.mensagem);
            }

            sucesso = true;
        }catch(erro){
            setMensagem(erro.message);
        } finally {
            setSalvando(false);
        }

        if(sucesso) {
            if (onSucesso) onSucesso();
            setEditando(false);
            router.refresh();
        }
    }

    if(!editando) {
        return (
            <button type="button" onClick={() => setEditando(true)}>
                Editar
            </button>
        );
    }
return (
    <form onSubmit={salvar}>
        <label htmlFor={`titulo-${evento.id}`}>Título: </label>
        <input
            id={`titulo-${evento.id}`}
            type="text"
            name="titulo"
            defaultValue={evento.titulo}
            required
        />

        <label htmlFor={`data-${evento.id}`}>Data: </label>
        <input
            id={`data-${evento.id}`}
            type="date"
            name="data"
            defaultValue={evento.data}
            required
        />

        <label htmlFor={`horario-${evento.id}`}>Horário: </label>
        <input
            id={`horario-${evento.id}`}
            type="time"
            name="horario"
            defaultValue={evento.horario}
            required
        />

        <label htmlFor={`local-${evento.id}`}>Local: </label>
        <input
            id={`local-${evento.id}`}
            type="text"
            name="local"
            defaultValue={evento.local}
            required
        />

        <label htmlFor={`descricao-${evento.id}`}>Descrição: </label>
        <textarea
            id={`descricao-${evento.id}`}
            name="descricao"
            defaultValue={evento.descricao}
        ></textarea>

        <button type="submit" disabled={salvando}> 
            {salvando ? 'Salvando...' : 'Salvar'}
        </button>
        <button type="button" onClick={() => setEditando(false)}>
            Cancelar
        </button>

        {mensagem && <p>{mensagem}</p>}
    </form>
);
}