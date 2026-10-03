import config from "./utils/config.js";
import { app } from "./app.js";
import logger from "./utils/logger.js";
logger.info(process.env.NODE_ENV)



app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});