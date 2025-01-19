### **Project Story: NeonBeam**

## **Inspiration**  
NeonBeam was inspired by the common struggle of decision paralysis—those moments when you can’t figure out what to eat, what movie to watch, or even what to wear. As a team, we realized how often we overthink small decisions and thought, *Why not make this process fun?* Our goal was to create a tool that turns indecision into an engaging and entertaining experience, offering a touch of humor to lighten the burden of choice.

---

## **What it does**  
NeonBeam helps people make decisions in a playful and interactive way. Here’s how it works:  
1. Users enter a question, such as “What should I eat for dinner?”  
2. NeonBeam uses an AI-powered Large Language Model (LLM) to generate a list of potential options.  
3. A **dynamic word cloud** visualizes the suggestions, offering a fun way to explore possibilities.  
4. Simultaneously, an **interactive option selector** begins cycling through suggestions.  
5. When the user presses the **stop button**, the cycling stops on a final, randomly chosen solution.  

It’s like spinning a digital decision wheel but smarter and more visually engaging!

---

## **How we built it**  
- **Frontend**: Built using HTML, CSS, and JavaScript to ensure a clean and user-friendly interface.  
- **Backend**: Powered by a fine-tuned Gemini-1.5-Flash model, which generates creative and context-aware options tailored to the user’s input.  
- **Visualization**: Leveraged a word cloud library to dynamically display AI-generated suggestions in real time, enhancing the visual appeal of the platform.  
- **Server**: Deployed on Vercel, utilizing its serverless infrastructure for fast and reliable performance.  
- **Gamified Selector**: Designed a JavaScript-based mechanism to rotate through options, adding suspense and fun to the decision-making process.  

---

## **Challenges we ran into**  
1. **Optimizing the Word Cloud**: Ensuring smooth real-time updates while maintaining a visually appealing layout was tricky.  
2. **Time Management**: With limited hackathon hours, balancing ambition and feasibility was a constant challenge.  
3. **Integration**: Combining the backend AI with the frontend visualization required meticulous debugging to ensure everything worked seamlessly.  

---

## **Accomplishments that we're proud of**  
- Successfully built a **gamified decision-making platform** that is both functional and entertaining.  
- Developed a project that’s lighthearted and approachable while showcasing practical applications of AI technology.  

---

## **What we learned**  
- **Model Fine-Tuning**: Developed skills in fine-tuning the Gemini-1.5-Flash model to create more tailored and contextually relevant outputs for user queries.  
- **Gamification Design**: Learned how to craft engaging, user-centric features that combine functionality with entertainment to create a fun and interactive experience.  
- **Serverless Deployment**: Gained experience in using Vercel’s serverless infrastructure for seamless and efficient deployment.  
- **Team Collaboration**: Strengthened our ability to coordinate effectively under tight deadlines, balancing creative problem-solving with technical implementation.  

---

## **What’s next for NeonBeam**  
- **Enhanced Customization**: Allow users to set parameters like the number of options or specific categories for suggestions.  
- **Mobile Optimization**: Build a mobile-friendly version to make NeonBeam accessible anywhere.  
- **Expanded Use Cases**: Integrate APIs for local restaurant recommendations, movie listings, and more to provide highly relevant suggestions.  
- **Social Sharing**: Add a feature for users to share their final choices with friends for added fun.  

---