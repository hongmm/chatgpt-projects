import { OpenAI } from "langchain/llms/openai";
import { FaissStore } from "langchain/vectorstores/faiss";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { VectorStoreToolkit, createVectorStoreAgent, VectorStoreInfo, AgentExecutor } from "langchain/agents";
import { createInterface } from "readline";
import "./config";
import { save } from "./summarizer";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const initializeChatbot = async () => {
  const directory = "./vector_store";
  const vectorStore = await FaissStore.load(
    directory,
    new OpenAIEmbeddings()
  );

  const vectorStoreInfo: VectorStoreInfo = {
    name: "documents",
    description: "documents of various types",
    vectorStore,
  };

  const model = new OpenAI({ maxConcurrency: 5 });
  const toolkit = new VectorStoreToolkit(vectorStoreInfo, model);
  const agent = createVectorStoreAgent(model, toolkit);
  // verbose mode
  // agent.verbose = true;
  return agent;
};

const processUserInput = async (agent: AgentExecutor, input: string ) => {
  console.log(`User input: ${input}`);
  const result = await agent.call({ input });
  console.log(`Agent output: ${result.output}`);
  return result.output;
};

const startConversation = async () => {
  let agent = await initializeChatbot();
  console.log("Chatbot initialized. You can start the conversation.");
  
  // Conversation loop
  rl.on("line", async (userInput) => {
    if (userInput.toLowerCase() === "exit") {
      console.log("Conversation ended.");
      rl.close();
    } else if (userInput.toLowerCase() === "add file") {
      rl.question("Enter file name: ", async (fileName) =>{
        console.log("Adding file to vector store...");
        await save(fileName);
        agent = await initializeChatbot();
        console.log("File added to vector store.");
      });
      
    } else {
      const agentResponse = await processUserInput(agent, userInput); // Pass user input to the agent
      console.log(`Chatbot: ${agentResponse}`); // Display agent's response to the user
    }
  });
};

startConversation();
