import { OpenAI } from "langchain/llms/openai";
import { loadSummarizationChain } from "langchain/chains";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { FaissStore } from "langchain/vectorstores/faiss";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { LLMResult } from "langchain/schema";
import { Serialized } from "langchain/load/serializable";
import "./config";

export const save = async (fileName: string) => {
    // For debugging purposes use this model instead of the one below
    // const model = new OpenAI({ temperature: 0, maxConcurrency: 5, callbacks: [{
    //     handleLLMStart: async (llm: Serialized, prompts: string[]) => {
    //       console.log(JSON.stringify(llm, null, 2));
    //       console.log(JSON.stringify(prompts, null, 2));
    //     },
    //     handleLLMEnd: async (output: LLMResult) => {
    //       console.log(JSON.stringify(output, null, 2));
    //     },
    //     handleLLMError: async (err: Error) => {
    //       console.error(err);
    //     },
    //   },] });
    const model = new OpenAI({ temperature: 0, maxConcurrency: 5 });
    const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
    const loader = new PDFLoader("document_loaders/storage/" + fileName, { splitPages: false, });
    const doc = await loader.load();
    const docs = await textSplitter.splitDocuments(doc);

    // This convenience function creates a document chain prompted to summarize a set of documents.
    const chain = loadSummarizationChain(model, { type: "map_reduce" });
    await chain.call({
        input_documents: docs,
        // verbose: true,
    });

    const directory = "./vector_store";
    const vectorStore = await FaissStore.load(
        directory,
        new OpenAIEmbeddings()
    );

    await vectorStore.addDocuments(docs);
    await vectorStore.save(directory);
};

