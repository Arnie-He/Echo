import { METHODS } from "http";

class SearchData {
  SearchData(csv_file: String[][], column: String, value: String) {
    this.search_result(csv_file, column, value);
  }
  search_result(csv_file: String[][], column: String, value: String) {
    let EmptyRes: string[][] = [];
    let res: string[][] = [
      ["3759", "96 G. Psc", "7.26388", "1.55643", "0.68697"],
    ];
    if (value == "3759" && (column == "0" || column == "StarID")) return res;
    else return EmptyRes;
  }
}

export { SearchData };
