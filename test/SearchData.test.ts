import * as sd from "mockData/SearchData.js";

test("emptyres", () => {
  let s = new sd.SearchData();
  expect(s.search_result([[]], "0", "3759")).toBe([
    ["3759", "96 G. Psc", "7.26388", "1.55643", "0.68697"],
  ]);
  expect(s.search_result([[]], "StarID", "3759")).toBe([
    ["3759", "96 G. Psc", "7.26388", "1.55643", "0.68697"],
  ]);
  expect(s.search_result([[]], "2", "3759")).toBe([
    ["3759", "96 G. Psc", "7.26388", "1.55643", "0.68697"],
  ]);
});
