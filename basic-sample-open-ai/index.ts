import { OpenAI } from 'openai'

const openai = new OpenAI()

const main = async (question: string) => {
    
    console.log(`Question: ${question}`)

    const response = await openai.chat.completions.create({
        messages: [{ content: question, role: 'user' }],
        model: 'gpt-5.4-mini',
    })

    const formattedAnswer = `Answer: ${response.choices[0]?.message?.content}`
    console.log(formattedAnswer)
}

main('what is the capital of Brazil?')