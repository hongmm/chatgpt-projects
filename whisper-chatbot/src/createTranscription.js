import { Configuration, OpenAIApi } from "openai";
import fs from "fs";
import "dotenv/config";

const createTranscription = async (fileName) => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  //const fileName = await recordAudio(); 
  const openai = new OpenAIApi(configuration);
  const resp = await openai.createTranscription(
    fs.createReadStream(fileName),
    "whisper-1"
  );
  
  return resp.data.text;
}

export default createTranscription;
