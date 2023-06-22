import recorder from 'node-record-lpcm16'
import fs from 'fs'

const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const recordAudio = async () => {
    const filename = 'input.wav'
    const file = fs.createWriteStream(filename, { encoding: 'binary' })
 
    const recording = recorder.record()
    console.log('Recording started')
    recording.stream().pipe(file)
    
    // Stop recording after five seconds, can be modified
    await timeout(5000);
    recording.stop()
    console.log('Recording stopped')
    return filename;
}

export default recordAudio;
