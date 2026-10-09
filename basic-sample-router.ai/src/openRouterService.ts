import { OpenRouter } from '@openrouter/sdk'
import { config, type ModelConfig } from './config.ts';
import { type ChatResult, type ProviderPreferences } from '@openrouter/sdk/models'

export type LLMResponse = {
    model:string;
    content:string;
}

export class OpenRouterService {
    
    private client: OpenRouter;
    private config: ModelConfig

    constructor(configOverride: ModelConfig){
        this.config = configOverride ?? config 
        this.client = new OpenRouter(this.config)
    }

    async generate(prompt: string): Promise<LLMResponse>{
        const response = await this.client.chat.send({
            chatRequest: {
                models: this.config.models,
                messages : [
                    { role: 'system', content: this.config.systemPrompt},
                    { role: 'user', content: prompt}
                ],
                stream:false,
                temperature:0.2,
                maxTokens:50,
                provider: this.config.provider as ProviderPreferences
            }
        }) as ChatResult

        const content = response?.choices[0]?.message.content
        return {
            model: response.model,
            content: String(content)
        }

    }
}