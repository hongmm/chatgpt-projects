"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = require("langchain/llms/openai");
const faiss_1 = require("langchain/vectorstores/faiss");
const openai_2 = require("langchain/embeddings/openai");
const agents_1 = require("langchain/agents");
const readline_1 = require("readline");
require("./config");
const summarizer_1 = require("./summarizer");
const rl = (0, readline_1.createInterface)({
    input: process.stdin,
    output: process.stdout,
});
const initializeChatbot = () => __awaiter(void 0, void 0, void 0, function* () {
    const directory = "./vector_store";
    const vectorStore = yield faiss_1.FaissStore.load(directory, new openai_2.OpenAIEmbeddings());
    const vectorStoreInfo = {
        name: "documents",
        description: "documents of various types",
        vectorStore,
    };
    const model = new openai_1.OpenAI({ maxConcurrency: 5 });
    const toolkit = new agents_1.VectorStoreToolkit(vectorStoreInfo, model);
    const agent = (0, agents_1.createVectorStoreAgent)(model, toolkit);
    // verbose mode
    // agent.verbose = true;
    return agent;
});
const processUserInput = (agent, input) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`User input: ${input}`);
    const result = yield agent.call({ input });
    console.log(`Agent output: ${result.output}`);
    return result.output;
});
const startConversation = () => __awaiter(void 0, void 0, void 0, function* () {
    let agent = yield initializeChatbot();
    console.log("Chatbot initialized. You can start the conversation.");
    // Conversation loop
    rl.on("line", (userInput) => __awaiter(void 0, void 0, void 0, function* () {
        if (userInput.toLowerCase() === "exit") {
            console.log("Conversation ended.");
            rl.close();
        }
        else if (userInput.toLowerCase() === "add file") {
            rl.question("Enter file name: ", (fileName) => __awaiter(void 0, void 0, void 0, function* () {
                console.log("Adding file to vector store...");
                yield (0, summarizer_1.save)(fileName);
                agent = yield initializeChatbot();
                console.log("File added to vector store.");
            }));
        }
        else {
            const agentResponse = yield processUserInput(agent, userInput); // Pass user input to the agent
            console.log(`Chatbot: ${agentResponse}`); // Display agent's response to the user
        }
    }));
});
startConversation();
