'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { tipos } from "../../../lib/tipos";

export default function EventoForm() {
    const [mensagem, setMensagem] = useState('');
    const [erro, setErro] = useState(false);
    const [enviando, setEnviando] = useState(false);
    const router = useRouter();

    async function enviarFormulario(event) {
        event.preventDefault();

        const formulario = event.currentTarget;
        setMensagem('');
        setErro(false);
        setEnviando(true);

        let sucesso = false;

        try {
            const formData = new FormData(formulario);
            const dados = Object.fromEntries(formData);

            const resposta = await fetch('http://localhost:3001/eventos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados),
            });

            const resultado = await resposta.json();

            if (!resposta.ok) {
                throw new Error(resultado.mensagem);
            }

            setMensagem('Evento cadastrado com sucesso.');
            formulario.reset();
            sucesso = true;
        } catch (erro) {
            setMensagem(
                erro instanceof TypeError && erro.message === 'Failed to fetch'
                    ? 'Não foi possível conectar à API. Verifique se ela está rodando.'
                    : erro.message
            );
            setErro(true);
        } finally {
            setEnviando(false);
        }

        if (sucesso) {
            router.refresh();
        }
    }

    return (
        <form onSubmit={enviarFormulario}>
            <label htmlFor="titulo">Título: </label>
            <input id="titulo" type="text" name="titulo" required />

            <label htmlFor="data">Data: </label>
            <input id="data" type="date" name="data" required />

            <label htmlFor="horario">Horário: </label>
            <input id="horario" type="time" name="horario" required />

            <label htmlFor="local">Local: </label>
            <input id="local" type="text" name="local" required />

            <label htmlFor="tipo">Tipo do evento: </label>
            <select id="tipo" name="tipo" required defaultValue="">
                <option value="" disabled>Selecione um tipo</option>
                {tipos.map((tipo) => (
                    <option key={tipo.value} value={tipo.value}>{tipo.label}</option>
                ))}
            </select>

            <label htmlFor="descricao">Descrição: </label>
            <textarea id="descricao" name="descricao"></textarea>

            <button className="button button-primary" type="submit" disabled={enviando}>
                {enviando ? 'Cadastrando...' : 'Cadastrar evento'}
            </button>

            {mensagem && <p className={erro ? "error-state" : "status-state"} role={erro ? "alert" : "status"}>{mensagem}</p>}
        </form>
    );
}
