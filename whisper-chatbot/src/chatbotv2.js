import express from 'express';
import { OpenAI } from "langchain/llms/openai";
import { LLMChain } from "langchain/chains";
import createTranscription from "./createTranscription.js";
import { PromptTemplate, ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate } from "langchain/prompts";
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
config({path: resolve(__dirname, '../.env')});
const app = express();
app.use(express.json()); // for parsing application/json

const transcribe = async (filePath) => {
    const transcription = await createTranscription(filePath);
    return transcription;
};

const model = new OpenAI({ temperature: 0.9 });

app.post('/api/transcribe', async (req, res) => {
    const filename = req.body.filename;
    const filePath = `/mnt/c/Users/10thl/Downloads/${filename}`;

    const text = await transcribe(filePath);
    console.log(text);
    // const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    //     SystemMessagePromptTemplate.fromTemplate(
    //       "You are a helpful assistant that translates {input_language} to {output_language}."
    //     ),
    //     HumanMessagePromptTemplate.fromTemplate("{text}"),
    // ]);

    // const chain = new LLMChain({ llm: model, prompt: chatPrompt });
    // const result = await chain.call({
    //     input_language: "English",
    //     output_language: "French",
    //     text: text,
    // });
    const chatPromptB = new PromptTemplate({
        inputVariables: ["question"],
        template: "Answer the following question: {question}",
    });

    const chainB = new LLMChain({ llm: model, prompt: chatPromptB });
    const resB = await chainB.call({question: text});


    res.json(resB);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
