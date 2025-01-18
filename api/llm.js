// api/llm.js
import { PredictionServiceClient } from "@google-cloud/aiplatform";

// Initialize the Google Gemini client
const client = new PredictionServiceClient({
  apiEndpoint: "us-central1-aiplatform.googleapis.com",
});

const endpoint = `projects/your-project-id/locations/us-central1/publishers/google/models/gemini-1p5-flash`;

export default async function handler(req, res) {
  try {
    // 1. User Input
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "No prompt provided." });
    }

    // 2. Create the prompt template
    const promptTemplate = `
      Provide at most 50 answers for this question, each answer should be concluded into a word or short phrase.
      Avoid providing similar or repetitive answers, and try to make them as diverse as possible.
      The reply should be simply listing out all possible options, without any number or any other words, including but not limited to introduction, paraphrasing, and conclusion.
      Limit the length of your answer to at most 50 words in total and delete anything beyond this limit.
    `;
    const fullPrompt = `${promptTemplate}\n\n${prompt}`;

    // 3. Make the request to the Gemini API
    const [response] = await client.predict({
      endpoint,
      instances: [
        {
          content: fullPrompt,
        },
      ],
      parameters: {
        temperature: 0.7,
        maxOutputTokens: 50,
        topP: 0.8,
        topK: 40,
      },
    });

    // Extract the generated content
    const rawText = response.predictions[0]?.content || "";

    // 4. Return the suggestions as JSON
    return res.status(200).json({ suggestions: rawText });
  } catch (error) {
    console.error("Error in llm.js:", error);
    return res.status(500).json({ error: "Server Error" });
  }
}
