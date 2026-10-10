import { config } from './config.ts'
import { OpenRouterService } from './openRouterService.ts'
import { createServer } from './server.ts'

const routerService = new OpenRouterService(config)
const app = createServer(routerService)

const host = process.env.HOST ?? '0.0.0.0'
const port = Number(process.env.PORT ?? 3000)

await app.listen({port: port, host: host})
app.log.info(`Server running on ${host}:${port}`)

// app.inject({ 
//     method: 'POST', 
//     url: '/chat', 
//     body: { question: 'Hello World!' } 
// }).then(response =>{
//     console.log(response.body)
// }).catch(error =>{
//     console.log(error)
// })
