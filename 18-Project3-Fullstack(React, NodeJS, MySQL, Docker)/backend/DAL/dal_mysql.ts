import { config } from "./../config/index";
import mysql from "mysql2";

const connection = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database
});

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
