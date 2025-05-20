interface Headers {
  [header: string]: string;
}

interface ApiOptions {
  method?: string;
  headers?: Headers;
  body?: string;
}

interface User {
  id: number;
  email: string;
}

interface LoginParams {
  email: string;
  password: string;
}

interface SignupParams extends LoginParams {
  confirmation: string;
}

type Signup = (signupParams: SignupParams) => Promise<void>;
type Login = (loginParams: LoginParams) => Promise<void>;

export type {
  Headers,
  ApiOptions,
  User,
  Signup,
  Login,
  LoginParams,
  SignupParams,
};
