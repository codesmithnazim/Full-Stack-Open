import { test, beforeEach, describe, after } from "node:test";
import Blog from "../models/blog.model.js";
import supertest from "supertest";
import { app } from "../app.js";
import assert from "node:assert";
import mongoose from "mongoose";
import testsHelper from "./testsHelper.js";

const api = supertest(app);

// beforeEach(async () => {
//   await Blog.deleteMany();
//   //    console.log('all the notes we get from the databse ',allBlogs )
//   await Promise.all(testsHelper.blogs.map((blog) => Blog.create(blog)));
// });

describe("Tests done on the blogs list", () => {
  test("testing the total number of blogs posts returned", async () => {
    const presentNotes = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    assert.strictEqual(
      presentNotes.body.length,
      await testsHelper.totalBlogs().length,
    );
  });

  test("id should be the unique identifier", async () => {
    const presentNotes = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    // assert.strictEqual( presentNotes.body.map(blog=>Object.hasOwn(blog, 'id')).find(boolean=> boolean ===false), undefined) it'll check all the ids of all  presentNotes
    assert.strictEqual(Object.hasOwn(presentNotes.body[1], "id"), true);
  });

  test("Default likes should be 0", async () => {
    const BlogPost = {
      title: "React reconcilliationmechanism is a worth knowing phenomenon",
      author: "Mr. Nazim Ud Din",
      url: "https://dev.to/codesmithnazim/reamain-part-of-previous-post-reconciliation-in-reactjs-4n02",
    };
    const newBlogPost = await api
      .post("/api/blogs")
      .send(BlogPost)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    console.log("Te sample blog post = ", newBlogPost.body);
    assert.strictEqual(
      newBlogPost.body.likes === 0,
      true,
      "Default likes of blog post are not equal to 0",
    );
  });

  test("should not allow posting illegal blog post", async () => {
    const BlogPost = {
      author: "Jimmy Neesham",
      title: "I'm a blog post about React Reconciliation",
      likes: 12,
    };

    const newBlogPost = await api
      .post("/api/blogs")
      .send(BlogPost)
      .expect(400)
      .expect("Content-Type", /application\/json/);
    // console.log("new blog post ", newBlogPost.status, newBlogPost.statusCode)
    assert.strictEqual(newBlogPost.statusCode, 400);
  });

  test("prevent blogs posting by unauthorized users", async () => {
    const BlogPost = {
      author: "Jimmy Neesham",
      title: "I'm a blog post about React Reconciliation",
      likes: 12,
    };

    const newBlogPost = await api
      .post("/api/blogs")
      .send(BlogPost)
      .expect(401)
      .expect("Content-Type", /application\/json/);
    // console.log("new blog post ", newBlogPost.status, newBlogPost.statusCode)
    assert.strictEqual(newBlogPost.statusCode, 401);
  });
});

describe("Del, update query related tests", async () => {
  test("Blog deletion test", async () => {
    const storedBlogsAtStart = await testsHelper.totalBlogs();
    await api.delete(`/api/blogs/${storedBlogsAtStart[2].id}`).expect(204);
    const storedBlogsAtEnd = await testsHelper.totalBlogs();
    assert.strictEqual(storedBlogsAtEnd.length, storedBlogsAtStart.length - 1);
    assert.strictEqual(
      storedBlogsAtEnd
        .map((blog) => blog.title)
        .includes(storedBlogsAtStart[2].title),
      false,
    );
  });

  test("Blog likes updation test", async () => {
    const updateNote = await api
      .patch("/api/blogs/5a422aa71b54a676234d17f8")
      .send({ likes: 120 })
      .expect(200)
      .expect("Content-Type", /application\/json/);
    assert.strictEqual(updateNote.body.likes === 120, true);
  });
});

after(async () => {
  mongoose.connection.close();
});
