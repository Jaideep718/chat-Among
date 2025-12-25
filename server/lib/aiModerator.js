import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import "dotenv/config";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  systemInstruction:
    "You are a chat moderator. Analyze the text input for toxicity, hate speech, or harassment. If the message is safe, respond ONLY with 'SAFE'. If it is toxic, respond ONLY with 'TOXIC'.",
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
  ],
});

export async function checkMessageToxicity(message) {
  if (!message) return "SAFE";
  try {
    const result = await model.generateContent(message);
    const response = result.response;
    const text = response.text().trim().toUpperCase();
    return text.includes("TOXIC") ? "TOXIC" : "SAFE";
  } catch (error) {
    console.error("AI Moderation Error:", error);
    return "SAFE";
  }
}
