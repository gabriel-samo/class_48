import { UserCred } from "./../Models/UserCred";
import { userCred } from "../Routes/login";
import { createJWT } from "../Utils/jwt";
import { OkPacket } from "mysql2";
const fs = require("fs");
import dal_mysql from "../DAL/dal_mysql";

const registerUser = async (user: UserCred) => {
  try {
    const sql = `
        INSERT INTO users
        Values (0, '${user.userName}', '${user.userPass}','${user.userRole}','${user.userEmail}')
    `;
    const result: OkPacket = await dal_mysql.execute(sql);
    // console.log(`Created user with id:${result.insertId}`);
    user.id = +result.insertId;
    return result;
  } catch (err) {
    return err;
  }
};

const loginUser = (user: UserCred) => {
  let userInfo;
  try {
    userInfo = JSON.parse(fs.readFileSync("users.data"));
  } catch (err) {
    userInfo = [];
  }
  //check the user and password send the password
  //return true / false
  let singleUser = userInfo.find(
    (item: { userName: string }) => item.userName === user.userName
  );

  //sending true/false if user data is o.k.
  //return singleUser.userName===user.userName && singleUser.userPass===user.userPass;

  //sending jwt if user data is o.k.
  try {
    if (
      singleUser.userName === user.userName &&
      singleUser.userPass === user.userPass
    ) {
      const userInfo = {
        name: singleUser.userName,
        email: singleUser.userEmail,
        role: singleUser.userRole,
        jwt: createJWT(singleUser),
      };
      return userInfo;
    } else {
      return {
        name: "",
        email: "",
        role: "GUEST",
        jwt: "",
      };
    }
  } catch (err) {
    console.log("no user found");
  }
};

const forgotPassword = (userName: string) => {
  let userInfo;
  try {
    userInfo = JSON.parse(fs.readFileSync("users.data"));
  } catch (err) {
    userInfo = [];
  }
  //find the user...
  let singleUser = userInfo.find(
    (item: { userName: string }) => item.userName === userName
  );
  if (singleUser === undefined) {
    return "";
  }
  return singleUser.userPass;
  //send back the password....
};

export { registerUser, loginUser, forgotPassword };
