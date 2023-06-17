import { OpenAI } from "langchain/llms/openai";
import { LLMChain } from "langchain/chains";
import createTranscription from "./createTranscription.js";
import { PromptTemplate, ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate } from "langchain/prompts";
import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const promptUser = () => {
    return new Promise((resolve, reject) => {
        rl.question('Enter the path to the MP3 file: ', (filePath) => {
            resolve(filePath);
            rl.close();
        });
    });
};

const transcribe = async (filePath) => {
    const transcription = await createTranscription(filePath);
    return transcription;
};

const model = new OpenAI({ temperature: 0.9 });
// need to replace below with user input
const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(
      "You are a helpful assistant that translates {input_language} to {output_language}."
    ),
    HumanMessagePromptTemplate.fromTemplate("{text}"),
]);

const text = await transcribe(await promptUser());

const chain = new LLMChain({ llm: model, prompt: chatPrompt });
const res = await chain.call({
    input_language: "English",
    output_language: "French",
    text: text,
});
console.log(res);

const chatPromptB = new PromptTemplate({
    inputVariables: ["question"],
    template: "Answer the following question: {question}",
});

const chainB = new LLMChain({ llm: model, prompt: chatPromptB });
const resB = await chainB.call({question: "What is the capital of France?"});
console.log(resB);