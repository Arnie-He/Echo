window.onload = function () {
    prepareButtonPress();
    prepareCSVList();
};
var mode = "BRIEF";
var commandList = new Array();
var loadedCSV = new Array();
var csvList = new Map();
function prepareCSVList() {
    csvList.set("csv1", [
        ["1", "2", "3", "4", "5"],
        ["The", "song", "remains", "the", "same."],
        ["I", "like", "to", "sing", "!"],
        ["C", "S", "3", "2", "."],
        ["WOO", "HOO", "BADABING", "BADA", "BOOM"],
    ]);
    csvList.set("csv2", [
        ["a", "b", "c"],
        ["d", "e", "f"],
        ["g", "h", "i"],
    ]);
    csvList.set("csv3", [[""], ["Aaron"], ["Barbara"], ["Clara"], ["Dylan"]]);
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
    var replHistory = document.getElementsByClassName("repl-history")[0];
    if (event === null) {
        console.log("Button press was not registered");
    }
    else if (commandList === null) {
        console.log("Unable to process list of commands");
    }
    else {
        var newCommand = document.getElementsByClassName("repl-command-box")[0];
        if (newCommand === null) {
            console.log("Command could not be found");
        }
        else if (!(newCommand instanceof HTMLInputElement)) {
        }
        else {
            var commandValue = newCommand.value;
            var commandObj = {};
            if (commandValue === "mode") {
                if (mode === "BRIEF") {
                    mode = "VERBOSE";
                }
                else {
                    mode = "BRIEF";
                }
                commandObj[commandValue] = "Mode was changed to ".concat(mode);
                commandList.push(commandObj);
                replHistory.innerHTML += "<p>".concat(commandObj[commandValue], "</p>");
            }
            else if (commandValue.includes("load_file")) {
                var filePath = commandValue.split(" ")[1];
                var csvFile = csvList.get(filePath);
                if (csvFile != undefined) {
                    loadedCSV = csvFile;
                    commandObj[commandValue] = "Successfully loaded ".concat(filePath);
                    commandList.push(commandObj);
                    if (mode === "BRIEF") {
                        replHistory.innerHTML += "<p>".concat(commandObj[commandValue], "</p>");
                    }
                    else {
                        replHistory.innerHTML += "<p>Command: ".concat(commandValue, "</p>");
                        replHistory.innerHTML += "<p>Output: ".concat(commandObj[commandValue], "</p>");
                    }
                }
                else {
                    console.log("CSV file could not be found");
                }
            }
            else if (commandValue === "view") {
                loadedCSV.forEach(function (row) {
                    replHistory.innerHTML += "<p>".concat(row, "</p>");
                });
            }
            else if (commandValue === "search") {
            }
            else {
                if (mode === "BRIEF") {
                    replHistory.innerHTML += "<p>Could not recognize that command</p>";
                }
                else {
                    replHistory.innerHTML += "<p>Command: ".concat(commandValue, "</p>");
                    replHistory.innerHTML += "<p>Could not recognize that command</p>";
                }
            }
        }
    }
}
