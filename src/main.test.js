import * as main from "./main.js";
import "@testing-library/jest-dom";
var startHTML = "<div class=\"repl\">\n      <div class=\"repl-history\"></div>\n      <hr />\n      <div class=\"repl-input\">\n        <input type=\"text\" class=\"repl-command-box\" />\n        <button type=\"button\" class=\"submit-button\">submit</button>\n      </div>\n</div>";
var maybeInput;
beforeEach(function () {
    main.clearHistory();
    document.body.innerHTML = startHTML;
    maybeInput = document.getElementById("repl-command-box");
});
test("loading a file", function () {
    if (maybeInput instanceof HTMLInputElement) {
        maybeInput.value = "load_file csv1";
    }
    main.handleCommand();
    var onfile = [
        ["1", "2", "3", "4", "5"],
        ["The", "song", "remains", "the", "same."],
        ["I", "like", "to", "sing", "!"],
        ["C", "S", "3", "2", "."],
        ["WOO", "HOO", "BADABING", "BADA", "BOOM"],
    ];
    var file = main.getloadedCSV()[0];
    if (file != undefined) {
        expect(file).toBe(onfile);
    }
});
test("change mode", function () {
    if (maybeInput instanceof HTMLInputElement) {
        maybeInput.value = "mode";
    }
    main.handleCommand();
    var mod = main.getmode();
    if (mod != undefined) {
        expect(mod).toBe("Verbouse");
    }
});
test("view", function () {
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
test("search", function () {
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
