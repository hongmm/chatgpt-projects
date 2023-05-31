# Topic summarizer 

## General prompts used to generate this app
1. What are some good intro projects to work on to familiarize myself with LangChain?
2. I would like to try working on the Summarization project. Please detail out this project for me as if you were a project manager and I am an engineer assigned to this project.
3. Create the text summarization project using LangChain in Javascript. I want you to create both the front end and the back end code. You may utilize any libraries you think would be required for this project. For information regarding LangChain, check out this github repo https://github.com/hwchase17/langchain 
4. What are some good ways to scrape the web?
5. Develop a  boilerplate code for web scraping using Puppeteer

## Personal notes
This is my first project utilizing LangChain to chain multiple llms. The user would prompt in terminal a subject to search the web and summarize. The app would then scrape the web by taking the top 5 google search results using Google's custom search API and Puppeteer and then summarize them using openAI API and langchain. The app would then return the summarized text to the user for both individual articles and the entire search results. Currently, the app I have only set to a single article, more specifically the first result. Filtering out the relevant information from the article is a work in progress since I could not develop a general purpose web scraper that pulls only the important information. I would like to utilize in the future Bard's API to quickly read websites but for now this is where I will keep the project at. 