export class UserCred {
  public userName: string;
  public userEmail: string;
  public userRole: string;
  public userPass?: string;
  public phoneNumber?: string;

  constructor(
    userName: string,
    userRole: string,
    userEmail: string,
    phoneNumber?: string,
    userPass?: string
  ) {
    this.userName = userName;
    this.userRole = userRole;
    this.userEmail = userEmail;
    this.phoneNumber = phoneNumber;
    this.userPass = userPass;
  }
}
