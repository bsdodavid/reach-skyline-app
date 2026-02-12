
export interface FormFields {
  userName:Required<string>;
  email:Required<string>;
  phone:string;
  company:string;
  message:string;
  source:string;
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