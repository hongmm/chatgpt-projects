import React from "react";
import ReactDOM from "react-dom/client";
import { AudioRecorder } from 'react-audio-voice-recorder';

const addAudioElement = (blob) => {
  const url = URL.createObjectURL(blob);
  const audio = document.createElement("audio");
  audio.src = url;
  audio.controls = true;
  document.body.appendChild(audio);
};

const VoiceRecorder = () => (
  <React.StrictMode>
    <AudioRecorder
      onRecordingComplete={addAudioElement}
      audioTrackConstraints={{
        noiseSuppression: true,
        echoCancellation: true,
      }}
      downloadOnSavePress={true}
      downloadFileExtension="mp3"
    />
  </React.StrictMode>
);

export default VoiceRecorder;



// // Import module.
// // const AudioRecorder = require('node-audiorecorder')
// import AudioRecorder from 'node-audiorecorder'

// // Options is an optional parameter for the constructor call.
// // If an option is not given the default value, as seen below, will be used.
// const options = {
//   program: `rec`, // Which program to use, either `arecord`, `rec`, or `sox`.
//   device: null, // Recording device to use, e.g. `hw:1,0`

//   bits: 16, // Sample size. (only for `rec` and `sox`)
//   channels: 1, // Channel count.
//   encoding: `signed-integer`, // Encoding type. (only for `rec` and `sox`)
//   format: `S16_LE`, // Encoding type. (only for `arecord`)
//   rate: 16000, // Sample rate.
//   type: `wav`, // Format type.

//   // Following options only available when using `rec` or `sox`.
//   silence: 2, // Duration of silence in seconds before it stops recording.
//   thresholdStart: 0.5, // Silence threshold to start recording.
//   thresholdStop: 0.5, // Silence threshold to stop recording.
//   keepSilence: true, // Keep the silence in the recording.
// }
// // Optional parameter intended for debugging.
// // The object has to implement a log and warn function.
// const logger = console

// // Create an instance.
// let audioRecorder = new AudioRecorder(options, logger)

// // Imports modules.
// import fs from 'fs'
// import path from 'path' 

// // Constants.
// const DIRECTORY = 'examples-recordings';

// // Create path to write recordings to.
// if (!fs.existsSync(DIRECTORY)) {
//   fs.mkdirSync(DIRECTORY);
// }

// // Log information on the following events.
// audioRecorder.on('error', function () {
//   console.warn('Recording error.');
// });
// audioRecorder.on('end', function () {
//   console.warn('Recording ended.');
// });

// // Create file path with random name.
// const fileName = path.join(
//   DIRECTORY,
//   Math.random()
//     .toString(36)
//     .replace(/[^0-9a-zA-Z]+/g, '')
//     .concat('.wav')
// );
// console.log('Writing new recording file at:', fileName);

// // Create write stream.
// const fileStream = fs.createWriteStream(fileName, { encoding: 'binary' });

// // Start and write to the file.
// audioRecorder.start().stream().pipe(fileStream);

// // Keep process alive.
// process.stdin.resume();
// console.warn('Press ctrl+c to exit.');