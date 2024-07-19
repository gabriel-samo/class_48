import { UserCred } from "../Models/UserCred";
const fs = require("fs");

const registerUser = (user: UserCred) => {
  let userInfo: UserCred[];
  try {
    userInfo = JSON.parse(fs.readFileSync("Data/users.json"));
  } catch (err) {
    userInfo = [];
  }
  //check if user exists before saving the user.
  const foundUser = userInfo.find(
    (item: UserCred) => item.userName == user.userName
  );
  console.log(foundUser);
  if (foundUser) {
    return false;
  }
  userInfo.push(user);
  fs.writeFileSync("Data/users.json", JSON.stringify(userInfo));
  return true;
};

const loginUser = (user: UserCred) => {
  let userInfo: UserCred[];
  try {
    userInfo = JSON.parse(fs.readFileSync("Data/users.json"));
  } catch (err) {
    userInfo = [];
  }
  const foundUser = userInfo.find(
    (item: UserCred) => item.userName == user.userName
  );
  //check the user and password send the password
  if (foundUser) {
    return foundUser.userPass === user.userPass;
  }
  //return true / false
  return false;
};

const forgotPassword = (userName: string) => {
  let userInfo: UserCred[];
  try {
    userInfo = JSON.parse(fs.readFileSync("Data/users.json"));
  } catch (err) {
    userInfo = [];
  }
  const foundUser = userInfo.find(
    (item: UserCred) => item.userName == userName
  );
  //find the user...
  if (foundUser) {
    return foundUser.userPass;
  }
  //send back the password....
  return false;
};

export { registerUser, loginUser, forgotPassword };
