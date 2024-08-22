import { Document, Schema, model } from "mongoose";

export interface IAccountOperations extends Document {
  accountNumber: number;
  type: "deposit" | "withdraw" | "loan";
  deposit: { date: Date; amount: number };
  withdraw: { date: Date; amount: number };
  loan: {
    date: Date;
    amount: number;
    interest: number;
    numberOfPayments: number;
  };
}

export const AccountOperationsSchema = new Schema<IAccountOperations>(
  {
    accountNumber: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      required: true,
      trim: true,
      enum: ["deposit", "withdraw", "loan"]
    },
    deposit: {
      type: {
        date: Date,
        amount: Number
      },
      _id: false
    },
    withdraw: {
      type: {
        date: Date,
        amount: Number
      },
      _id: false
    },
    loan: {
      type: {
        date: Date,
        amount: Number,
        interest: Number,
        numberOfPayments: Number
      },
      _id: false
    }
  },
  {
    versionKey: false
  }
);

export const AccountOperationsModel = model<IAccountOperations>(
  "Account-Operations",
  AccountOperationsSchema
);
