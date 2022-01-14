import { config } from 'dotenv';

config();
export default {
  auth: {
    jwt: {
      accessSecretKey: process.env.JWT_ACCESS_SECRET_KEY,
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
};
