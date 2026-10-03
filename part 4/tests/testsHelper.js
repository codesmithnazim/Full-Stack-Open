import Blog from "../models/blog.model.js";
import logger from '../utils/logger.js'
const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 6,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 17,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];
const dummy = () => {
    return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, a) => sum + a?.likes, 0);
};

const favoriteBlog = (blogs) => {
  return Math.max(...blogs.map((each) => each.likes));
};

const mostBlogs = (array) => {
  const neatArray = array.map((each) => each.author);
  const recordingObj = new Object();
  let maxCount = 0;
  let author = new String();
  for (const item of neatArray) {
    recordingObj[item] = (recordingObj[item] || 0) + 1;
    if (recordingObj[item] >= maxCount) {
      maxCount = recordingObj[item];
      author = item;
    }
  }
  return { author, blogs: maxCount };
};

function favoriteBlogger(blogs) {
  const newArray = blogs.map((each) => {
    return { author: each.author, likes: each.likes };
  });
  let maxLikes = 0;
  const recordingObj = new Object(); // the recordingObj will be like this {Michael Chan: 7, Edsger W. Dijkstra: 18, Robert C. Martin: 12}
  const finalObj = new Object();
  for (const index of newArray) {
    recordingObj[index.author] =
      (recordingObj[index.author] || 0) + index.likes;
    if (recordingObj[index.author] >= maxLikes) {
      maxLikes = recordingObj[index.author];
      finalObj["author"] = index.author;
      finalObj["likes"] = maxLikes;
    }
  }
  logger.info("Recorded Object from favoriteBlogger()", recordingObj);
  return finalObj;
}


const totalBlogs = async () => {
  const blogsArrayLength= await Blog.find({})
  // console.log('blogsArrayLength ', blogsArrayLength)
  console.log("total number of blogs stored = ", blogsArrayLength.length)
  return blogsArrayLength
};

export default {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  favoriteBlogger,
  blogs,
  totalBlogs,
};
