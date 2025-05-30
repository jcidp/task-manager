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

interface Task {
  id: number;
  title: string;
  description?: string;
  due_date?: string;
  urgent: boolean;
  important: boolean;
  done: boolean;
}

interface SummaryTasks {
  overdue: Task[];
  today: Task[];
  noDue: Task[];
}

export type {
  Headers,
  ApiOptions,
  User,
  Signup,
  Login,
  LoginParams,
  SignupParams,
  Task,
  SummaryTasks,
};
