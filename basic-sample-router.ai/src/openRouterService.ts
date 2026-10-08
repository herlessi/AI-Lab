import { OpenRouter } from '@openrouter/sdk'
import { config, type ModelConfig } from './config.ts';

export class OpenRouterService {
    
    private client: OpenRouter;
    private config: ModelConfig

    constructor(configOverride: ModelConfig){
        this.config = configOverride ?? config 
        this.client = new OpenRouter(this.config)
    }

    async generate(prompt: string){
        const response = await this.client.chat.send({
            chatRequest: {
                models: this.config.models,
                messages : [
                    { role: 'system', content: this.config.systemPrompt},
                    { role: 'user', content: prompt}
                ],
                stream:false,
                temperature:0.2,
                maxTokens:50
            }
        })

        // console.log('response',response.choices[0].message.content)
        return response?.choices[0]?.message?.content ?? ''

    }
}