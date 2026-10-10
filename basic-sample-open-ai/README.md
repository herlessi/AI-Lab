# basic-sample-open-ai

Exemplo mínimo de como chamar a API da [OpenAI](https://platform.openai.com) com o SDK oficial em TypeScript: envia uma pergunta para o modelo e imprime a resposta no terminal.

## Como funciona

[index.ts](index.ts) cria um cliente `OpenAI`, envia uma única mensagem `user` para a API de Chat Completions e imprime o conteúdo da primeira resposta:

```
Question: what is the capital of Brazil?
Answer: The capital of Brazil is Brasília.
```

O cliente lê a chave automaticamente da variável de ambiente `OPENAI_API_KEY`, então ela não aparece no código.

## Pré-requisitos

- Node.js 22.18 ou superior (executa TypeScript direto, sem build)
- Uma chave de API da OpenAI: [platform.openai.com/api-keys](https://platform.openai.com/api-keys)

## Instalação

```bash
npm install
```

Crie um arquivo `.env` na raiz do projeto:

```env
OPENAI_API_KEY=sk-...
```

> O `.env` está no `.gitignore`. Nunca faça commit da sua chave.

## Uso

```bash
npm start      # executa uma vez
npm run dev    # reexecuta a cada alteração no código
npm run typecheck  # só checa os tipos com o tsc, sem gerar .js
```

Para fazer outra pergunta ou trocar de modelo, edite [index.ts](index.ts):

```ts
model: 'gpt-5.4-mini',              // modelo usado
main('what is the capital of Brazil?') // pergunta enviada
```

## TypeScript sem build

O Node executa os arquivos `.ts` direto, removendo as anotações de tipo em tempo de execução. Por isso o [tsconfig.json](tsconfig.json) usa:

| Opção | Por quê |
|---|---|
| `noEmit` | o `tsc` só checa tipos; quem executa é o Node |
| `allowImportingTsExtensions` | permite `import './x.ts'` |
| `erasableSyntaxOnly` | acusa sintaxe que o Node não consegue remover (como `enum`) |
| `noUncheckedIndexedAccess` | obriga a tratar `choices[0]` como possivelmente `undefined` |

## Stack

- [Node.js](https://nodejs.org) com TypeScript nativo
- [openai](https://www.npmjs.com/package/openai) (SDK oficial)
