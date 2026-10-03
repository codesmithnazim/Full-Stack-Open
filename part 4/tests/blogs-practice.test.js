import { test, describe } from "node:test";
import assert from "node:assert";
import test_Helper from "./testsHelper.js";

test("dummy returns one", () => {
  assert.strictEqual(
    test_Helper.dummy([]),
    1,
    "the array length is not equal to 1",
  );
});

describe("Total likes Test", () => {
  test("totalLikes counter", () => {
    assert.strictEqual(test_Helper.totalLikes(test_Helper.blogs), 42);
  });
});

describe("Favorite blog", () => {
  test("Test the max likes blog", () => {
    assert.strictEqual(
      test_Helper.favoriteBlog(test_Helper.blogs),
      12,
      "The favoriteBlog have different likes than our expectation",
    );
  });
});

describe("author with max blogs", () => {
  test("should be Martin", () => {
    assert.strictEqual(
      JSON.stringify(test_Helper.mostBlogs(test_Helper.blogs)),
      JSON.stringify({ author: "Robert C. Martin", blogs: 3 }),
      "Robert C. Martin is not the one that wrote most blogs",
    );
  });
});

describe("Favourite blogger", () => {
  test("should be Martin", () => {
    assert.strictEqual(
      JSON.stringify(test_Helper.favoriteBlogger(test_Helper.blogs)),
      JSON.stringify({ author: "Edsger W. Dijkstra", likes: 23 }),
      "Favrite blogger is not Robert C. Martin",
    );
  });
});
