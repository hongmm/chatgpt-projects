import fs from 'fs';
import path from 'path';
import * as docx from 'docx';
import { csvFormat } from 'd3-dsv';
import { createObjectCsvWriter } from 'csv-writer';
import { PDFDocument } from 'pdf-lib';
import { ConversionParams, openFileExplorer } from './helpers';

// Define the function to convert DOCX to PDF
export async function convertDocxToPdf(params: ConversionParams): Promise<void> {
    const input = fs.readFileSync(params.inputFilePath);
    const doc = await docx.Document.load(input);
  
    const buffer = await docx.Packer.toBuffer(doc);
    const pdfDoc = await PDFDocument.load(buffer);
  
    const page = pdfDoc.addPage();
    const pdfDocContent = await pdfDoc.embedPage(page);
  
    const embeddedPage = pdfDoc.getPage(0);
    embeddedPage.drawPage(pdfDocContent);
  
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(params.outputFilePath, pdfBytes);
    console.log('The DOCX file was successfully converted to PDF.');
  
    await openFileExplorer(path.resolve(params.outputFilePath));
  }

// Define the function to convert TXT to CSV
export function convertTxtToCsv(params: ConversionParams): void {
  const output = createObjectCsvWriter({
    path: params.outputFilePath,
    header: ['line'],
  });

  fs.readFile(params.inputFilePath, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    const rows = data.trim().split('\n').map((row) => ({ line: row }));
    output.writeRecords(rows).then(() => {
      console.log('The TXT file was successfully converted to CSV.');
      openFileExplorer(path.resolve(params.outputFilePath));
    });
  });
}

// Define the function to convert CSV to TXT
export function convertCsvToTxt(params: ConversionParams): void {
  const output = fs.createWriteStream(params.outputFilePath);

  fs.createReadStream(params.inputFilePath)
    .pipe(csv(csvFormat))
    .on('data', (data: any) => {
      output.write(`${data}\n`);
    })
    .on('end', () => {
      output.end();
      console.log('The CSV file was successfully converted to TXT.');
      openFileExplorer(path.resolve(params.outputFilePath));
    });
}
