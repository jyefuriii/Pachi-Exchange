import Validator from "validator";
import isEmpty from "is-empty";

function validateRegisterInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.fullName = !isEmpty(data.fullName) ? data.fullName : "";
  data.emailAddress = !isEmpty(data.emailAddress) ? data.emailAddress : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  // Name checks
  if (Validator.isEmpty(data.fullName)) {
    errors.fullName = "Name field is required";
  }
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
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
}

export default validateRegisterInput;
