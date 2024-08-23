import "dotenv/config";

// Configuration object for the application extracted from environment variables
export const config = {
  // Application configuration
  app: {
    port: process.env.PORT,
    host: process.env.HOST
  },
  // Database configuration
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_SCHEMA
  },
  // JWT configuration
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES
  }
};
