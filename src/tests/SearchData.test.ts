import * as sd from "../../mockData/SearchData.js";

test("emptyres", () => {
  let s = new sd.SearchData();
  expect(s.searchResult([[]], "0", "3759")).toMatchObject([
    ["3759", "96 G. Psc", "7.26388", "1.55643", "0.68697"],
  ]);
  expect(s.searchResult([[]], "StarID", "3759")).toMatchObject([
    ["3759", "96 G. Psc", "7.26388", "1.55643", "0.68697"],
  ]);
  expect(s.searchResult([[]], "2", "3759")).toMatchObject([]);
});
