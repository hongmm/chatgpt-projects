import textToSpeech from "@google-cloud/text-to-speech";
import fs from "fs";
import util from "util";
import { config } from 'dotenv';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import Audic from 'audic';

const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const tts = async (reply) => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    config({path: resolve(__dirname, '../.env')});

    const client = new textToSpeech.TextToSpeechClient();
    const request = {
        input: {text: reply},
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
    audic.volume = 0.75;

    console.log('Playing audio...');
    // Playback response for five seconds, can be modified
    await timeout(5000);
    await audic.play();
    audic.addEventListener('ended', () => {
        audic.destroy();
    });
    console.log('Audio playback complete.');
};

export default tts;
