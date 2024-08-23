import mysql from "mysql2";
import { config } from "./../config/index";

// Create a connection to the database
const connection = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database
});

// Generic function to execute a query and return a promise
export const Query = (query: string, values?: any): Promise<any> => {
  return new Promise<any>((resolve, reject) => {
    connection.query(query, values, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};
