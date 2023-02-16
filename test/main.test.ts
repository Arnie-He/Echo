import * as main from "main.js";
import "@testing-library/jest-dom";

const startHTML = `<div class="repl">
      <div class="repl-history"></div>
      <hr />
      <div class="repl-input">
        <input type="text" class="repl-command-box" />
        <button type="button" class="submit-button">submit</button>
      </div>
</div>`;

let maybeInput: HTMLElement | null;

beforeEach(() => {
  main.clearHistory();
  document.body.innerHTML = startHTML;

  maybeInput = document.getElementById("repl-command-box");
});

test("loading a file", () => {
  if (maybeInput instanceof HTMLInputElement) {
    maybeInput.value = "load_file csv1";
  }

  main.handleCommand();

  const onfile: String[][] = [
    ["1", "2", "3", "4", "5"],
    ["The", "song", "remains", "the", "same."],
    ["I", "like", "to", "sing", "!"],
    ["C", "S", "3", "2", "."],
    ["WOO", "HOO", "BADABING", "BADA", "BOOM"],
  ];

  let file: String | undefined = main.getloadedCSV()[0];
  if (file != undefined) {
    expect(file).toBe(onfile);
  }
});

test("change mode", () => {
  if (maybeInput instanceof HTMLInputElement) {
    maybeInput.value = "mode";
  }

  main.handleCommand();

  let mod: String | undefined = main.getmode();
  if (mod != undefined) {
    expect(mod).toBe("Verbouse");
  }
});

test("view", () => {
  if (maybeInput instanceof HTMLInputElement) {
    maybeInput.value = "load_file csv1";
  }

  main.handleCommand();

  if (maybeInput instanceof HTMLInputElement) {
    maybeInput.value = "view";
  }

  main.handleCommand();

  expect(document.getElementById("repl-history")).toBe("");
});

test("search", () => {
  if (maybeInput instanceof HTMLInputElement) {
    maybeInput.value = "load_file csv1";
  }

  main.handleCommand();

  if (maybeInput instanceof HTMLInputElement) {
    maybeInput.value = "search 0 3579";
  }

  main.handleCommand();

  expect(document.getElementById("repl-history")).toBe("");
});

export {};
