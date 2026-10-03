import logger from "../utils/logger.js";

const errorHandler = (error, req, res, next) => {
  logger.error("error name ", error?.name, "error message ", error?.message);
  if (error.name === "CastError")
    return res.status(400).json({ error: "malformated _id" });
  else if (error.name === "ValidationError")
    return res.status(400).json({ error: error.message });
  else if (error.name === "MongoServerError" && error.code === 11000)
    return res.status(400).json({ error: "Entries must be unique" });
  else if (error.name === "MongooseError")
    return res.status(400).json({error: error.message})
  else if (error.name === "JsonWebTokenError")
    return res.status(401).json({ error: "Invalid token, Not authorized" });
  else if (error.name === "TokenExpiredError")
    return res.status(401).json({ error: error.message });
  next(error)
};

export default errorHandler;