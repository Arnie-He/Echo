window.onload = function () {
    prepareButtonPress();
};
var isVerbose = false;
var commandList = new Map();
function prepareButtonPress() {
    var maybeButtons = document.getElementsByClassName("submit-button");
    var maybeButton = maybeButtons.item(0);
    if (maybeButton == null) {
        console.log("couldn't find the button");
    }
    else if (!(maybeButton instanceof HTMLButtonElement)) {
        console.log("found element, but wasn't button element");
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
            commandList.set(newCommand.value, "placeholder");
            if (newCommand.value === "mode") {
                changeMode();
            }
            else {
                replHistory.innerHTML += "<p>".concat(newCommand.value, "</p>");
                if (isVerbose === true) {
                    replHistory.innerHTML += "<p>placeholder</p>";
                }
            }
        }
    }
}
function changeMode() {
    var replHistory = document.getElementsByClassName("repl-history")[0];
    replHistory.innerHTML = "";
    var keys = Array.from(commandList.keys());
    var values = Array.from(commandList.values());
    if (isVerbose === true) {
        keys.forEach(function (key) {
            replHistory.innerHTML += key;
            replHistory.innerHTML += "<br>";
        });
        isVerbose = false;
    }
    else {
        Array.from(keys).map(function (k, v) {
            replHistory.innerHTML = replHistory.innerHTML + "Command: " + k;
            replHistory.innerHTML += "<br>";
            replHistory.innerHTML = replHistory.innerHTML + "Output: " + values[v];
            replHistory.innerHTML += "<br><br>";
        });
        isVerbose = true;
    }
}
