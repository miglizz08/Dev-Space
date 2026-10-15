# Organiza Eventos

Projeto acadêmico da disciplina **Programação Front-End 01** para cadastrar e organizar festas e eventos.

## Estado atual

- **API:** Node.js e Express com rotas para listar, cadastrar, editar e excluir eventos.
- **Página de eventos:** /eventos busca os dados da API, apresenta as informações de cada evento e oferece controles para editar e excluir. Também mostra mensagens quando a API falha ou não há eventos cadastrados.
- **Cadastro:** o formulário envia o evento à API, apresenta uma mensagem de sucesso ou erro, impede envios repetidos, limpa os campos após o sucesso e atualiza a lista.
- **Armazenamento:** os eventos ficam em um array na memória da API, que começa com dois exemplos. Os cadastros e alterações são perdidos quando o servidor reinicia.
- **CORS:** configurado para permitir requisições do front-end em `http://localhost:3000`.

A página inicial (/) ainda é a página padrão do Next.js. A interface permite cadastrar, editar e excluir eventos. A página de eventos também informa quando não consegue carregar a lista ou quando ela está vazia.

## Como executar

Tenha Node.js e npm instalados. Abra dois terminais na raiz do projeto e inicie a API antes do front-end.

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

Acesse `http://localhost:3000/eventos`. A página precisa da API em execução para carregar a lista e cadastrar eventos. Para consultar os dados em JSON, use `http://localhost:3001/eventos`.

## Rotas da API

| Método | Rota | Resultado |
| --- | --- | --- |
| `GET` | `/eventos` | Retorna todos os eventos. |
| `POST` | `/eventos` | Cadastra um evento com ID sequencial e retorna status 201. |
| `PUT` | `/eventos/:id` | Atualiza um evento existente. |
| `DELETE` | `/eventos/:id` | Remove um evento. |

No cadastro e na edição, `titulo`, `data`, `horario` e `local` devem ser textos não vazios. Dados obrigatórios inválidos retornam status 400. `descricao` é opcional. A edição e a exclusão retornam status 404 se o ID não corresponder a um evento. A API ainda não valida o formato real da data e do horário.

Exemplo de corpo JSON para cadastrar ou editar:

~~~json
{
  "titulo": "Encontro de música",
  "data": "2026-11-15",
  "horario": "19:00",
  "local": "Centro cultural",
  "descricao": "Apresentações musicais abertas ao público."
}
~~~

## Próximos passos

1. Substituir a página inicial padrão e revisar idioma, metadados e layout para computador e celular.
2. Melhorar a validação de data e horário na API e conferir o fluxo completo antes da demonstração.

Inscrições e venda de ingressos não fazem parte do escopo inicial.
