import { OpenAI } from "langchain/llms/openai";
import { loadSummarizationChain, AnalyzeDocumentChain } from "langchain/chains";

const analyze = async (text) => {
  const model = new OpenAI({ temperature: 0 });
  const combineDocsChain = loadSummarizationChain(model);
  const chain = new AnalyzeDocumentChain({
    combineDocumentsChain: combineDocsChain,
  });
  const res = await chain.call({
    input_document: text,
  });
  return res.text;
};

export default analyze;