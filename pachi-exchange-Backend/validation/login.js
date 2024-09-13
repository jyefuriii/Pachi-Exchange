import Validator from "validator";
import isEmpty from "is-empty";

function validateLoginInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.emailAddress = !isEmpty(data.emailAddress) ? data.emailAddress : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  // Email checks
  if (Validator.isEmpty(data.emailAddress)) {
    errors.emailAddress = "Email field is required";
  } else if (!Validator.isEmail(data.emailAddress)) {
    errors.emailAddress = "Email is invalid";
  }
  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
}

export default validateLoginInput;
