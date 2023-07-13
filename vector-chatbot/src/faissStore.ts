import { FaissStore } from "langchain/vectorstores/faiss";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import FileLoaders from "./fileLoaders";
import { OpenAI } from "langchain/llms/openai";
import { loadSummarizationChain } from "langchain/chains";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import "./config";

const store = async () => {
  const docs = await FileLoaders();
  const model = new OpenAI({ temperature: 0, maxConcurrency: 5 });
  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
  const chunks = await textSplitter.splitDocuments(docs);

  const chain = loadSummarizationChain(model, { type: "map_reduce" });
  await chain.call({
      input_documents: chunks
  });
  
  const vectorStore = await FaissStore.fromDocuments(
    chunks,
    new OpenAIEmbeddings()
  );
  const directory = "./vector_store";
  await vectorStore.save(directory);
  console.log("Saved vector store to directory: ", directory);

};

store();