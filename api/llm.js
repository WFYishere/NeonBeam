/*
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
  
      // 2. Make the request to LLM API
      // TODO
  
      const data = await response.json();
      // text-davinci-003 returns text in data.choices[0].text
      const rawText = data.choices?.[0]?.text || "";
  
      // 3. Return the suggestions as JSON
      return res.status(200).json({ suggestions: rawText });
    } catch (error) {
      console.error("Error in llm.js:", error);
      return res.status(500).json({ error: "Server Error" });
    }
  }
  
*/

// // api/llm.js
// export default function handler(req, res) {
//     return res.status(200).json({
//       suggestions: "Pizza, Burger, Salad, Sushi, Pasta, Tacos, Ramen, Sandwich, Steak, Fried Chicken, Nachos, Curry, Falafel, Paella, Hot Dog, Burrito, Dumplings, Lasagna, Gnocchi, Quiche, Shawarma, Pho, Hamburger, Kebab, Risotto, Chili, Poutine, Gyro, Fried Rice, Omelette"
//     });
//   }


import { Client } from "@gradio/client";

export default async function handler(req, res) {
  try {
    // 1. User Input
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "No prompt provided." });
    }

    // 2. Connect to the Hugging Face Space using Gradio Client
    const client = await Client.connect("k0de01/Decidophobia");

    // 3. Make the prediction
    const result = await client.predict("/predict", { question: prompt });

    console.log(result.data);

    // 4. Extract the response data
    const rawText = result.data.[0] || "No suggestions available";

    // 5. Return the suggestions as JSON
    return res.status(200).json({ suggestions: rawText });
  } catch (error) {
    console.error("Error in llm.js:", error);
    return res.status(500).json({ error: "Server Error" });
  }
}


  
