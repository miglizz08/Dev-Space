'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EventoForm() {
    const [mensagem, setMensagem] = useState('');
    const [enviando, setEnviando] = useState(false);
    const router = useRouter();

    async function enviarFormulario(event) {
        event.preventDefault();

        const formulario = event.currentTarget;
        setMensagem('');
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
            setMensagem(erro.message);
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

            <label htmlFor="descricao">Descrição: </label>
            <textarea id="descricao" name="descricao"></textarea>

            <button type="submit" disabled={enviando}>
                {enviando ? 'Cadastrando...' : 'Cadastrar evento'}
            </button>

            {mensagem && <p>{mensagem}</p>}
        </form>
    );
}