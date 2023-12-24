import isEmail from "validator/lib/isEmail";
import { passwordRegex } from "./constants/regex";

export const inputValidator = (type, value) => {
  if (type === "email") {
    return isEmail(value);
  } else if (type === "password") {
    return passwordRegex.test(value)
  }
}

