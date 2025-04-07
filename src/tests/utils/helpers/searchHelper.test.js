import { searchHelper } from "../../../utils/helpers/searchHelper";

test("Create items, Search through them by filtering", () => {
  const context = {
    fuse: null,
  };
  const itemArray = [
    { name: "apple" }, 
    { name: "strawberry"}
  ];
  const initialize = searchHelper.methods.initializeSearch.bind(context)
  initialize(itemArray)

  const filtered = searchHelper.methods.getFilteredItems.bind(context);
  const search = filtered("app");  
  console.log("Actual search result:", search);

  expect(search).toEqual([{name: "apple"}]);
});
