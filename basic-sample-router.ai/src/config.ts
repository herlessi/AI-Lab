export type ModelConfig = {
    apiKey: string;
    httpReferer: string; // Optional. Site URL for rankings on openrouter.ai.
    appTitle: string;
    systemPrompt: string;
    models: string[];
}

export const config: ModelConfig = {
    apiKey: process.env.OPENROUTER_API_KEY!,
    httpReferer: 'https:mywebsite.com', // Optional. Site URL for rankings on openrouter.ai.
    appTitle: 'mywebsite',
    systemPrompt: 'You are a kindful assistant.',
    models:[
        //modelo gratuito do openRouter
        'dots-studio/dots-3-note-preview:free'
    ]
}