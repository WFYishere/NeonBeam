/*
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

// api/llm.js
export default function handler(req, res) {
    return res.status(200).json({
      suggestions: "Pizza, Burger, Salad, Sushi, Pasta"
    });
  }
  