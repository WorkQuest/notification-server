import { config } from 'dotenv';

config();
export default {
  baseUrl: process.env.BASE_URL,
  auth: {
    jwt: {
      mainAccessSecretKey: process.env.MAIN_JWT_ACCESS_SECRET_KEY,
      adminAccessSecretKey: process.env.ADMIN_JWT_ACCESS_SECRET_KEY,
    },
  },
  rabbit: {
    url: process.env.RABBIT_URL,
  },
  server: {
    host: process.env.SERVER_HOST ? process.env.SERVER_HOST : 'localhost',
    port: process.env.SERVER_PORT ? process.env.SERVER_PORT : 3000,
  },
  database: {
    link: process.env.DB_LINK,
  },
  push: {
    apiFile: process.env.PUSH_API_FILE,
    database: process.env.PUSH_DATABASE,
  },
  cors: {
    origins: process.env.CORS_ORIGINS ? JSON.parse(process.env.CORS_ORIGINS) : ['*'],
    methods: process.env.CORS_METHODS
      ? JSON.parse(process.env.CORS_METHODS)
      : ['POST, GET, OPTIONS'],
    headers: process.env.CORS_HEADERS
      ? JSON.parse(process.env.CORS_HEADERS)
      : ['Accept', 'Content-Type', 'Authorization'],
    maxAge: process.env.CORS_MAX_AGE ? Number(process.env.CORS_MAX_AGE) : 600,
    allowCredentials: process.env.CORS_ALLOW_CREDENTIALS
      ? process.env.CORS_ALLOW_CREDENTIALS
      : 'true',
    exposeHeaders: process.env.CORS_EXPOSE_HEADERS
      ? JSON.parse(process.env.CORS_EXPOSE_HEADERS)
      : ['content-type', 'content-length'],
  },
};
