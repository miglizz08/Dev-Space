import EventoForm from "@/app/components/EventoForm";

export default async function EventosPage() {
    const data = await fetch('http://localhost:3001/eventos', { cache: 'no-store' });
    const eventos = await data.json();

    return (
        <main>
            <h1>EVENTOS</h1>
            <EventoForm />
            <ul>
                {eventos.map((evento) => (
                    <li key={evento.id}>
                        <p>{evento.titulo}</p>
                        <p>{evento.data}</p>
                        <p>{evento.horario}</p>
                        <p>{evento.local}</p>
                        <p>{evento.descricao || 'Sem descrição'}</p>
                    </li>
                ))}
            </ul>
        </main>
    );
}