'use client';
export default function EventoForm() {
    async function enviarFormulario(event) {
        event.preventDefault()
        try {
            const formData = new FormData(event.currentTarget)
            const dados = Object.fromEntries(formData)
            const resposta = await fetch('http://localhost:3001/eventos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados),
            })
            if (!resposta.ok) throw new Error('Erro ao cadastrar')
            const resultado = await resposta.json();
            console.log(resposta.status, resultado);
        } catch (erro) {
            console.error(erro)
        }
    }
    return (
        <form onSubmit={enviarFormulario}>
            <label htmlFor="titulo">Título: </label>
            <input id="titulo" type="text" name="titulo" required />

            <label htmlFor="data">Data: </label>
            <input id="data" type="date" name="data" required />

            <label htmlFor="horario">Horario: </label>
            <input id="horario" type="time" name="horario" required />

            <label htmlFor="local">Local: </label>
            <input id="local" type="text" name="local" required />

            <label htmlFor="descricao">Descrição :</label>
            <textarea id="descricao" name="descricao"></textarea>

            <button type="submit">Cadastrar evento</button>
        </form>
    )
}