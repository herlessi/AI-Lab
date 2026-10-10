# basic-sample-router.ai

Exemplo mínimo de uma API que usa o [OpenRouter](https://openrouter.ai) para rotear perguntas entre modelos de LLM, escolhendo o provedor por **preço**, **throughput** ou **latência** e caindo para um modelo reserva quando o primeiro falha.

## Como funciona

```
POST /chat  ──►  Fastify  ──►  OpenRouterService  ──►  OpenRouter API
                                                         ├─ modelo 1 (principal)
                                                         └─ modelo 2 (fallback)
```

- **`models`**: lista de modelos em ordem de preferência. Se o primeiro falhar ou estiver indisponível, o OpenRouter tenta o próximo automaticamente.
- **`provider.sort.by`**: critério para escolher o provedor de cada modelo:
  - `price`: o mais barato (padrão)
  - `throughput`: o mais rápido em tokens/segundo
  - `latency`: o que responde primeiro

## Estrutura

```
src/
├── config.ts             # modelos, system prompt e estratégia de roteamento
├── openRouterService.ts  # cliente do OpenRouter (método generate)
├── server.ts             # servidor Fastify com a rota POST /chat
└── index.ts              # ponto de entrada: sobe o servidor
tests/
└── router.e2e.test.ts    # testes end-to-end do roteamento
```

## Pré-requisitos

- Node.js 24 ou superior (executa TypeScript direto, sem build)
- Uma chave de API do OpenRouter: [openrouter.ai/keys](https://openrouter.ai/keys)

## Instalação

```bash
npm install
```

Crie um arquivo `.env` na raiz do projeto:

```env
OPENROUTER_API_KEY=sk-or-v1-...
# opcionais
HOST=0.0.0.0
PORT=3000
```

> O `.env` está no `.gitignore`. Nunca faça commit da sua chave.

## Uso

Suba o servidor em modo de desenvolvimento (com watch e debugger):

```bash
npm run dev
```

Faça uma pergunta:

```bash
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{"question": "O que é um LLM router?"}'
```

Resposta:

```json
{
  "model": "nvidia/nemotron-3.5-lightning:free",
  "content": "..."
}
```

O campo `model` mostra qual modelo respondeu de fato. Isso é útil para ver o fallback em ação.

### Validação

O campo `question` é obrigatório e precisa ter pelo menos 5 caracteres. Caso contrário, a API retorna `400`.

## Configuração

Tudo fica em [src/config.ts](src/config.ts):

| Campo | Descrição |
|---|---|
| `models` | Modelos em ordem de preferência (principal + fallback) |
| `provider.sort.by` | `price`, `throughput` ou `latency` |
| `systemPrompt` | Instrução de sistema enviada em toda requisição |
| `httpReferer` / `appTitle` | Identificação do app nos rankings do OpenRouter (opcional) |

> Use apenas modelos de **chat de texto**. Modelos especializados, como geração de música ou aplicação de código, podem rejeitar o formato `system` + `user`.

## Testes

Os testes usam o test runner nativo do Node (`node:test`) e o `app.inject` do Fastify. Por isso não é preciso subir o servidor.

```bash
npm test         # executa uma vez
npm run test:dev # modo watch
```

> São testes **end-to-end**: fazem chamadas reais ao OpenRouter e consomem créditos da sua chave.

## Stack

- [Node.js](https://nodejs.org) com TypeScript nativo
- [Fastify](https://fastify.dev)
- [@openrouter/sdk](https://www.npmjs.com/package/@openrouter/sdk)
