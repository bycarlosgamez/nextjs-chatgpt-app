'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';

export type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export async function getCompletion(
  messages: Message[]
): Promise<{ messages: Message[] }> {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Convert message history to Gemini format
    const history = messages.map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    // Start chat with history
    const chat = model.startChat({
      history,
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });

    // Get last user message
    const lastUserMessage =
      messages.filter((m) => m.role === 'user').pop()?.content || '';

    // Get response from Gemini
    const result = await chat.sendMessage(lastUserMessage);
    const response = await result.response;
    const responseText = response.text();

    // Return properly typed messages
    return {
      messages: [
        ...messages,
        {
          role: 'assistant' as const, // Force correct type
          content: responseText,
        },
      ],
    };
  } catch (error) {
    console.error('API Error:', error);
    return {
      messages: [
        ...messages,
        {
          role: 'assistant' as const,
          content: 'Sorry, I encountered an error. Please try again.',
        },
      ],
    };
  }
}
