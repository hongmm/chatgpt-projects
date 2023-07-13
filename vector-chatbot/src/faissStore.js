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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const faiss_1 = require("langchain/vectorstores/faiss");
const openai_1 = require("langchain/embeddings/openai");
const fileLoaders_1 = __importDefault(require("./fileLoaders"));
const openai_2 = require("langchain/llms/openai");
const chains_1 = require("langchain/chains");
const text_splitter_1 = require("langchain/text_splitter");
require("./config");
const store = () => __awaiter(void 0, void 0, void 0, function* () {
    const docs = yield (0, fileLoaders_1.default)();
    const model = new openai_2.OpenAI({ temperature: 0, maxConcurrency: 5 });
    const textSplitter = new text_splitter_1.RecursiveCharacterTextSplitter({ chunkSize: 1000 });
    const chunks = yield textSplitter.splitDocuments(docs);
    const chain = (0, chains_1.loadSummarizationChain)(model, { type: "map_reduce" });
    yield chain.call({
        input_documents: chunks
    });
    const vectorStore = yield faiss_1.FaissStore.fromDocuments(chunks, new openai_1.OpenAIEmbeddings());
    const directory = "./vector_store";
    yield vectorStore.save(directory);
    console.log("Saved vector store to directory: ", directory);
});
store();
