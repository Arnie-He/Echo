import * as main from "./main.js";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/dom";
import * as sd from "../mockData/SearchData.js";

const startHTML = `<div class="repl">
<div class="repl-history"></div>
<hr />
<div class="repl-input">
  <input
    type="text"
    class="repl-command-box"
    placeholder="Enter command here!"
    id="input"
    ;
  />
  <button class="submit-button">SUBMIT</button>
</div>
</div>`;

//let maybeInput: HTMLInputElement | null;

beforeEach(() => {
  main.clearHistory();
  document.body.innerHTML = startHTML;

  // possibly don't need this
  main.prepareButtonPress();
  main.prepareEnterFeature();
  main.prepareCSVList();

  //maybeInput = document.getElementsByClassName("repl-command-box")[0];
});

// TODO: Make sure text is displayed on screen
test("loading a file", () => {
  const commandBox = document.getElementsByClassName("repl-command-box")[0];
  if (commandBox instanceof HTMLInputElement) {
    commandBox.value = "load_file mockedData/csv1";
  }

  main.handleCommand();
  //main.handleButtonPress(new MouseEvent("click"));

  const onfile: String[][] = [
    ["1", "2", "3", "4", "5"],
    ["The", "song", "remains", "the", "same."],
    ["I", "like", "to", "sing", "!"],
    ["C", "S", "3", "2", "."],
    ["WOO", "HOO", "BADABING", "BADA", "BOOM"],
  ];

  let file: String[][] | undefined = main.getLoadedCSV();

  expect(file).toEqual(onfile);
});

test("change mode", () => {
  const commandBox = document.getElementsByClassName("repl-command-box")[0];
  if (commandBox instanceof HTMLInputElement) {
    commandBox.value = "mode";
  }

  main.handleCommand();

  let mod: String | undefined = main.getMode();
  if (mod != undefined) {
    expect(mod).toEqual("VERBOSE");
  }
});

test("view", () => {
  const commandBox = document.getElementsByClassName("repl-command-box")[0];
  if (commandBox instanceof HTMLInputElement) {
    commandBox.value = "load_file mockedData/csv3";
  }

  main.handleCommand();

  if (commandBox instanceof HTMLInputElement) {
    commandBox.value = "view";
  }

  main.handleCommand();

  const expectedValues = ["", "Aaron", "Barbara", "Clara", "Dylan"];

  expectedValues.forEach((value) => {
    const expectedValue = screen.getAllByText(value);
    expect(expectedValue).toBeDefined();
  });
});

test("search", () => {
  const commandBox = document.getElementsByClassName("repl-command-box")[0];
  if (commandBox instanceof HTMLInputElement) {
    commandBox.value = "load_file mockedData/csv1";
  }

  main.handleCommand();

  if (commandBox instanceof HTMLInputElement) {
    commandBox.value = "search 0 3579";
  }

  main.handleCommand();
  expect(screen.getByRole("table").innerHTML).toBe("");
});

// export {};

test("emptyres", () => {
  let s = new sd.SearchData();
  expect(s.searchResult([[]], "0", "3759")).toEqual([
    ["3759", "96 G. Psc", "7.26388", "1.55643", "0.68697"],
  ]);
  expect(s.searchResult([[]], "StarID", "3759")).toEqual([
    ["3759", "96 G. Psc", "7.26388", "1.55643", "0.68697"],
  ]);
  expect(s.searchResult([[]], "2", "3759")).toEqual([]);
});
