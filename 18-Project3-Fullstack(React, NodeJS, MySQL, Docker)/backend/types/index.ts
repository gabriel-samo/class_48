declare global {
  namespace Express {
    export interface Request {
      currentUser?: {
        id: number;
        iat: number;
        exp: number;
        isAdmin: boolean;
      };
    }
  }
}

export { Express };
