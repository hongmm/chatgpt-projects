import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import config from "./config";

export const run = async () => {
    const embeddings = new OpenAIEmbeddings({
        timeout: 1000, // 1s timeout
        maxConcurrency: 5, // 5 concurrent requests
        maxRetries: 10, // 10 retries
    });
    /* Embed queries */
    const res = await embeddings.embedQuery("Hello world");
    console.log(res);
    /* Embed documents */
    const documentRes = await embeddings.embedDocuments([
        "Hello world",
        "Bye bye",
    ]);
    console.log({ documentRes });
};