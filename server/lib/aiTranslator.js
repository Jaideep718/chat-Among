import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const translateMessage = async (inputText, targetLanguage) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: `You are a professional translator. Translate the input text to ${targetLanguage}. Return ONLY the translated text. Do not add quotes or explanations.`,
    });

    const result = await model.generateContent(inputText);
    return result.response.text().trim();
  } catch (error) {
    console.log("Translation Error: ", error);
    return inputText;
  }
};

