import { getFiveColumnCSV, getOneColumnCSV, getThreeColumnCSV, } from "../mockData/mockedJson.js";
import { SearchData } from "../mockData/SearchData.js";
// When the window has been loaded, add event handlers and mock CSV data
window.onload = function () {
    prepareButtonPress();
    prepareEnterFeature();
    prepareCSVList();
};
var mode = "BRIEF";
// List of commands shown in the repl-history
var commandList = new Array();
// Currently loaded CSV
var loadedCSV = new Array();
// Stores mocked CSV data
var csvList = new Map();
// Reset the page to its default
function clearHistory() {
    mode = "BRIEF";
    commandList = [];
    loadedCSV = [[]];
}
// Set up the mocked CSV data
// Note: the filenames do not represent actual file names
function prepareCSVList() {
    csvList.set("mockedData/csv1", getFiveColumnCSV());
    csvList.set("mockedData/csv2", getThreeColumnCSV());
    csvList.set("mockedData/csv3", getOneColumnCSV());
}
// Allows the user to submit their input using the Enter key
function prepareEnterFeature() {
    var inputs = document.getElementsByClassName("repl-command-box");
    var input = inputs.item(0);
    if (input == null) {
        console.log("Couldn't find the button");
    }
    else if (!(input instanceof HTMLInputElement)) {
        console.log("Found element, but wasn't button element");
    }
    else {
        input.addEventListener("keydown", function (e) {
            if (e.key == "Enter") {
                handleCommand();
            }
        });
    }
}
// Allows the user to submit their input using the Submit button
function prepareButtonPress() {
    // At this point, we're not sure whether the button actually exists
    var maybeButtons = document.getElementsByClassName("submit-button");
    var maybeButton = maybeButtons.item(0);
    if (maybeButton == null) {
        console.log("Couldn't find the button");
    }
    else if (!(maybeButton instanceof HTMLButtonElement)) {
        console.log("Found element, but wasn't button element");
    }
    else {
        maybeButton.addEventListener("click", handleButtonPress);
    }
}
// If something went wrong with the button press, an error is logged
// Otherwise, the user's submission contines to be processed
function handleButtonPress(event) {
    if (event === null) {
        console.log("Button press was not registered");
    }
    else if (commandList === null) {
        console.log("Unable to process list of commands");
    }
    else {
        handleCommand();
    }
}
// Handles what happens when the user inputs and submits something
function handleCommand() {
    // Gets user input
    // TODO: Narrow replHistory
    var replHistory = document.getElementsByClassName("repl-history")[0];
    var newCommand = document.getElementsByClassName("repl-command-box")[0];
    if (newCommand === null) {
        console.log("Command could not be found");
    }
    else if (!(newCommand instanceof HTMLInputElement)) {
        console.log("Found command, but wasn't an input element");
    }
    else {
        // Get the text of the command the user inputted
        var commandValue = newCommand.value;
        // Will be added to commandList once populated
        var commandObj = {};
        var output_1 = "";
        // User story #1
        if (commandValue === "mode") {
            // Because there are only two modes, a simple if/else statement is used
            if (mode === "BRIEF") {
                mode = "VERBOSE";
            }
            else {
                mode = "BRIEF";
            }
            // Alert the user that the mode was changed
            output_1 = "Mode was changed to ".concat(mode);
            // User story #2
        }
        else if (commandValue.includes("load_file")) {
            var filePath = commandValue.split(" ")[1];
            // Extract the CSV from the mocked data
            var csvFile = csvList.get("".concat(filePath));
            if (csvFile != undefined) {
                // Update the currently loaded file and alert the user
                loadedCSV = csvFile;
                output_1 = "Successfully loaded ".concat(filePath);
                // Filepath provided was not in the mocked data
            }
            else {
                replHistory.innerHTML += "<p>CSV file could not be found</p>";
            }
            // User story #3
        }
        else if (commandValue === "view") {
            if (loadedCSV.length === 0) {
                output_1 = "<p>No CSV file has been loaded yet</p>";
            }
            // Construct a table based on the values in the mocked data
            output_1 += "<table>";
            loadedCSV.forEach(function (row) {
                output_1 += "<tr>";
                row.forEach(function (col) {
                    output_1 += "<td>".concat(col, "</td>");
                });
                output_1 += "</tr>";
            });
            output_1 += "</table>";
            // User story #4
        }
        else if (commandValue.includes("search")) {
            var column = commandValue.split(" ")[1];
            var value = commandValue.split(" ")[2];
            // call the back-end searching method using column and value.
            // mock the back-end for this sprint
            var sd = new SearchData();
            sd.searchResult(loadedCSV, column, value).forEach(function (row) {
                replHistory.innerHTML += "<p>Searching Result:</p>";
                replHistory.innerHTML += "<p>".concat(row, "</p>");
            });
        }
        // Invalid/unrecognized command
        else {
            output_1 = "<p>Could not recognize that command</p>";
        }
        updateHTML(commandValue, output_1, commandObj, replHistory);
    }
}
// Updates the page to reflect the newly inputted command
function updateHTML(commandValue, output, commandObj, replHistory) {
    commandObj[commandValue] = output;
    // Add the command to the history even if it was unsuccessful
    commandList.push(commandObj);
    // Update the UI based on the mode
    if (mode === "BRIEF") {
        replHistory.innerHTML += "<p>".concat(commandObj[commandValue], "</p>");
    }
    else {
        replHistory.innerHTML += "<p>Command: ".concat(commandValue, "</p>");
        replHistory.innerHTML += "<p>Output: ".concat(commandObj[commandValue], "</p>");
    }
    // Add a horizontal line for visiblity between commands
    replHistory.innerHTML += "<hr/>";
}
function getMode() {
    return mode;
}
function getLoadedCSV() {
    return loadedCSV;
}
export { clearHistory, prepareButtonPress, prepareEnterFeature, prepareCSVList, handleButtonPress, handleCommand, getMode, getLoadedCSV, };
