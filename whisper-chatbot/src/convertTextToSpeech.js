import textToSpeech from "@google-cloud/text-to-speech";
import fs from "fs";
import util from "util";
import { config } from 'dotenv';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import Audic from 'audic';

const tts = async (text) => {
    text = text.replace(/(\r\n|\n|\r)/gm, " ");
    text = "Hello World"
    const __dirname = dirname(fileURLToPath(import.meta.url));
    config({path: resolve(__dirname, '../.env')});

    const client = new textToSpeech.TextToSpeechClient();
    const request = {
        input: {text: text},
        // Select the language and SSML voice gender (optional)
        voice: {languageCode: 'en-US', ssmlGender: 'NEUTRAL'},
        // select the type of audio encoding
        audioConfig: {audioEncoding: 'MP3'},
    };

    // Performs the text-to-speech request
    const [response] = await client.synthesizeSpeech(request);
    // Write the binary audio content to a local file
    const writeFile = util.promisify(fs.writeFile);
    await writeFile('output.mp3', response.audioContent, 'binary');
    console.log('Audio content written to file: output.mp3');
    const audic = new Audic('output.mp3');
    audic.volume = 0.5;
    console.log(audic.src)
    await audic.play();
    
    audic.addEventListener('ended', () => {
        audic.destroy();
    });

};

tts("Hello World")
export default tts;
