import type { APIRoute } from "astro";
import { GoogleGenAI } from "@google/genai";
import { generateHash } from "@src/utility/generate-hash";
import { redis } from "@src/lib/redis";
import { markedWithHighlight } from "@src/lib/marked-with-highlight";

export const prerender = false;

const apiKey = import.meta.env.GEMINI_API_KEY;
const cacheTTL = 60 * 60 * 24 * 365 * 5; // 5 years
if (!apiKey) {
  throw new Error("[ERROR] The AI API Key is not configured.");
}

const genAI = new GoogleGenAI({
  apiKey: import.meta.env.GEMINI_API_KEY,
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const { content } = await request.json();

    if (!content) {
      return new Response(
        JSON.stringify({ error: "[ERROR] The content cannot be empty." }),
        { status: 400 },
      );
    }

    const hashCacheKey = await generateHash(content);
    const cacheKey = `summary:with-astro:${hashCacheKey}`;

    const cachedSummary = await redis.get<string>(cacheKey);
    const cachedSummaryHtml = await markedWithHighlight.parse(
      cachedSummary || "",
    );

    if (cachedSummary) {
      return new Response(JSON.stringify({ summary: cachedSummaryHtml }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const AIResponse = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
Summarize the following text to 20% in English,
         keeping the main ideas in a professional and accessible tone.
        
        The summary must be formatted in MARKDOWN with elements limit to header h2 max down level.
        Ensure that lists are just UL
        
        Content: ${content}`,
      config: {
        responseMimeType: "text/plain",
      },
    });

    if (!AIResponse.text) {
      return new Response(
        JSON.stringify({ error: "[ERROR] The summary is empty." }),
        { status: 400 },
      );
    }

    const summaryHtml = markedWithHighlight.parse(AIResponse.text);

    await redis.set(cacheKey, summaryHtml, { ex: cacheTTL });

    return new Response(JSON.stringify({ summary: summaryHtml }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[ERROR] Error calling the Gemini API:", error);
    return new Response(
      JSON.stringify({
        error: "[ERROR]: Failed to generate the summary. [500]: " + error,
      }),
      { status: 500 },
    );
  }
};
