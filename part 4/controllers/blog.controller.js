import express from "express";
import Blog from "../models/blog.model.js";
import jwt from "jsonwebtoken";
import config from "../utils/config.js";
import { User } from "../models/user.model.js";
const blogRouter = express.Router();

blogRouter.get("/", async (request, response, next) => {
  try {
    const ObtBlogs = await Blog.find().populate("user");
    response.status(200).json(ObtBlogs);
  } catch (error) {
    next(error);
  }
});

blogRouter.post("/", async (request, response, next) => {
  try {
    let token = request.get("authorization");
    if (token && token.startsWith("Bearer")) {
      const { body } = request;
      token = token.replace("Bearer ", "");
      const tokenInfo = jwt.verify(token, config.jwt_secret);
      console.log(tokenInfo);
      body.user = tokenInfo.user;
      const blog = new Blog(body);
      const savedBlog = await blog.save();
      const updatedUser = await User.findByIdAndUpdate(blog.user, {
        $push: { blogs: savedBlog._id },
      });
      return response
        .status(201)
        .json({ postedBlogAndUpdatedUser: savedBlog + " & " + updatedUser });
    }
    return response.status(401).json({ error: "No token , Not authorzed" });
    // return;
  } catch (error) {
    next(error);
  }
});

blogRouter.delete("/:id", async (request, response, next) => {
  const { id } = request.params;
  // const { body } = request;
  try {
    await Blog.findByIdAndDelete(id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

blogRouter.patch("/:id", async (request, response, next) => {
  const { id } = request.params;
  const { body } = request;
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { likes: body.likes },
      { new: true, runvalidators: true, context: "query" },
    );
    response.status(200).json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

export default blogRouter;
