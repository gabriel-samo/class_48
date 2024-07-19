export class LoggedUser {
  public userName: string;
  public userEmail: string;
  public userRole: string;
  public userToken: string;

  constructor(
    userName: string,
    userEmail: string,
    userRole: string,
    userToken: string
  ) {
    this.userToken = userToken;
    this.userEmail = userEmail;
    this.userName = userName;
    this.userRole = userRole;
  }
}
