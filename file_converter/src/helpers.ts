// Define the ConversionParams interface
export interface ConversionParams {
    conversionType: string;
    inputFilePath: string;
    outputFilePath: string;
  }
  
// Define the openFileExplorer function
export async function openFileExplorer(filePath: string): Promise<void> {
  const { exec } = require('child_process');
  const os = require('os');
  switch (os.platform()) {
      case 'darwin':
        await exec(`open "${filePath}"`);
        break;
      case 'win32':
        await exec(`start "" "${filePath}"`);
        break;
      case 'linux':
        await exec(`xdg-open "${filePath}"`);
        break;
      default:
        console.log(`File explorer not supported on platform ${os.platform()}`);
  }
}
