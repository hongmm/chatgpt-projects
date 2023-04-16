import fs from 'fs';
import readline from 'readline';
import path from 'path';
import { convertDocxToPdf, convertTxtToCsv, convertCsvToTxt } from './converters';
import { ConversionParams, openFileExplorer } from './helpers';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function promptUser() {
  rl.question('Enter the type of conversion (docx2pdf, txt2csv, csv2txt): ', (conversionType: string) => {
    rl.question('Enter the input file path: ', (inputFilePath: string) => {
      rl.question('Enter the output file path: ', (outputFilePath: string) => {
        const inputExists = fs.existsSync(inputFilePath);

        if (!inputExists) {
          console.log(`Input file "${inputFilePath}" does not exist.`);
          rl.close();
          return;
        }

        const params: ConversionParams = { inputFilePath, outputFilePath };

        switch (conversionType) {
          case 'docx2pdf':
            convertDocxToPdf(params);
            break;
          case 'txt2csv':
            convertTxtToCsv(params);
            break;
          case 'csv2txt':
            convertCsvToTxt(params);
            break;
          default:
            console.log(`Invalid conversion type "${conversionType}".`);
            rl.close();
            return;
        }

        openFileExplorer(path.resolve(outputFilePath));
        rl.close();
      });
    });
  });
}

promptUser();
