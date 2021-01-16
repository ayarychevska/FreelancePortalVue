import { DateTime } from "luxon";
import { SubjectsTitles } from "../teacher/Subjects";

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
  subjectsIds: number[];
}

export interface UserLoginModel {
  login: string;
  password: string;
}

export interface ChangePasswordModel {
  id: string;
  previousPassword: string;
  password: string;
  repeatedPassword: string;
}

export interface UserViewModel {
  name: string;
  login: string;
  email: string;
  userType: string;
  dateOfBirth: DateTime;
  gender: string;
  description: string;
  role: number;
  subjects: SubjectsTitles[];
}

export interface UserListViewModel {
  name: string;
  login: string;
  email: string;
  userType: string;
  dateOfBirth: DateTime;
  gender: string;
  description: string;
  role: number;
}