import express from 'express';
import cors from 'cors';

const eventos = [{
    id:1,
    titulo: "halloween",
    data: "2026-10-31",
    horario: "19:00",
    local: "liv_music",
    descricao: "Evento temático com uso obrigatório de fantasia. A estrutura inclui um ambiente preparado para receber os convidados e pista de dança com DJ tocando ao longo de toda a noite."
},
{
    id:2,
    titulo:"festa junina",
    data:"2026-06-12",
    horario: "13:00",
    local: "Clube da cidade",
    descricao: "Evento organizado para celebrar a tradição junina e promover a confraternização. A festa contará com um cardápio focado em diversas comidas e bebidas típicas da época."
}
];


const app = express();

app.use(cors({origin: 'http://localhost:3000'}));
app.use(express.json());

let proximoId = 3;

app.post('/eventos', (req, res) => {
    const titulo = req.body?.titulo
    const data = req.body?.data
    const horario = req.body?.horario
    const local = req.body?.local

    if(typeof titulo !== 'string' || titulo.trim() === ''){
        return res.status(400).json({mensagem: 'Título é obrigatório.'});
    }
    if(typeof data !== 'string' || data.trim() === ''){
        return res.status(400).json({mensagem: "Data é obrigatória."});
    }
    if(typeof horario !== 'string' || horario.trim() === ''){
        return res.status(400).json({mensagem: "Horário é obrigatório."});
    }
    if(typeof local !== 'string' || local.trim() === ''){
        return res.status(400).json({mensagem: "Local é obrigatório."});
    }
    const novoEvento = {
    id: proximoId,
    titulo: req.body.titulo,
    data: req.body.data,
    horario: req.body.horario,
    local: req.body.local,
    descricao: req.body.descricao

}
proximoId +=1
eventos.push(novoEvento)
res.status(201).json(novoEvento);
});


app.get('/eventos', (req,res)=> {
    res.json(eventos)
});

app.put('/eventos/:id', (req, res) => {
    const id = Number(req.params.id);
    const {titulo, data, horario, local, descricao} = req.body;

    if (typeof titulo !== 'string' || titulo.trim() === ''){
        return res.status(400).json({mensagem: 'Título é obrigatorio.'})
    }
    if (typeof data !== 'string' || data.trim() === ''){
        return res.status(400).json({mensagem: 'Data é obrigatoria.'})
    }
    if (typeof horario !== 'string' || horario.trim() === ''){
        return res.status(400).json({mensagem: 'Horário é obrigatorio.'})
    }
        
    if (typeof local !== 'string' || local.trim() === ''){
        return res.status(400).json({mensagem: 'Local é obrigatorio.'})
    }
    if (descricao !== undefined && typeof descricao !== 'string'){
        return res.status(400).json({mensagem: 'Descrição deve ser um texto.'});
    }

    const evento = eventos.find(e => e.id === id);

    if(!evento) {
        return res.status(404).json({mensagem: 'Evento não encontrado.'})
    }

    evento.titulo = titulo;
    evento.data = data;
    evento.horario = horario;
    evento.local = local;
    evento.descricao = descricao ?? '';


    res.json(evento);


});

app.delete('/eventos/:id', (req, res)=> {
    const id = Number(req.params.id);
    const indice = eventos.findIndex(evento => evento.id === id);
    if (indice === -1){
        return res.status(404).json({mensagem: 'Evento não encontrado.'})
    }

    eventos.splice(indice, 1);

    res.status(200).json({mensagem: 'Evento removido com sucesso.'})
});



app.listen(3001, () => console.log("API na porta 3001"));
