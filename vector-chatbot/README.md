# ChatGPT with vector stores
A program that lets you store personal documents in a vector store and then query them using ChatGPT. Utilizes FAISS and OpenAI embeddings to store and query documents.
Theoretically any documents can work but the project is currently set up so that only pdf, text, docx, and csv files can be stored and queried using the fileLoaders script.
In addition, only pdf files can be added using the "add file" function from the chatbot.
Given the nature of LangChain's agents and prompting, results may vary greatly based on the prompt used.

## Features
* Add pdf, docx, text, and csv files to your vector store
* Can prompt the chatbot based on the contents of the files in the vector store
* Can either add multiple files to the vector store at once or add in specific files using the "add file" function

## Installation
1. Clone the repository
2. Navigate to the project directory: cd to-do-list
3. Install dependencies: npm install
4. Add in your OpenAI API key to the .env file

## Loading Files
1. Create a directory for the files within the src file, default path is set to src/document_loaders/files so you will need to add in document_loaders/files to the src directory if you want to use the default path
2. Run the fileLoaders script: node fileLoaders.js. This will add all the files in the directory to the vector store, you can change the path to the directory in fileLoaders.ts

## Running the Chatbot
1. Run the chatbot script: node chatbot.js
2. If you want to add a specific file to the vector store, type "add file" and then enter the path to the file. Default path is src/document_loaders/storage which is set in the summarizer.ts file

