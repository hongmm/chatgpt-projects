import "dotenv/config";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { DocxLoader } from "langchain/document_loaders/fs/docx";
import { CSVLoader } from "langchain/document_loaders/fs/csv";
import { TextLoader } from "langchain/document_loaders/fs/text";
import "./config";

const FileLoaders = async () => {
  const loader = new DirectoryLoader(
    "./document_loaders/files",
    {
      ".pdf": (path) => new PDFLoader(path, {splitPages: false,}),
      ".docx": (path) => new DocxLoader(path),
      ".csv": (path) => new CSVLoader(path),
      ".txt": (path) => new TextLoader(path),
    }
  );
  const docs = await loader.load();
  return docs;
}

export default FileLoaders;