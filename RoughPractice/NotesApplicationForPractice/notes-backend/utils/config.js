import "dotenv/config";
const PORT = process.env.PORT;
const MONGODB_URI =
  process.env.NODE_ENV === "PRODUCTION"
    ? process.env.MONGODB_URI
    : process.env.MONGODB_TEST_URI;

// module.exports = { MONGODB_URI, PORT }
export const config = { MONGODB_URI, PORT };
