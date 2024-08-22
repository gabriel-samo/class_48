import { AccountOperationsModel } from "../models/AccountOperationsModel";
import { Request, Response } from "express";
import moment from "moment";

export const getAccountActions = async (req: Request, res: Response) => {
  try {
    const { accountNumber } = req.params;
    const actions = await AccountOperationsModel.find({ accountNumber });
    // console.log(actions);
    res.status(200).json(actions);
  } catch (err: any) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const addAccountAction = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const { type, accountNumber } = req.body;
    if (!accountNumber) {
      return res.status(400).json({ message: "Account number is required" });
    }
    if (!type || !["deposit", "withdraw", "loan"].includes(type)) {
      return res.status(400).json({
        message: "Type is required and must be deposit, withdraw or loan"
      });
    }
    switch (type) {
      case "deposit":
        const { deposit } = req.body;
        if (!deposit || !deposit.amount) {
          return res
            .status(400)
            .json({ message: "Deposit amount is required" });
        }
        const newDeposit = new AccountOperationsModel({
          accountNumber,
          type: "deposit",
          deposit: {
            date: moment().format("YYYY-MM-DD HH:mm:ss"),
            amount: deposit.amount
          }
        });
        await newDeposit.save();
        return res.status(200).json(newDeposit);

      case "withdraw":
        const { withdraw } = req.body;
        if (!withdraw || !withdraw.amount) {
          return res
            .status(400)
            .json({ message: "Withdraw amount is required" });
        }
        const newWithdraw = new AccountOperationsModel({
          accountNumber,
          type: "withdraw",
          withdraw: {
            date: moment().format("YYYY-MM-DD HH:mm:ss"),
            amount: withdraw.amount
          }
        });
        await newWithdraw.save();
        return res.status(200).json(newWithdraw);

      case "loan":
        const { loan } = req.body;
        if (!loan || !loan.amount || !loan.interest || !loan.numberOfPayments) {
          return res.status(400).json({ message: "Loan fields are required" });
        }
        const newLoan = new AccountOperationsModel({
          accountNumber,
          type: "loan",
          loan: {
            date: moment().format("YYYY-MM-DD HH:mm:ss"),
            amount: loan.amount,
            interest: loan.interest,
            numberOfPayments: loan.numberOfPayments
          }
        });
        await newLoan.save();
        return res.status(200).json(newLoan);

      default:
        return res.status(400).json({
          message: "Type is required and must be deposit, withdraw or loan"
        });
    }
  } catch (err: any) {
    console.log(err);
    res.status(500).json(err);
  }
};
