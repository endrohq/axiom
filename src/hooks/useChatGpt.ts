import { GptResponse } from '../typings';

export function useChatGpt() {
  async function getGptResponse(message: string): Promise<GptResponse> {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ content: message, role: 'user' }],
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
      },
    });
    return await response.json();
  }

  return { getGptResponse };
}
