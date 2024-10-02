import { Persona, Response } from "@/types";

async function generateResponse(
  persona: Persona,
  topic: string,
  apiKey: string,
  provider: string
): Promise<string> {
  const prompt = `You are ${persona.name}, ${persona.description}. ${persona.context}\n\nPlease provide your expert opinion on the following topic:\n${topic}`;

  if (provider === "anthropic") {
    return generateAnthropicResponse(prompt, apiKey);
  } else if (provider === "openai") {
    return generateOpenAIResponse(prompt, apiKey);
  } else {
    throw new Error("Invalid provider");
  }
}

async function generateAnthropicResponse(prompt: string, apiKey: string): Promise<string> {
  const response = await fetch("https://api.anthropic.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": apiKey,
    },
    body: JSON.stringify({
      prompt: prompt,
      model: "claude-2",
      max_tokens_to_sample: 300,
    }),
  });

  if (!response.ok) {
    throw new Error(`Anthropic API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.completion;
}

async function generateOpenAIResponse(prompt: string, apiKey: string): Promise<string> {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 300,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

export async function generateResponses(
  personas: Persona[],
  topic: string,
  apiKey: string,
  provider: string
): Promise<Response[]> {
  const responses: Response[] = [];

  for (const persona of personas) {
    try {
      const content = await generateResponse(persona, topic, apiKey, provider);
      responses.push({ personaName: persona.name, content });
    } catch (error) {
      console.error(`Error generating response for ${persona.name}:`, error);
      responses.push({
        personaName: persona.name,
        content: `Error: Unable to generate response for ${persona.name}.`,
      });
    }
  }

  return responses;
}