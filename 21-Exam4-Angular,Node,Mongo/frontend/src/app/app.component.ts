import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiRequestService } from './api-request.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgbModule, FormsModule, DatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';
  accountNumber = '';
  accountActions: any[] = [];
  isAddingAction = false;
  type = '';
  amount = 0;
  interest?: number;
  numberOfPayments?: number;

  constructor(private apiRequestService: ApiRequestService) {}

  getAccountActions() {
    if (!this.accountNumber) {
      alert(`Please enter a valid account number. \ne.g. account number > 0`);
      return;
    }
    this.apiRequestService
      .getAccountActions(this.accountNumber)
      .then((res) => {
        this.accountActions = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  startAddAction() {
    this.isAddingAction = !this.isAddingAction;
  }

  handleAddAccountAction() {
    if (!this.accountNumber) {
      alert('Please enter an account number');
      return;
    }
    if (!this.type) {
      alert('Please select an action type');
      return;
    }
    if (!this.amount) {
      alert('Please enter an amount');
      return;
    }
    switch (this.type) {
      case 'deposit':
        this.apiRequestService
          .addAccountAction({
            accountNumber: this.accountNumber,
            type: 'deposit',
            deposit: {
              amount: this.amount,
            },
          })
          .then((res) => {
            this.getAccountActions();
            this.isAddingAction = false;
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      case 'withdraw':
        this.apiRequestService
          .addAccountAction({
            accountNumber: this.accountNumber,
            type: 'withdraw',
            withdraw: {
              amount: this.amount,
            },
          })
          .then((res) => {
            this.getAccountActions();
            this.isAddingAction = false;
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      case 'loan':
        this.apiRequestService
          .addAccountAction({
            accountNumber: this.accountNumber,
            type: 'loan',
            loan: {
              amount: this.amount,
              interest: this.interest!,
              numberOfPayments: this.numberOfPayments!,
            },
          })
          .then((res) => {
            this.getAccountActions();
            this.isAddingAction = false;
          })
          .catch((err) => {
            console.log(err);
          });
        break;
    }
  }
}
