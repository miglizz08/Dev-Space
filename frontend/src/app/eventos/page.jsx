import EventoForm from "@/app/components/EventoForm";
import EventoLista from "../components/EventosLista";

export default async function EventosPage() {
    let eventos = [];
    let erro = null;

    try{
        const resposta = await fetch('http://localhost:3001/eventos', { cache: 'no-store' });
        
        if(!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }
    
        eventos = await resposta.json();
    } catch(e) {
        erro = 'Não foi possível carregar os eventos. Verifique se a API está rodando';
    }

    return (
        <main>
            <h1>EVENTOS</h1>
            <EventoForm />

            {erro ? (
                <p>{erro}</p>
            ) : eventos.length > 0 ? (
                <EventoLista eventos={eventos} />
            ) : (
                <p>Nenhum evento cadastrado. Use o formulário acima para criar o primeiro.</p>
            )}
        </main>
    );
}