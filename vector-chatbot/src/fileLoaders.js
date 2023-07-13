"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const directory_1 = require("langchain/document_loaders/fs/directory");
const pdf_1 = require("langchain/document_loaders/fs/pdf");
const docx_1 = require("langchain/document_loaders/fs/docx");
const csv_1 = require("langchain/document_loaders/fs/csv");
const text_1 = require("langchain/document_loaders/fs/text");
require("./config");
const FileLoaders = () => __awaiter(void 0, void 0, void 0, function* () {
    const loader = new directory_1.DirectoryLoader("./document_loaders/files", {
        ".pdf": (path) => new pdf_1.PDFLoader(path, { splitPages: false, }),
        ".docx": (path) => new docx_1.DocxLoader(path),
        ".csv": (path) => new csv_1.CSVLoader(path),
        ".txt": (path) => new text_1.TextLoader(path),
    });
    const docs = yield loader.load();
    return docs;
});
exports.default = FileLoaders;
