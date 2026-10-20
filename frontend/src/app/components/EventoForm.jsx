'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { tipos } from "../../../lib/tipos";
import { validarEvento } from "../../../lib/validacao";
import CampoErro from "./CampoErro";

const mensagemSucesso = "Evento cadastrado com sucesso.";

export default function EventoForm() {
    const [mensagem, setMensagem] = useState('');
    const [erro, setErro] = useState(false);
    const [enviando, setEnviando] = useState(false);
    const [errosCampos, setErrosCampos] = useState({});
    const router = useRouter();

    function limparErro(campo) {
        setErrosCampos((atuais) => ({ ...atuais, [campo]: "" }));
    }

    async function enviarFormulario(event) {
        event.preventDefault();

        const formulario = event.currentTarget;
        const formData = new FormData(formulario);
        const dados = Object.fromEntries(formData);
        const novosErros = validarEvento(dados);
        setErrosCampos(novosErros);
        setMensagem('');
        setErro(false);

        const primeiroErro = Object.keys(novosErros).find((campo) => novosErros[campo]);
        if (primeiroErro) {
            formulario.elements.namedItem(primeiroErro)?.focus();
            return;
        }

        setEnviando(true);
        let sucesso = false;
        let novoEvento = null;

        try {
            const resposta = await fetch('http://localhost:3001/eventos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados),
            });

            const resultado = await resposta.json();

            if (!resposta.ok) {
                throw new Error(resultado.mensagem);
            }

            novoEvento = resultado;
            setMensagem(mensagemSucesso);
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
            if (novoEvento?.id !== undefined) {
                sessionStorage.setItem("evento-cadastrado-id", String(novoEvento.id));
                window.dispatchEvent(new CustomEvent("evento-cadastrado", { detail: { id: novoEvento.id } }));
            }
            router.refresh();
        }
    }

    return (
        <form onSubmit={enviarFormulario} noValidate>
            <div className="campo campo-cheio">
                <label htmlFor="titulo">título</label>
                <div className="field-control">
                    <input id="titulo" type="text" name="titulo" required
                        aria-invalid={errosCampos.titulo ? "true" : undefined}
                        aria-describedby={errosCampos.titulo ? "erro-titulo" : undefined}
                        onChange={() => limparErro("titulo")} />
                    <CampoErro id="erro-titulo" mensagem={errosCampos.titulo} />
                </div>
            </div>

            <div className="campo">
                <label htmlFor="data">data</label>
                <div className="field-control">
                    <input id="data" type="date" name="data" required
                        aria-invalid={errosCampos.data ? "true" : undefined}
                        aria-describedby={errosCampos.data ? "erro-data" : undefined}
                        onChange={() => limparErro("data")} />
                    <CampoErro id="erro-data" mensagem={errosCampos.data} />
                </div>
            </div>

            <div className="campo">
                <label htmlFor="horario">horário</label>
                <div className="field-control">
                    <input id="horario" type="time" name="horario" required
                        aria-invalid={errosCampos.horario ? "true" : undefined}
                        aria-describedby={errosCampos.horario ? "erro-horario" : undefined}
                        onChange={() => limparErro("horario")} />
                    <CampoErro id="erro-horario" mensagem={errosCampos.horario} />
                </div>
            </div>

            <div className="campo">
                <label htmlFor="local">local</label>
                <div className="field-control">
                    <input id="local" type="text" name="local" required
                        aria-invalid={errosCampos.local ? "true" : undefined}
                        aria-describedby={errosCampos.local ? "erro-local" : undefined}
                        onChange={() => limparErro("local")} />
                    <CampoErro id="erro-local" mensagem={errosCampos.local} />
                </div>
            </div>

            <div className="campo">
                <label htmlFor="tipo">tipo do evento</label>
                <div className="field-control">
                    <select id="tipo" name="tipo" required defaultValue=""
                        aria-invalid={errosCampos.tipo ? "true" : undefined}
                        aria-describedby={errosCampos.tipo ? "erro-tipo" : undefined}
                        onChange={() => limparErro("tipo")}>
                        <option value="" disabled>Selecione um tipo</option>
                        {tipos.map((tipo) => (
                            <option key={tipo.value} value={tipo.value}>{tipo.label}</option>
                        ))}
                    </select>
                    <CampoErro id="erro-tipo" mensagem={errosCampos.tipo} />
                </div>
            </div>

            <div className="campo campo-cheio">
                <label htmlFor="descricao">descrição</label>
                <div className="field-control">
                    <textarea id="descricao" name="descricao"></textarea>
                </div>
            </div>

            <button className="button button-primary" type="submit" disabled={enviando}>
                {enviando ? 'Cadastrando...' : 'Cadastrar evento'}
            </button>

            {mensagem && (
                <p className={erro ? "error-state" : "status-state"} role={erro ? "alert" : "status"}>
                    {mensagem}
                    {!erro && mensagem === mensagemSucesso && <> <a href="#lista-eventos">Ver na agenda</a></>}
                </p>
            )}
        </form>
    );
}
