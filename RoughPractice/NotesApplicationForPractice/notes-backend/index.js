// const app = require('./app')
// const config = require('./utils/config')
// const logger = require('./utils/logger')


import {app} from "./app.js"
import { config } from "./utils/config.js"
import  logger  from "./utils/logger.js"

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
