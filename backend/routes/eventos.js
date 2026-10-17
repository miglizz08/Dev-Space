import { Router } from 'express';
import { eventos } from '../dados/eventos.js';

const router = Router();
let proximoId = 3;

function dataEhValida(dataString) {
    if (typeof dataString !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(dataString)) {
        return false;
    }

    const [ano, mes, dia] = dataString.split('-').map(Number);
    const data = new Date();
    data.setUTCFullYear(ano, mes - 1, dia);

    const anoConfere = data.getUTCFullYear() === ano;
    const mesConfere = data.getUTCMonth() === mes - 1;
    const diaConfere = data.getUTCDate() === dia;

    return anoConfere && mesConfere && diaConfere;
}

router.get('/', (req, res) => {
    res.json(eventos);
});

router.post('/', (req, res) => {
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
    if(!dataEhValida(data)) {
        return res.status(400).json({ mensagem: "Data inválida. Use o formato AAAA-MM-DD e uma data real." });
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
    
    proximoId += 1;
    eventos.push(novoEvento);
    res.status(201).json(novoEvento);
});

router.put('/:id', (req, res) => {
    const id = Number(req.params.id);
    const {titulo, data, horario, local, descricao} = req.body;

    if (typeof titulo !== 'string' || titulo.trim() === ''){
        return res.status(400).json({mensagem: 'Título é obrigatorio.'})
    }
    if (typeof data !== 'string' || data.trim() === ''){
        return res.status(400).json({mensagem: 'Data é obrigatoria.'})
    }
    if (!dataEhValida(data)) {
        return res.status(400).json({ mensagem: "Data inválida. Use o formato AAAA-MM-DD e uma data real." });
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

router.delete('/:id', (req, res)=> {
    const id = Number(req.params.id);
    const indice = eventos.findIndex(evento => evento.id === id);
    if (indice === -1){
        return res.status(404).json({mensagem: 'Evento não encontrado.'})
    }

    eventos.splice(indice, 1);

    res.status(200).json({mensagem: 'Evento removido com sucesso.'})
});

export default router;