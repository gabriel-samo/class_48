export class ClientError {
  public status: number;
  public message: string;

  public constructor(status: number, message: string) {
    this.status = status;
    this.message = message;
  }
}

//routeNotFound, UserNotLogged, videoNotFound
export class RouteNotFound extends ClientError {
  constructor(route: string) {
    super(404, `route ${route} was not found`);
  }
}
