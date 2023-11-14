import { bootstrap } from "global-agent";
import OpenAI from "openai";
import express from "express";
// 引用 global-agent 是为了解决 connection error的问题
process.env.GLOBAL_AGENT_HTTP_PROXY = "http://127.0.0.1:7890";
process.env.GLOBAL_AGENT_HTTPS_PROXY = "http://127.0.0.1:7890";

const apiKey = process.env.OPENAI_API_KEY;
const app = express();
app.use(express.json());
const PORT = 3000;

bootstrap();
const openai = new OpenAI({
  apiKey: apiKey,
});

app.post("/image", async (req, res) => {
    try {
      const { prompt, n = 1, size = "1024x1024" } = req.body;
      const response = await openai.images.generate({
        model: "dall-e-3", 
        prompt: prompt,    
        n: n,              
        size: size         
      });
  
      if (response.data && response.data.length > 0) {
        res.json({ imageUrl: response.data[0].url });
      } else {
        res.status(404).send("No image generated");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred");
    }
  });
  
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
