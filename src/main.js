import { getFiveColumnCSV, getOneColumnCSV, getThreeColumnCSV, } from "../mockData/mockedJson.js";
import { SearchData } from "../mockData/SearchData.js";
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
function clearHistory() {
    mode = "BRIEF";
    commandList = [];
    loadedCSV = [[]];
}
// Mocked CSV data
function prepareCSVList() {
    csvList.set("mockedData/csv1", getFiveColumnCSV());
    csvList.set("mockedData/csv2", getThreeColumnCSV());
    csvList.set("mockedData/csv3", getOneColumnCSV());
}
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
function prepareButtonPress() {
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
function handleCommand() {
    // Gets user input
    var replHistory = document.getElementsByClassName("repl-history")[0];
    var newCommand = document.getElementsByClassName("repl-command-box")[0];
    if (newCommand === null) {
        console.log("Command could not be found");
    }
    else if (!(newCommand instanceof HTMLInputElement)) {
        console.log("Found command, but wasn't an input element");
    }
    else {
        var commandValue = newCommand.value;
        var commandObj = {};
        var output_1 = "";
        // User story #1
        if (commandValue === "mode") {
            if (mode === "BRIEF") {
                mode = "VERBOSE";
            }
            else {
                mode = "BRIEF";
            }
            output_1 = "Mode was changed to ".concat(mode);
            // User story #2
        }
        else if (commandValue.includes("load_file")) {
            // This line doesn't do anything right now
            var filePath = commandValue.split(" ")[1];
            //csvList.set(`${filePath}`, "WHOOOOOOO");
            // let gd = new csvData();
            var csvFile = csvList.get("".concat(filePath));
            if (csvFile != undefined) {
                loadedCSV = csvFile;
                output_1 = "Successfully loaded ".concat(filePath);
                commandList.push(commandObj);
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
        // Invalid command
        else {
            output_1 = "<p>Could not recognize that command</p>";
        }
        updateHTML(commandValue, output_1, commandObj, replHistory);
        var inputValue = document.getElementById("input")
            .onreset;
    }
}
function updateHTML(commandValue, output, commandObj, replHistory) {
    commandObj[commandValue] = output;
    commandList.push(commandObj);
    if (mode === "BRIEF") {
        replHistory.innerHTML += "<p>".concat(commandObj[commandValue], "</p>");
    }
    else {
        replHistory.innerHTML += "<p>Command: ".concat(commandValue, "</p>");
        replHistory.innerHTML += "<p>Output: ".concat(commandObj[commandValue], "</p>");
    }
    replHistory.innerHTML += "<hr/>";
}
export { clearHistory, handleButtonPress, handleCommand };
export function getmode() {
    return mode;
}
export function getloadedCSV() {
    return loadedCSV;
}
