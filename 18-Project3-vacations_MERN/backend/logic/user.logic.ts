import bcrypt from "bcryptjs";
import { Query } from "../DAL/dal_mysql";
import { createToken } from "../utils/createToken";
import { NextFunction, Request, Response } from "express";

// Function to check if an email is already taken
export const emailTaken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Destructure request body
    const { email } = req.body;
    // Query database for existing user
    const foundUser = await Query("SELECT * FROM users WHERE email = ?", [
      email
    ]);
    // Check if user exists
    if (foundUser.length > 0) {
      // Return true if user exists
      return res.status(200).json(true);
    } else {
      // Return false if user does not exist
      return res.status(200).json(false);
    }
  } catch (error: any) {
    // Log error and return 500 status with error message
    console.log(error);
    return res.status(500).json(error.message);
  }
};

// Function to register a new user
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Destructure request body
    const { password, email, firstName, lastName } = req.body;
    // Check for missing fields
    if (!password || !email || !firstName || !lastName) {
      // Return error if any field is missing
      return res.status(400).json("Missing required fields");
    }
    // Validate email format
    if (!email.includes("@") || !email.includes(".")) {
      // Return error if email is invalid
      return res.status(400).json("Invalid email");
    }
    // Check password length
    if (password.length < 4) {
      // Return error if password is too short
      return res.status(400).json("Password must be at least 4 characters");
    }
    // Query database for existing user
    const foundUser = await Query("SELECT * FROM users WHERE email = ?", [
      email
    ]);
    // Check if user already exists
    if (foundUser.length > 0) {
      // Return error if user exists
      return res.status(400).json("User already exists");
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Prepare user data for insertion
    const values = {
      email,
      password: hashedPassword,
      first_name: firstName,
      last_name: lastName
    };
    // Insert new user into database
    const user = await Query("INSERT INTO users SET ?", values);
    // Check if insertion was successful
    if (user.affectedRows > 0) {
      // Create token for the new user
      const token = createToken(user.insertId, false);
      // Retrieve the newly created user
      const newUser = await Query("SELECT * FROM users WHERE user_id = ?", [
        user.insertId
      ]);
      // Exclude password from response
      const { password, ...restCreds } = newUser[0];
      // Return success response with token in header and user details in body
      return res.status(200).header("Authorization", token).json({
        id: restCreds.user_id,
        email: restCreds.email,
        firstName: restCreds.first_name,
        lastName: restCreds.last_name
      });
    }
  } catch (error: any) {
    // Log error and return 500 status with error message
    console.log(error);
    return res.status(500).json(error.message);
  }
};

// Function to log in an existing user
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Destructure request body
    const { password, email } = req.body;
    // Check for missing fields
    if (!password || !email) {
      // Return error if any field is missing
      return res.status(400).json("Missing required fields");
    }
    // Validate email format
    if (!email.includes("@") || !email.includes(".")) {
      // Return error if email is invalid
      return res.status(400).json("Invalid email");
    }
    // Check password length
    if (password.length < 4) {
      // Return error if password is too short
      return res.status(400).json("Password must be at least 4 characters");
    }
    // Query database for existing user
    const foundUser = await Query("SELECT * FROM users WHERE email = ?", [
      email
    ]);
    // Check if user exists
    if (foundUser.length === 0) {
      // Return error if user does not exist
      return res.status(400).json("User not found");
    }
    // Compare provided password with stored hash
    const passwordMatch = await bcrypt.compare(password, foundUser[0].password);
    // Check if passwords match
    if (!passwordMatch) {
      // Return error if passwords do not match
      return res.status(400).json("Invalid credentials");
    } else {
      // Create token for the user
      const token = createToken(
        foundUser[0].user_id,
        foundUser[0].isAdmin === 1
      );
      // Exclude password from response
      const { password, ...restCreds } = foundUser[0];
      // Return success response with token
      return res.status(200).header("Authorization", token).json({
        id: restCreds.user_id,
        email: restCreds.email,
        firstName: restCreds.first_name,
        lastName: restCreds.last_name
      });
    }
  } catch (error: any) {
    // Log error and return 500 status with error message
    console.log(error);
    return res.status(500).json(error.message);
  }
};
