// popup.js
// runs in the context of the extension's popup
// create the UI for note taking extension

// Hide the editor view initially.
document.getElementById("editor").style.display = "none";

// Get the DOM elements.
var notesList = document.getElementById("notes-list");
var editorView = document.getElementById("editor");
var titleInput = document.getElementById("title");
var urlInput = document.getElementById("url");
var contentInput = document.getElementById("content");
var saveNoteButton = document.getElementById("save-note");

// Add a listener for the "click" event on the "Create Note" button.
document.getElementById("create-note").addEventListener("click", function () {
    // Show the editor view.
    document.getElementById("editor").style.display = "block";
});

// Create a new note list item.
function createNoteListItem(note) {
    var listItem = document.createElement("li");
    listItem.textContent = note.title;
    var button = document.createElement("button");
    button.className = "remove-note";
    button.textContent = "Remove Note";
    listItem.appendChild(button);
    listItem.addEventListener("click", function () {
        // Show the note editor for this note.
        showNoteEditor(note);
    });
    button.addEventListener("click", function () {
        // Call the removeNote() function.
        removeNote(this);
    });
    return listItem;
}

// Add a listener for the "click" event on the "Save Note" button.
document.getElementById("save-note").addEventListener("click", function () {
    // Get the values of the text boxes.
    var title = titleInput.value;
    var url = urlInput.value;
    var content = contentInput.value;
    var id = generateId();

    // If note exists
    if (getNote(id)) {
        // Edit the note.
        editNote(id, title, url, content);
    } else {
        // Create a new note.
        var note = {
            title: title,
            url: url,
            content: content,
            id: id
        };
        // Save the note.
        saveNote(note);
    }
});

function saveNote(note) {
    // Save the note to storage.
    chrome.storage.local.set({ "notes": [note] }).then(function (result) {
        // Hide the editor view.
        document.getElementById("editor").style.display = "none";
        requestAnimationFrame(function () {
            // Add the note to the list.
            notesList.appendChild(createNoteListItem(note));
            // Clear the text boxes.
            titleInput.value = "";
            urlInput.value = "";
            contentInput.value = "";
        });
    });
}

// Show the note editor for a given note.
function showNoteEditor(note) {
    // Set the title and content of the note editor.
    document.getElementById("editor").style.display = "block";
    titleInput.value = note.title;
    urlInput.value = note.url;
    contentInput.value = note.content;
}

function generateId() {
    // Generate a random number between 1 and 1000000.
    var id = Math.floor(Math.random() * 1000000);

    // Check if the id already exists.
    chrome.storage.local.get("notes").then(function(result) {
        // Check if the id already exists.
        result.notes.forEach(function (note) {
            if (note.id === id) {
                // The id already exists, so generate a new one.
                id = Math.floor(Math.random() * 1000000);
            }
        });
    });

    // Return the id.
    return id;
}

function getNote(id) {
    // Get the list of notes from storage.
    chrome.storage.local.get("notes").then(function(result) {
        // Find the note with the specified id.
        var note = result.notes.forEach(function(note) {
            return note.id === id;
        });
        // Return the note.
        return note;
    });
}

function editNote(id, url, title, content) {
    // Retrieve the note from storage.
    var note = getNote(id);

    // Update the values in the note.
    note.title = title;
    note.url = url;
    note.content = content;

    // Save the note to storage.
    saveNote(note);
}

// Define the removeNote() function.
function removeNote(button) {
    // Get the id of the list item.
    var id = button.parentElement.id;

    // Remove the note from storage.
    chrome.storage.local.remove(["notes", id]).then(function(result){
        // Remove the list item from the DOM.
        button.parentElement.remove();
    });
}