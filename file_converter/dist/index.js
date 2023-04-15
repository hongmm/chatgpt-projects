"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
const fs = __importStar(require("fs"));
const pdf = __importStar(require("pdf-creator-node"));
const csv = __importStar(require("csv-parser"));
const csv_writer_1 = require("csv-writer");
const open = __importStar(require("open"));
// Define the options for the PDF to DOCX conversion
const pdfOptions = {
    format: 'A4',
    orientation: 'portrait',
    border: '10mm',
};
// Define the options for the CSV to TXT conversion
const csvOptions = {
    header: true,
    delimiter: ',',
};
// Define the function to prompt the user for the file conversion type
function promptForConversionType() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question('Enter the type of file conversion (DOCX to PDF, TXT to CSV, or CSV to TXT): ', (conversionType) => {
        if (conversionType === 'DOCX to PDF') {
            promptForFileNames('docx', 'pdf', convertDocxToPdf);
        }
        else if (conversionType === 'TXT to CSV') {
            promptForFileNames('txt', 'csv', convertTxtToCsv);
        }
        else if (conversionType === 'CSV to TXT') {
            promptForFileNames('csv', 'txt', convertCsvToTxt);
        }
        else {
            console.log('Invalid file conversion type entered.');
            rl.close();
        }
    });
}
// Define the function to prompt the user to select a file using a file explorer
function promptForFilePath(fileType, callback) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question(`Select the ${fileType} file: `, (file) => {
        // Open the file explorer dialog
        openFileDialog(fileType, (filePath) => {
            // Check if the selected file exists
            if (fs.existsSync(filePath)) {
                callback(filePath);
            }
            else {
                console.log(`File ${filePath} does not exist.`);
                promptForFilePath(fileType, callback);
            }
            rl.close();
        });
    });
}
// Define the function to prompt the user for the file names
function promptForFileNames(inputFileType, outputFileType, conversionFunction) {
    promptForFilePath(inputFileType, (inputFilePath) => {
        promptForFilePath(outputFileType, (outputFilePath) => {
            // Call the conversion function using the provided file paths
            conversionFunction({ inputFilePath, outputFilePath });
        });
    });
}
// Define the function to convert DOCX to PDF
function convertDocxToPdf(params) {
    const content = fs.readFileSync(params.inputFilePath, 'utf-8');
    const html = '<html><body>' + content + '</body></html>';
    const pdfOutput = pdf.create(html, pdfOptions);
    fs.writeFileSync(params.outputFilePath, pdfOutput);
    console.log('The DOCX file was successfully converted to PDF.');
}
// Define the function to convert TXT to CSV
function convertTxtToCsv(params) {
    const results = [];
    fs.createReadStream(params.inputFilePath)
        .pipe(csv(csvOptions))
        .on('data', (data) => results.push(data))
        .on('end', () => {
        const csvWriter = (0, csv_writer_1.createObjectCsvWriter)({
            path: params.outputFilePath,
            header: [
                { id: 'column1', title: 'Column 1' },
                { id: 'column2', title: 'Column 2' },
                { id: 'column3', title: 'Column 3' },
            ],
        });
        csvWriter
            .writeRecords(results)
            .then(() => console.log('The TXT file was successfully converted to CSV.'));
    });
}
// Define the function to convert CSV to TXT
function convertCsvToTxt(params) {
    const results = [];
    fs.createReadStream(params.inputFilePath)
        .pipe(csv(csvOptions))
        .on('data', (data) => results.push(data))
        .on('end', () => {
        const fileContent = results.map((result) => {
            return $;
            {
                result.column1;
            }
            $;
            {
                result.column2;
            }
            $;
            {
                result.column3;
            }
            ;
        }).join('\n');
        fs.writeFileSync(params.outputFilePath, fileContent);
        console.log('The CSV file was successfully converted to TXT.');
    });
}
// Define the function to open the file explorer dialog
function openFileDialog(fileType, callback) {
    const options = {
        title: Select, a, $
    }, { fileType }, file, defaultPath, filters;
}
;
// Open the file explorer dialog
open.dialog.showOpenDialog(options).then((result) => {
    if (!result.canceled) {
        callback(result.filePaths[0]);
    }
}).catch((err) => {
    console.log(err);
});
// Prompt the user for the file conversion type
promptForConversionType();
