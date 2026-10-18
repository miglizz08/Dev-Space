'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { tipos } from "../../../lib/tipos";
import { validarEvento } from "../../../lib/validacao";
import CampoErro from "./CampoErro";

export default function EditarEventoForm({ evento, onSucesso }) {
    const [editando, setEditando] = useState(false);
    const [mensagem, setMensagem] = useState('');
    const [salvando, setSalvando] = useState(false);
    const [errosCampos, setErrosCampos] = useState({});
    const router = useRouter();
    const campoId = (campo) => `${campo}-${evento.id}`;
    const erroId = (campo) => `erro-${campo}-${evento.id}`;

    function limparErro(campo) {
        setErrosCampos((atuais) => ({ ...atuais, [campo]: "" }));
    }

    async function salvar(event) {
        event.preventDefault();

        const formulario = event.currentTarget;
        setMensagem('');
        const formData = new FormData(formulario);
        const dados = Object.fromEntries(formData);
        const novosErros = validarEvento(dados);
        setErrosCampos(novosErros);

        const primeiroErro = Object.keys(novosErros).find((campo) => novosErros[campo]);
        if (primeiroErro) {
            formulario.elements.namedItem(primeiroErro)?.focus();
            return;
        }

        setSalvando(true);
        let sucesso = false;

        try {
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
        } catch (erro) {
            setMensagem(
                erro instanceof TypeError && erro.message === 'Failed to fetch'
                    ? 'Não foi possível conectar à API. Verifique se ela está rodando.'
                    : erro.message
            );
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
            <button className="action-link action-edit" type="button" onClick={() => setEditando(true)}>
                Editar
            </button>
        );
    }

    return (
        <form onSubmit={salvar} noValidate>
            <label htmlFor={campoId("titulo")}>Título: </label>
            <div className="field-control">
                <input id={campoId("titulo")} type="text" name="titulo" defaultValue={evento.titulo} required
                    aria-invalid={errosCampos.titulo ? "true" : undefined}
                    aria-describedby={errosCampos.titulo ? erroId("titulo") : undefined}
                    onChange={() => limparErro("titulo")} />
                <CampoErro id={erroId("titulo")} mensagem={errosCampos.titulo} />
            </div>

            <label htmlFor={campoId("data")}>Data: </label>
            <div className="field-control">
                <input id={campoId("data")} type="date" name="data" defaultValue={evento.data} required
                    aria-invalid={errosCampos.data ? "true" : undefined}
                    aria-describedby={errosCampos.data ? erroId("data") : undefined}
                    onChange={() => limparErro("data")} />
                <CampoErro id={erroId("data")} mensagem={errosCampos.data} />
            </div>

            <label htmlFor={campoId("horario")}>Horário: </label>
            <div className="field-control">
                <input id={campoId("horario")} type="time" name="horario" defaultValue={evento.horario} required
                    aria-invalid={errosCampos.horario ? "true" : undefined}
                    aria-describedby={errosCampos.horario ? erroId("horario") : undefined}
                    onChange={() => limparErro("horario")} />
                <CampoErro id={erroId("horario")} mensagem={errosCampos.horario} />
            </div>

            <label htmlFor={campoId("local")}>Local: </label>
            <div className="field-control">
                <input id={campoId("local")} type="text" name="local" defaultValue={evento.local} required
                    aria-invalid={errosCampos.local ? "true" : undefined}
                    aria-describedby={errosCampos.local ? erroId("local") : undefined}
                    onChange={() => limparErro("local")} />
                <CampoErro id={erroId("local")} mensagem={errosCampos.local} />
            </div>

            <label htmlFor={campoId("tipo")}>Tipo do evento: </label>
            <div className="field-control">
                <select id={campoId("tipo")} name="tipo" defaultValue={evento.tipo ?? ''} required
                    aria-invalid={errosCampos.tipo ? "true" : undefined}
                    aria-describedby={errosCampos.tipo ? erroId("tipo") : undefined}
                    onChange={() => limparErro("tipo")}>
                    <option value="" disabled>Selecione um tipo</option>
                    {tipos.map((tipo) => (
                        <option key={tipo.value} value={tipo.value}>{tipo.label}</option>
                    ))}
                </select>
                <CampoErro id={erroId("tipo")} mensagem={errosCampos.tipo} />
            </div>

            <label htmlFor={campoId("descricao")}>Descrição: </label>
            <div className="field-control">
                <textarea id={campoId("descricao")} name="descricao" defaultValue={evento.descricao}></textarea>
            </div>

            <button className="button button-primary" type="submit" disabled={salvando}>
                {salvando ? 'Salvando...' : 'Salvar'}
            </button>
            <button className="button button-secondary" type="button" onClick={() => setEditando(false)}>
                Cancelar
            </button>

            {mensagem && <p className="error-state" role="alert">{mensagem}</p>}
        </form>
    );
}
