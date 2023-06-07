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

  let text = resA.text;

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createImage({
    prompt: topic,
    n: 1,
    size: "1024x1024",
  });

  const content = text + " " + response.data.data[0].url
  return {content: content, topic: topic};
};

export default generateContent;
