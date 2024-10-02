import { Anthropic } from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/encryption"; // You'll need to implement this

export async function POST(req: NextRequest) {
  const { topic, personas } = await req.json();

  if (!topic) {
    return NextResponse.json({ error: "Topic is required" }, { status: 400 });
  }

  if (!personas || personas.length === 0) {
    return NextResponse.json(
      { error: "At least one persona is required" },
      { status: 400 }
    );
  }

  // Retrieve the API configuration from the cookie
  const apiConfigCookie = cookies().get('api_config');
  if (!apiConfigCookie) {
    return NextResponse.json({ error: "API configuration not found" }, { status: 400 });
  }

  const { apiKey: encryptedApiKey, provider } = JSON.parse(apiConfigCookie.value);
  const apiKey = decrypt(encryptedApiKey);

  try {
    let responses = [];

    if (provider === "openai") {
      responses = await generateOpenAIResponses(apiKey, topic, personas);
    } else if (provider === "anthropic") {
      responses = await generateAnthropicResponses(apiKey, topic, personas);
    } else {
      return NextResponse.json({ error: "Invalid provider" }, { status: 400 });
    }

    return NextResponse.json({ responses });
  } catch (error) {
    console.error("Error generating responses:", error);
    return NextResponse.json(
      { error: "Failed to generate responses" },
      { status: 500 }
    );
  }
}

// Update these functions to accept apiKey as a parameter
async function generateOpenAIResponses(apiKey: string, topic: string, personas: any[]) {
  const openai = new OpenAI({ apiKey });
  const systemPrompt = `You will provide responses for multiple personas on a given topic. 
    Return your response as a JSON object where each key is the persona's name and 
    the value is their response. Do not include any text outside of the JSON object. 
    Make sure the JSON object is valid. Make sure the responses are not too similar 
    between each persona in terms of word choice and sentence structure. Embody the 
    persona's characteristics and write in their voice, but don't be cliche or make
    a charicature of the persona. Don't start every response with the topic, and 
    don't start every response with the same phrasing. Aim to give insightful and 
    interesting responses.`;

  const userPrompt = `Topic: ${topic}

    Personas:
    ${personas
      .map((p) => `${p.name}: ${p.description}. ${p.context}`)
      .join("\n\n")}

    Provide a short but comprehensive paragraph for each persona's perspective on 
    the topic. Do not roleplay, describe actions, or use phrases like "As (a) 
    [persona name]" or "I am (a) [persona name]".`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    response_format: { type: "json_object" },
  });

  const responsesObject = JSON.parse(
    completion.choices[0].message.content || "{}"
  );

  return Object.entries(responsesObject).map(([personaName, content]) => ({
    personaName,
    content: content as string,
  }));
}

async function generateAnthropicResponses(apiKey: string, topic: string, personas: any[]) {
  const anthropic = new Anthropic({ apiKey });
  const prompt = `You will provide responses for multiple personas on the following topic: ${topic}

    Personas:
    ${personas
      .map((p) => `${p.name}: ${p.description}. ${p.context}`)
      .join("\n\n")}

    Provide a short but comprehensive paragraph for each persona's perspective on 
    the topic. Write in the first person but do not roleplay, describe actions, or 
    use phrases like "As (a) [persona name]" or "I am (a) [persona name]".

    Return your response as a JSON object where each key is the persona's name and 
    the value is their response. Do not include any text outside of the JSON object. 
    Make sure the JSON object is valid. Make sure the responses are not too similar 
    between each persona in terms of word choice and sentence structure. Embody the 
    persona's characteristics and write in their voice, but don't be cliche or make
    a charicature of the persona. Don't start every response with the topic, and 
    don't start every response with the same phrasing. Aim to give insightful and 
    interesting responses.`;

  const message = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20240620",
    max_tokens: 2000,
    messages: [{ role: "user", content: prompt }],
  });

  const responsesObject = JSON.parse(message.content[0].text);

  return Object.entries(responsesObject).map(([personaName, content]) => ({
    personaName,
    content: content as string,
  }));
}
