// runs in the context of the web pages visited by the user
// used to listen for events on the webpages visited
// can use this file to listen for click event on links and then open note editor for the link that was clicked

// get current page's URL
var url =  chrome.runtime.getURL("");

// create a new note
var note = {
    "title": "Note Title",
    "content": "New Note",
    "url": url
};

// save the note
chrome.storage.local.set("notes", [note]);
