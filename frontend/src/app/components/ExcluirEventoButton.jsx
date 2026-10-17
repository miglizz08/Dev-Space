'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ExcluirEventoButton({ id, onSucesso }) {
    const [mensagem, setMensagem] = useState('');
    const [excluindo, setExcluindo] = useState(false);
    const router = useRouter();

    async function excluir() {
        if (!window.confirm("Excluir este evento?")) return;

        setMensagem('');
        setExcluindo(true);

        let sucesso = false;

        try {
            const resposta = await fetch(`http://localhost:3001/eventos/${id}`, {
                method: 'DELETE',
            });

            const resultado = await resposta.json();

            if (!resposta.ok) {
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
            setExcluindo(false);
        }

        if (sucesso) {
            if (onSucesso) onSucesso();
            router.refresh();
        }
    }

    return (
        <div className="delete-action-wrap">
            <button className="action-link action-delete" type="button" onClick={excluir} disabled={excluindo}>
                {excluindo ? 'Excluindo...' : 'Excluir'}
            </button>
            {mensagem && <p className="error-state" role="alert">{mensagem}</p>}
        </div>
    );
}
