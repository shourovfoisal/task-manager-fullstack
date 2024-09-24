type UserLoginRequestType = {
  username: string;
  password: string;
};

declare namespace Express {
  export interface Request {
    user: any;
  }
  export interface Response {
    user: any;
  }
}
