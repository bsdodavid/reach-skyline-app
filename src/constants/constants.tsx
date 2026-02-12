
export interface FormFields {
  userName:Required<string>;
  email:Required<string>;
  phone:string;
  company:string;
  message:string;
  source:string;
  id?:number;
}

export const USER_FIELD_CONSTANTS:string[] = [
"ID",
"User",
"Email",
"Phone",
"Company",
"Message",
"Source"
]

export const GET_USER_API = "http://localhost:3000/get-user";
export const SAVE_USER_API = "http://localhost:3000/save-user"