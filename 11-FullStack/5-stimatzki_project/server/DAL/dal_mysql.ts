//DAL -> Data Abstract Layer
//mysql -> npm install mysql2

//create connection to mysql
import mysql from "mysql2";
import config from "../utils/config";

const connection = mysql.createPool({
  host: config.mySQLhost,
  user: config.mySQLuser,
  password: config.mySQLpassword,
  database: config.mySQLdb
});

console.log("connected to mysql database");

export const execute = (sql: string, values?: any): Promise<any> => {
  return new Promise<any>((resolve, reject) => {
    connection.query(sql, values, (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};
