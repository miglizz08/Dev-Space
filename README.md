# Organiza Eventos

Projeto acadêmico da disciplina **Programação Front-End 01** para cadastrar e organizar festas e eventos.

## Estado atual

- **API:** feita com Node.js e Express. Lista, cadastra, edita e exclui eventos em um array na memória. Começa com dois eventos de exemplo; alterações são perdidas quando o servidor reinicia.
- **Página de eventos:** a rota `/eventos` do Next.js busca os dados da API e mostra título, data, horário, local e descrição de cada evento.
- **Formulário:** o botão envia os dados por `POST /eventos` e registra o resultado no console do navegador. Ainda não mostra mensagens na página nem atualiza a lista automaticamente.
- **Acesso local:** a API aceita requisições do navegador em `http://localhost:3000` por meio de CORS. A página inicial (`/`) ainda é a padrão do Next.js.

## Como executar

Tenha Node.js e npm instalados. Abra dois terminais na raiz do projeto e inicie a API antes de abrir a página de eventos.

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

Abra `http://localhost:3000/eventos` para ver a lista e o formulário. A página precisa da API em execução para carregar os eventos. Após cadastrar, recarregue a página para ver o novo item; o resultado do envio aparece no console do navegador. Para consultar o JSON diretamente, use `http://localhost:3001/eventos`.

## Rotas da API

| Método | Rota | Resultado |
| --- | --- | --- |
| `GET` | `/eventos` | Retorna a lista de eventos. |
| `POST` | `/eventos` | Cadastra um evento com ID sequencial e retorna status 201. |
| `PUT` | `/eventos/:id` | Atualiza um evento existente. |
| `DELETE` | `/eventos/:id` | Remove um evento e retorna uma mensagem de sucesso. |

No `POST` e no `PUT`, `titulo`, `data`, `horario` e `local` devem ser textos não vazios. Dados obrigatórios inválidos geram status 400. A `descricao` é opcional; no `PUT`, se não for enviada, vira uma string vazia. `PUT` e `DELETE` retornam status 404 quando o evento não existe. A API ainda não verifica o formato real da data ou do horário.

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

1. Mostrar sucesso ou erro no formulário, limpar os campos após o cadastro e atualizar a lista sem recarregar a página.
2. Adicionar ações de editar e excluir na interface usando `PUT` e `DELETE`.
3. Tratar falhas de carregamento e o caso em que não há eventos.
4. Substituir a página inicial padrão e revisar idioma, metadados e layout para computador e celular.
5. Melhorar a validação de data e horário e testar o fluxo completo para a apresentação.

Inscrições e venda de ingressos não fazem parte do escopo inicial.
