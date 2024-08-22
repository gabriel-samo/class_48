import { Injectable } from '@angular/core';
import axios from 'axios';

type AccountActionType = 'deposit' | 'withdraw' | 'loan';
type AccountActionData = {
  accountNumber: string;
  type: AccountActionType;
  deposit?: {
    amount: number;
  };
  withdraw?: {
    amount: number;
  };
  loan?: {
    amount: number;
    interest: number;
    numberOfPayments: number;
  };
};

@Injectable({
  providedIn: 'root',
})
export class ApiRequestService {
  constructor() {}

  getAccountActions(accountNumber: string) {
    return axios.get(
      `http://localhost:8000/api/account/actions/${accountNumber}`
    );
  }

  addAccountAction(data: AccountActionData) {
    return axios.post('http://localhost:8000/api/account/add-action', data);
  }
}
