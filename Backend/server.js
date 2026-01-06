import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import cors from "cors"

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const port =process.env.PORT ||3000;
const API = process.env.API_GEMINI_KEY;

const ai = new GoogleGenAI({apiKey:API});



app.post("/ask",async(req,res)=>{
  const {question} = req.body;
  if(!question)
      return res.status(400).json({error:"Question is required"});

  const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: question,
  config:{
    systemInstruction:"You are a helpfull assistant and help people "
  }
  });
  console.log(response.text);
  res.json({answer:response.text})
})


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})
