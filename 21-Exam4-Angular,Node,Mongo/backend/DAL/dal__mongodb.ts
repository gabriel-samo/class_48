//npm install mongoose

import mongoose from "mongoose";
import { config } from "../config/index";

//create connection to mongodb
const connect = async (): Promise<void> => {
  try {
    const db = await mongoose.connect(config.db.url);
    console.log("connected to mongoDB, AccountOperations");
  } catch (err: any) {
    console.log("Error in connection to mongoDB:\n", err);
  }
};

//calling the execute from server.ts

export default {
  connect
};
