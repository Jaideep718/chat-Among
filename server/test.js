import "dotenv/config";

const API_KEY = process.env.GEMINI_API_KEY;
const URL = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

console.log("---------------------------------------------------");
console.log("Checking API Key permissions via direct HTTP request...");
console.log("---------------------------------------------------");

async function debugGemini() {
  try {
    const response = await fetch(URL);
    const data = await response.json();

    if (data.error) {
      console.error("\nCRITICAL API ERROR:");
      console.error(`Code: ${data.error.code}`);
      console.error(`Message: ${data.error.message}`);
      console.error(`Status: ${data.error.status}`);
      return;
    }

    console.log("\nSUCCESS! Your key is valid. Here are your allowed models:");
    console.log("---------------------------------------------------");

    // Filter and print only Gemini models
    if (data.models) {
      const available = data.models
        .filter((m) => m.name.includes("gemini"))
        .map((m) => m.name.replace("models/", "")); // Clean up the name

      console.log(available.join("\n"));

      console.log("\nRECOMMENDATION:");
      if (available.includes("gemini-1.5-flash")) {
        console.log("-> Use: model: 'gemini-1.5-flash'");
      } else if (available.includes("gemini-pro")) {
        console.log("-> Use: model: 'gemini-pro'");
      } else {
        console.log(`-> Use: model: '${available[0]}'`);
      }
    } else {
      console.log("No models found. Your API Key might be restricted.");
    }
  } catch (error) {
    console.error("Network Error:", error.message);
  }
}

debugGemini();
