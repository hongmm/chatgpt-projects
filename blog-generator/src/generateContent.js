import { ChatOpenAI } from "langchain/chat_models/openai";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import "dotenv/config";
import { Configuration, OpenAIApi } from "openai";

const generateContent = async (data) => {
  // console.log(process.env.REACT_APP_OPENAI_API_KEY)
  const topic = data;

  const chat = new ChatOpenAI({ 
    temperature: 0
  });

  const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(
      "Generate a blog post about {topic}. Limit to 500 characters."
    ),
    HumanMessagePromptTemplate.fromTemplate("{topic}"),
  ]);

  const chainA = new LLMChain({
    prompt: chatPrompt,
    llm: chat,
  });

  const resA = await chainA.call({
    topic: topic,
  });

  let content = resA.text;

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createImage({
    prompt: topic,
    n: 1,
    size: "1024x1024",
  });

  return content + response.data.data[0].url;
};

export default generateContent;
