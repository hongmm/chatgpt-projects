import { OpenAI } from "langchain/llms/openai";
import { LLMChain } from "langchain/chains";
import createTranscription from "./createTranscription.js";
import recordAudio from "./recordAudio.js";
import { ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate } from "langchain/prompts";
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import tts from './convertTextToSpeech.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
config({path: resolve(__dirname, '../.env')});

const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(
      "Answer the following question: {question}"
    ),
    HumanMessagePromptTemplate.fromTemplate("{question}"),
]);

const model = new OpenAI({ temperature: 0.9 });
const chain = new LLMChain({ llm: model, prompt: chatPrompt });

const handleConversation = async () => {
  try {
    const filePath = await recordAudio(); // Wait for recordAudio to complete
    const transcription = await createTranscription(filePath);
    console.log("User:", transcription);

    // Ask the model for a response
    const res = await chain.call({ question: transcription });
    const parsedData = JSON.parse(res.text);
    const reply = parsedData[0].data.content;
    console.log("ChatGPT:", reply);

    await tts(reply); // Convert response to speech and play it back to the user

    // Recursive call to continue the conversation
    await handleConversation();
    } catch (error) {
        console.error("Error:", error);
        throw error; // Propagate the error
    }
};

// Call the conversation handler to start the conversation
handleConversation();
