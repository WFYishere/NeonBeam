# **NeonBeam: Lighting Up Your Choices**

NeonBeam is a playful and interactive website designed to help people overcome decision paralysis. Powered by a fine-tuned Gemini-1.5-Flash model, NeonBeam combines AI-generated suggestions, a dynamic word cloud, and a gamified option selector to turn everyday decisions into a fun and engaging experience.

---

## **Getting Started**  

You can try NeonBeam right now by visiting our live website:  
👉 [https://neon-beam.vercel.app/](https://neon-beam.vercel.app/)  

---

If you'd like to run NeonBeam locally, follow these steps:

### Prerequisites  
- Node.js and npm installed  
- An OpenAI API key with access to Gemini-1.5-Flash  

### Installation  
1. Clone the repository:  
   ```bash
   git clone https://github.com/YourUsername/NeonBeam.git
   cd NeonBeam
   ```
2. Install dependencies:  
   ```bash
   npm install
   ```
3. Set up your environment variables:  
   Create a `.env` file in the root directory and add your OpenAI API key:  
   ```
   OPENAI_API_KEY=your-api-key-here
   ```
4. Start the development server:  
   ```bash
   npm run dev
   ```
5. Open the project in your browser:  
   ```
   http://localhost:3000
   ```

## **Challenges We Faced**
- Fine-tuning the Gemini-1.5-Flash model for optimal results.
- Ensuring smooth real-time updates for the word cloud visualization.
- Balancing fun and functionality in a short hackathon timeframe.

---

## **What’s Next for NeonBeam**
- **Enhanced Features**: Allow users to customize their options and categories.
- **Mobile Optimization**: Improve responsiveness for a seamless mobile experience.
- **Social Sharing**: Let users share their results with friends for added fun.
- **Expanded Use Cases**: Integrate APIs for location-based suggestions, like nearby restaurants or activities.

---

## **Contributing**
We welcome contributions to NeonBeam! Feel free to fork the repo, create a new branch, and submit a pull request. For major changes, please open an issue first to discuss your ideas.

---

## **License**
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## **Acknowledgments**
- **Gemini**: For providing the Gemini-1.5-Flash model and APIs.
- **Vercel**: For hosting our serverless app.
- **[TagCloud](https://www.npmjs.com/package/TagCloud)**: For generating Word Cloud

---

## **Features**
- **AI-Powered Suggestions**: Input any question, and NeonBeam uses a fine-tuned Gemini-1.5-Flash model to generate creative, context-aware recommendations.
- **Dynamic Word Cloud**: Visualize potential answers in real-time through an interactive and colorful word cloud.
- **Gamified Option Selector**: Stop the spinning options to lock in your choice—decision-making has never been this fun!
- **Seamless Deployment**: Hosted on Vercel for fast and reliable performance.

---

## **How It Works**
1. **Enter a Question**: Ask anything, like “What should I eat for dinner?” or “Which movie should I watch?”
2. **Generate Suggestions**: NeonBeam’s AI provides multiple options tailored to your query.
3. **Visualize Options**: Watch the dynamic word cloud fill with possibilities.
4. **Pick Your Choice**: Let the spinning selector decide, or stop it at just the right moment for a final recommendation.

---

## **Tech Stack**
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Fine-tuned Gemini-1.5-Flash model
- **Visualization**: Word cloud library
- **Cloud Services**: Vercel for serverless deployment
- **APIs**: Gemini for model fine-tuning and inference

