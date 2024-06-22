import mysql from "mysql2";
import config from "../config";

const db = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database
});

export const Execute = (query: string, values?: any): Promise<any> => {
  return new Promise<any>((resolve, reject) => {
    db.query(query, values, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};
