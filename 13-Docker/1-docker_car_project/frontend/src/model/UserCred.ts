export class UserCred {
  public userName: string;
  public userEmail: string;
  public userRole: string;
  public userToken: string;

  constructor(
    userName: string,
    userToken: string,
    userEmail: string,
    userRole: string
  ) {
    this.userName = userName;
    this.userToken = userToken;
    this.userEmail = userEmail;
    this.userRole = userRole;
  }
}
