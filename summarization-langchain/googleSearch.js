import { google } from "googleapis";
import express, { text } from "express";
import 'dotenv/config';
import scrape from "./scraper.js";
import summarize from "./summarize.js";
import analyze from "./analyzeDocument.js";

const router = express.Router();
const customsearch = google.customsearch('v1');

// Flow of this program:
// 1. Ask the user for a topic e.g. weather, finance, etc.
// 2. Google search that topic for the latest news regarding that subject
// 3. Get a list of the top 5 results and summarize each website using some llm
// 4. Get a summary of all the summaries and output that to the user

router.get('/', function (req, res) {
    const query = prompt("What would you like to search for?");
    // const query = "weather";
    customsearch.cse.list({
        auth: process.env.GOOGLE_API_KEY,
        cx: process.env.GOOGLE_ENGINE_ID,
        q: query,
        num: 5
    })
    .then(result => result.data)
    .then((result) => {  
        const { queries, items, searchInformation } = result;
        // console.log(items); // array of search objects with kind, title, htmlTitle, link, displayLink, snippet, htmlSnippet, cacheId, formattedUrl, htmlFormattedUrl, pagemap

        // for multiple articles, summarize each one and then summarize the summaries
        // let summaries = [];
        // for (let i=0; i<items.length; i++) {
            // summaries.push(summarize(items[i].snippet));
        // }.then() => {
            // analyze(summaries);
        //}
        scrape(items[0].link).then((text) => {
            summarize(items[0].snippet).then((summary) => {
                console.log(summary);
            });
        }).then((text) => {
            analyze(text).then((res) => {
                console.log(res);
            });
        }); 
        
        res.status(200).send("done");
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send(err);
    });
});

export default router;