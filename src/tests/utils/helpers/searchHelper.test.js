const searchHelper = require("../../../utils/helpers/searchHelper");

test("it initialises search with items in the searchBar", () => {
  // First create items you can assert
  const items = ["apple", "strawberry"];
  // make a const to get the searchHelper function and call it
  const searchBar = searchHelper.data();
  // Initialize the search with items
  searchBar.initializeSearch(items);
  // Assert that the searchBar.fuse is an instance of Fuse
  expect(searchBar.fuse.list).toEqual(items);
});
