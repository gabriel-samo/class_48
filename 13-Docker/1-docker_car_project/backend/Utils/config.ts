import "dotenv/config";

export const config = {
  app: {
    port: process.env.PORT,
    host: process.env.HOST
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expires: process.env.JWT_EXPIRES
  },
  db: {}
};
