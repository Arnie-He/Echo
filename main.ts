window.onload = () => {
  prepareButtonPress();
};

type obj = { [key: string]: Object };
let mode = "BRIEF";
let commandList = new Array();

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
  const replHistory = document.getElementsByClassName("repl-history")[0];
  if (event === null) {
    console.log("Button press was not registered");
  } else if (commandList === null) {
    console.log("Unable to process list of commands");
  } else {
    const newCommand = document.getElementsByClassName("repl-command-box")[0];
    if (newCommand === null) {
      console.log("Command could not be found");
    } else if (!(newCommand instanceof HTMLInputElement)) {
    } else {
      const commandValue = newCommand.value;
      const commandObj: obj = {};
      if (commandValue === "mode") {
        if (mode === "BRIEF") {
          mode = "VERBOSE";
        } else {
          mode = "BRIEF";
        }
        commandObj[commandValue] = `Mode was changed to ${mode}`;
        commandList.push(commandObj);
        handleChangeMode();
      } else {
        commandObj[commandValue] = "placeholder";
        commandList.push(commandObj);
        replHistory.innerHTML += `<p>${commandObj[commandValue]}</p>`;
      }
    }
  }
}

function handleChangeMode() {
  const replHistory = document.getElementsByClassName("repl-history")[0];
  replHistory.innerHTML = "";

  if (mode === "BRIEF") {
    commandList.forEach((element) => {
      const value = Array.from(Object.values(element))[0];
      replHistory.innerHTML += value;
      replHistory.innerHTML += "<br><br>";
    });
  } else {
    commandList.forEach((element) => {
      const key = Array.from(Object.keys(element))[0];
      const value = Array.from(Object.values(element))[0];
      replHistory.innerHTML = replHistory.innerHTML + "Command: " + key;
      replHistory.innerHTML += "<br>";
      replHistory.innerHTML = replHistory.innerHTML + "Output: " + value;
      replHistory.innerHTML += "<br><br>";
    });
  }
}
