import test from 'node:test'
import assert from 'node:assert/strict'
import { createServer } from '../src/server.ts'
import { config } from '../src/config.ts'
import { type LLMResponse, OpenRouterService } from '../src/openRouterService.ts'

test('router to cheapest model by default', async () =>{
    const customConfig = {
        ...config,
        provider:{
            ...config.provider,
            sort:{
                ...config.provider.sort,
                by: 'price' //prioritize lowest price
            }
        }
    }

    const routerService = new OpenRouterService(customConfig)
    const app = createServer(routerService)
    const response = await app.inject({ 
        method: 'POST', 
        url: '/chat', 
        body: { question: 'Hello World!' } 
    })

    assert.equal(response.statusCode, 200)
    
    const body = response.json() as LLMResponse
    assert.equal(body.model,'nvidia/nemotron-3.5-lightning:free')

 })

 test('router to highest throughput model by default', async () =>{
    
    const customConfig = {
        ...config,
        provider:{
            ...config.provider,
            sort:{
                ...config.provider.sort,
                by: 'throughput', //prioritize highest throughput
            }
        }
    }

    const routerService = new OpenRouterService(customConfig)
    const app = createServer(routerService)
    const response = await app.inject({ 
        method: 'POST', 
        url: '/chat', 
        body: { question: 'Hello World!' } 
    })

    assert.equal(response.statusCode, 200)
    
    const body = response.json() as LLMResponse
    assert.equal(body.model,'anthropic/claude-sonnet-5.5')

 })