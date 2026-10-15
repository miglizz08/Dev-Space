'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ExcluirEventoButton({ id, onSucesso }) {
    const [mensagem, setMensagem] = useState('');
    const [excluindo, setExcluindo] = useState(false);
    const router = useRouter();

    async function excluir() {
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
            setMensagem(erro.message);
        } finally {
            setExcluindo(false);
        }

        if (sucesso) {
            if (onSucesso) onSucesso();
            router.refresh();
        }
    }

    return (
        <div>
            <button type="button" onClick={excluir} disabled={excluindo}>
                {excluindo ? 'Excluindo...' : 'Excluir'}
            </button>
            {mensagem && <p>{mensagem}</p>}
        </div>
    );
}