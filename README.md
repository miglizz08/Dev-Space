# Dev'Space — Organiza Eventos

Projeto acadêmico da disciplina **Programação Front-End 01** para organizar eventos da comunidade de desenvolvedores.

## Proposta do projeto

- **Nome:** Dev'Space
- **Objetivo:** agendar e organizar eventos para a comunidade de desenvolvedores, como hackathons, palestras, encontros de networking e game days.
- **Usuário principal:** quem organiza e divulga eventos dev.
- **Dados gerenciados:** título, data, horário, local, tipo e descrição.

## Funcionalidades

- Home com os próximos eventos.
- Página `/eventos` com listagem e filtro por tipo.
- Cadastro, edição e exclusão de eventos.
- Mensagens de sucesso e erro nas ações.
- Layout responsivo para computador e celular.

## Tipos de evento

Os tipos aceitos são:

- `hackathon`
- `palestra`
- `networking`
- `game-day`
- `workshop`
- `demo-day`
- `mentoria`

## Como executar

Tenha Node.js e npm instalados. Abra dois terminais na raiz do projeto e execute primeiro a API.

**Terminal 1 — API na porta 3001**

~~~powershell
cd backend
npm ci
node index.js
~~~

**Terminal 2 — Next.js na porta 3000**

~~~powershell
cd frontend
npm ci
npm run dev
~~~

Acesse `http://localhost:3000`. A API fica disponível em `http://localhost:3001`.

## Rotas da API e validação

| Método | Rota | Resposta |
| --- | --- | --- |
| `GET` | `/eventos` | Lista os eventos (200). |
| `POST` | `/eventos` | Cadastra um evento (201) ou retorna erro de validação (400). |
| `PUT` | `/eventos/:id` | Atualiza um evento (200), retorna 400 para dados inválidos ou 404 se o ID não existir. |
| `DELETE` | `/eventos/:id` | Exclui um evento (200) ou retorna 404 se o ID não existir. |

Para cadastrar ou editar, os campos `titulo`, `data`, `horario`, `local` e `tipo` são obrigatórios. O título e o local devem conter texto; a data deve ser válida no formato `AAAA-MM-DD`; o horário deve usar o formato de 24 horas `HH:MM`; e o tipo deve ser um dos sete tipos listados acima. A `descricao` é opcional, mas, se enviada, deve ser texto. Campos inválidos retornam status 400.

Exemplo de corpo JSON:

~~~json
{
  "titulo": "Hackathon: soluções para a cidade",
  "data": "2026-11-15",
  "horario": "09:00",
  "local": "SENAI São Caetano",
  "tipo": "hackathon",
  "descricao": "Um dia para criar projetos em equipe."
}
~~~

## Estrutura de pastas

~~~text
backend/
├── dados/
│   └── eventos.js
├── routes/
│   └── eventos.js
└── index.js

frontend/
├── lib/
│   └── tipos.js
└── src/
    └── app/
        ├── components/
        ├── eventos/
        ├── page.js
        └── layout.js
~~~

## Limitações e escopo

- Os dados ficam em memória e voltam ao estado inicial quando a API reinicia.
- A API inicia com sete eventos de exemplo.
- Inscrições e venda de ingressos ficam fora do escopo do projeto.
