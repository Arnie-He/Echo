import { getEnvironmentData } from "worker_threads";
// import { csvData } from "./mockData/csvData";
// import { SearchData } from "./mockData/SearchData";
window.onload = () => {
  prepareButtonPress();
  prepareEnterFeature();
  prepareCSVList();
};

type obj = { [key: string]: Object };
let mode = "BRIEF";
// List of commands shown in the repl-history
let commandList = new Array();
// Currently loaded CSV
let loadedCSV = new Array<Array<string>>();
// Stores mocked CSV data
const csvList = new Map<string, Array<Array<string>>>();

// Mocked CSV data
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

function prepareEnterFeature() {
  const inputs = document.getElementsByClassName("repl-command-box");
  const input = inputs.item(0);
  if (input == null) {
    console.log("Couldn't find the button");
  } else if (!(input instanceof HTMLInputElement)) {
    console.log("Found element, but wasn't button element");
  } else {
    input.addEventListener("keydown", (e) => {
      if (e.key == "Enter") {
        handleCommand();
      }
    });
  }
}

function prepareButtonPress() {
  const maybeButtons = document.getElementsByClassName("submit-button");
  const maybeButton = maybeButtons.item(0);
  if (maybeButton == null) {
    console.log("Couldn't find the button");
  } else if (!(maybeButton instanceof HTMLButtonElement)) {
    console.log("Found element, but wasn't button element");
  } else {
    maybeButton.addEventListener("click", handleButtonPress);
  }
}

function handleButtonPress(event: MouseEvent) {
  if (event === null) {
    console.log("Button press was not registered");
  } else if (commandList === null) {
    console.log("Unable to process list of commands");
  } else {
    handleCommand();
  }
}

function handleCommand() {
  // Gets user input
  const replHistory = document.getElementsByClassName("repl-history")[0];
  const newCommand = document.getElementsByClassName("repl-command-box")[0];
  if (newCommand === null) {
    console.log("Command could not be found");
  } else if (!(newCommand instanceof HTMLInputElement)) {
    console.log("Found command, but wasn't an input element");
  } else {
    const commandValue = newCommand.value;
    const commandObj: obj = {};
    let output = "";

    // User story #1
    if (commandValue === "mode") {
      if (mode === "BRIEF") {
        mode = "VERBOSE";
      } else {
        mode = "BRIEF";
      }
      output = `Mode was changed to ${mode}`;

      // User story #2
    } else if (commandValue.includes("load_file")) {
      // This line doesn't do anything right now
      const filePath = commandValue.split(" ")[1];
      //csvList.set(`${filePath}`, "WHOOOOOOO");
      // let gd = new csvData();
      const csvFile = csvList.get(`${filePath}`);
      if (csvFile != undefined) {
        loadedCSV = csvFile;
        output = `Successfully loaded ${filePath}`;
        commandList.push(commandObj);
      } else {
        replHistory.innerHTML += "<p>CSV file could not be found</p>";
      }

      // User story #3
    } else if (commandValue === "view") {
      if (loadedCSV.length === 0) {
        output = "<p>No CSV file has been loaded yet</p>";
      }
      output += "<table>";
      loadedCSV.forEach((row) => {
        output += "<tr>";
        row.forEach((col) => {
          output += `<td>${col}</td>`;
        });
        output += "</tr>";
      });
      output += "</table>";

      // User story #4
    } else if (commandValue.includes("search")) {
      // let column = commandValue.split(" ")[0];
      // let value = commandValue.split(" ")[1];
      // // call the back-end searching method using column and value.
      // // mock the back-end for this sprint
      // let sd = new SearchData();
      // sd.search_result(loadedCSV, column, value).forEach((row) => {
      //   replHistory.innerHTML += `<p>${row}</p>`;
      // });
    }
    // Invalid command
    else {
      output = `<p>Could not recognize that command</p>`;
    }

    updateHTML(commandValue, output, commandObj, replHistory);
  }
}

function updateHTML(
  commandValue: string,
  output: string,
  commandObj: obj,
  replHistory: Element
) {
  commandObj[commandValue] = output;
  commandList.push(commandObj);
  if (mode === "BRIEF") {
    replHistory.innerHTML += `<p>${commandObj[commandValue]}</p>`;
  } else {
    replHistory.innerHTML += `<p>Command: ${commandValue}</p>`;
    replHistory.innerHTML += `<p>Output: ${commandObj[commandValue]}</p>`;
    replHistory.innerHTML += "<hr/>";
  }
}
