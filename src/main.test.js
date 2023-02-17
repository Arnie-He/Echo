import * as main from "./main.js";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/dom";
import * as sd from "../mockData/SearchData.js";
var startHTML = "<div class=\"repl\">\n<div class=\"repl-history\"></div>\n<hr />\n<div class=\"repl-input\">\n  <input\n    type=\"text\"\n    class=\"repl-command-box\"\n    placeholder=\"Enter command here!\"\n    id=\"input\"\n    ;\n  />\n  <button class=\"submit-button\">SUBMIT</button>\n</div>\n</div>";
//let maybeInput: HTMLInputElement | null;
beforeEach(function () {
    main.clearHistory();
    document.body.innerHTML = startHTML;
    // possibly don't need this
    main.prepareButtonPress();
    main.prepareEnterFeature();
    main.prepareCSVList();
    //maybeInput = document.getElementsByClassName("repl-command-box")[0];
});
// TODO: Make sure text is displayed on screen
test("loading a file", function () {
    var commandBox = document.getElementsByClassName("repl-command-box")[0];
    if (commandBox instanceof HTMLInputElement) {
        commandBox.value = "load_file mockedData/csv1";
    }
    main.handleCommand();
    //main.handleButtonPress(new MouseEvent("click"));
    var onfile = [
        ["1", "2", "3", "4", "5"],
        ["The", "song", "remains", "the", "same."],
        ["I", "like", "to", "sing", "!"],
        ["C", "S", "3", "2", "."],
        ["WOO", "HOO", "BADABING", "BADA", "BOOM"],
    ];
    var file = main.getLoadedCSV();
    expect(file).toEqual(onfile);
});
test("change mode", function () {
    var commandBox = document.getElementsByClassName("repl-command-box")[0];
    if (commandBox instanceof HTMLInputElement) {
        commandBox.value = "mode";
    }
    main.handleCommand();
    var mod = main.getMode();
    if (mod != undefined) {
        expect(mod).toEqual("VERBOSE");
    }
});
test("view", function () {
    var commandBox = document.getElementsByClassName("repl-command-box")[0];
    if (commandBox instanceof HTMLInputElement) {
        commandBox.value = "load_file mockedData/csv3";
    }
    main.handleCommand();
    if (commandBox instanceof HTMLInputElement) {
        commandBox.value = "view";
    }
    main.handleCommand();
    var expectedValues = ["", "Aaron", "Barbara", "Clara", "Dylan"];
    expectedValues.forEach(function (value) {
        var expectedValue = screen.getByText(value);
        expect(expectedValue).toBeDefined();
    });
});
test("search", function () {
    var commandBox = document.getElementsByClassName("repl-command-box")[0];
    if (commandBox instanceof HTMLInputElement) {
        commandBox.value = "load_file mockedData/csv1";
    }
    main.handleCommand();
    if (commandBox instanceof HTMLInputElement) {
        commandBox.value = "search 0 3579";
    }
    main.handleCommand();
    expect(document.getElementsByClassName("repl-history")[0]).toContain([
        "3759",
        "96 G. Psc",
        "7.26388",
        "1.55643",
        "0.68697",
    ]);
});
// export {};
test("emptyres", function () {
    var s = new sd.SearchData();
    expect(s.searchResult([[]], "0", "3759")).toEqual([
        ["3759", "96 G. Psc", "7.26388", "1.55643", "0.68697"],
    ]);
    expect(s.searchResult([[]], "StarID", "3759")).toEqual([
        ["3759", "96 G. Psc", "7.26388", "1.55643", "0.68697"],
    ]);
    expect(s.searchResult([[]], "2", "3759")).toEqual([
        ["3759", "96 G. Psc", "7.26388", "1.55643", "0.68697"],
    ]);
});
