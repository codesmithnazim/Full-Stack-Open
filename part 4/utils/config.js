import 'dotenv/config'

const PORT= process.env.PORT
const MONGODB_URI= process.env.NODE_ENV !=='PRODUCTION'? process.env.MONGODB_TEST_URI: process.env.MONGODB_URI
const jwt_secret= process.env.JWT_SECRET

export default {PORT, MONGODB_URI, jwt_secret}