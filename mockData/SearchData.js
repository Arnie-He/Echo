"use strict";
//exports.__esModule = true;
//exports.SearchData = void 0;
var SearchData = /** @class */ (function () {
  function SearchData() {}
  SearchData.prototype.search_result = function (csv_file, column, value) {
    var EmptyRes = [];
    var res = [["3759", "96 G. Psc", "7.26388", "1.55643", "0.68697"]];
    if (value == "3759" && (column == 0 || column == "StarID")) return res;
    else return EmptyRes;
  };
  return SearchData;
})();
//exports.SearchData = SearchData;
