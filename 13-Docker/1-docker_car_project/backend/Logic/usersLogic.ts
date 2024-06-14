import { UserCred } from "../Models/UserCred";
import fs from "fs";
import bcrypt from "bcrypt";
import { createJWT } from "../Utils/jwt";

const getAllUsers = () => {
  let users: UserCred[];
  try {
    users = JSON.parse(
      fs.readFileSync("Data/users.json", { encoding: "utf-8" })
    );
  } catch (error) {
    users = [];
  }
  return users;
};

const registerUser = async (user: UserCred) => {
  const allUsers = getAllUsers();
  const foundUser = allUsers.find(
    (item: UserCred) => item.userName === user.userName
  );
  if (foundUser) {
    return false;
  } else {
    const hashedPass = await bcrypt.hash(user.userPass!, 10);
    user.userPass = hashedPass;
    const newAllUsers = [...allUsers, user];
    fs.writeFileSync("Data/users.json", JSON.stringify(newAllUsers));
    return true;
  }
};

const loginUser = async (userName: string, userPass: string) => {
  const allUsers = getAllUsers();
  const foundUser = allUsers.find(
    (item: UserCred) => item.userName === userName
  );
  if (!foundUser) return {};
  const checkedPass = await bcrypt.compare(userPass, foundUser.userPass!);
  if (checkedPass) {
    return {
      jwt: createJWT(foundUser),
      userName: foundUser.userName,
      userEmail: foundUser.userEmail,
      userRole: foundUser.userRole,
    };
  } else {
    return {};
  }
};

const forgotPassword = async (userName: string, newPassword: string) => {
  const allUsers = getAllUsers();
  const foundUser = allUsers.find(
    (item: UserCred) => item.userName === userName
  );
  if (!foundUser) return false;
  const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  foundUser.userPass = hashedNewPassword;
  fs.writeFileSync("Data/users.json", JSON.stringify(allUsers));
  return true;
};

const updateUser = async (
  userName: string,
  newPassword?: string,
  newEmail?: string,
  newUserName?: string
) => {
  const allUsers = getAllUsers();
  const foundUser = allUsers.find(
    (item: UserCred) => item.userName === userName
  );
  if (!foundUser) return { error: "User doesn't exists" };
  if (newPassword) {
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    foundUser.userPass = hashedNewPassword;
  }
  if (newEmail) {
    foundUser.userEmail = newEmail;
  }
  if (newUserName) {
    const newUserNameExists = allUsers.find(
      (item) => item.userName === newUserName
    );
    if (newUserNameExists && newUserName !== foundUser.userName) {
      return { error: "Username already exists" };
    } else {
      foundUser.userName = newUserName;
    }
  }
  fs.writeFileSync("Data/users.json", JSON.stringify(allUsers));
  return { success: "User was updated" };
};

export { registerUser, loginUser, forgotPassword, updateUser };
