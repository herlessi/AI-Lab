export type ModelConfig = {
    apiKey: string;
    httpReferer: string; // Optional. Site URL for rankings on openrouter.ai.
    appTitle: string;
    systemPrompt: string;
    models: string[];
    provider: {
        sort:{
            by: string,
            partition: string
        }
    }
}

export const config: ModelConfig = {
    apiKey: process.env.OPENROUTER_API_KEY!,
    httpReferer: 'https:mywebsite.com', // Optional. Site URL for rankings on openrouter.ai.
    appTitle: 'mywebsite',
    systemPrompt: 'You are a kindful assistant.',
    models:[
        'nvidia/nemotron-3.5-lightning:free', //mais barato para texto
        'anthropic/claude-sonnet-5.5' //mais caro e alto throughput para texto
    ],
    provider: {
        sort:{
            // by:'throughput', //prioritize highest throughput
            // by: 'latency', //prioritize lowest latency
            by: 'price', //prioritize lowest price
            partition: 'none'
        }
    }
}