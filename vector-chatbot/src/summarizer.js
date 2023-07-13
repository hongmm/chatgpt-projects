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
exports.save = void 0;
const openai_1 = require("langchain/llms/openai");
const chains_1 = require("langchain/chains");
const text_splitter_1 = require("langchain/text_splitter");
const pdf_1 = require("langchain/document_loaders/fs/pdf");
const faiss_1 = require("langchain/vectorstores/faiss");
const openai_2 = require("langchain/embeddings/openai");
require("./config");
const save = (fileName) => __awaiter(void 0, void 0, void 0, function* () {
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
    const model = new openai_1.OpenAI({ temperature: 0, maxConcurrency: 5 });
    const textSplitter = new text_splitter_1.RecursiveCharacterTextSplitter({ chunkSize: 1000 });
    const loader = new pdf_1.PDFLoader("document_loaders/storage/" + fileName, { splitPages: false, });
    const doc = yield loader.load();
    const docs = yield textSplitter.splitDocuments(doc);
    // This convenience function creates a document chain prompted to summarize a set of documents.
    const chain = (0, chains_1.loadSummarizationChain)(model, { type: "map_reduce" });
    yield chain.call({
        input_documents: docs,
        // verbose: true,
    });
    const directory = "./vector_store";
    const vectorStore = yield faiss_1.FaissStore.load(directory, new openai_2.OpenAIEmbeddings());
    yield vectorStore.addDocuments(docs);
    yield vectorStore.save(directory);
});
exports.save = save;
