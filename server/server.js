import express from "express"
import * as dotenv from "dotenv"

import cors from "cors"
import {Configuration,OpenAIApi} from "openai"

dotenv.config()

const config=new Configuration({
    apiKey:process.env.OPENAI_API_KEY,
})

const openai=new OpenAIApi(config);

const app=express();
app.use(cors())

app.use(express.json());

app.get("/",async(req,res)=>{
res.status(200).send({message:"Hello from CodeX"})
})

app.post("/",async(req,res,next)=>{
try {
    const prompt =req.body.prompt

    const response=await openai.createCompletion({
        model:"text-davinci-003",
        prompt:`${prompt}`,
        temperature:0,
        max_tokens:3000,
        frequency_penalty:0.5,
        presence_penalty:0,
    })
    res.status(200).send({
        bot:response.data.choices[0].text
    })
} catch (error) {
    console.log(error);
    res.status(500).send({error})
}
})

app.listen(5000,()=>{
    console.log("Listening on port 5000")
})