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
        'tencent/hy-image-v3.5-preview',
        'dots-studio/dots-3-note-preview:free',
        'nvidia/nemotron-3-ultra-550b-a55b:free'
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