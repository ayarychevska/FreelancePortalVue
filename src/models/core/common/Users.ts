import { DateTime } from "luxon";

export interface UserCreateModel {
  name: string;
  login: string;
  email: string;
  userType: string;
  dateOfBirth: DateTime;
  gender: string;
  description: string;
  password: string;
  repeatPassword: string;
  role: number;
}

export interface UserLoginModel {
  login: string;
  password: string;
}
