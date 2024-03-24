export const isValidForm = (inputs) => {
  const errors = {};

  if (!inputs.name) {
    errors.name = "Name is required";
  }

  if (!inputs.surname) {
    errors.surname = "Surname is required";
  }

  if (!inputs.email) {
    errors.email = "Email is required";
  } else if (!isValidEmail(inputs.email)) {
    errors.email = "Invalid email format";
  }

  if (!inputs.password) {
    errors.password = "Password is required";
  } else if (inputs.password.length < 6) {
    errors.password = "Password must be at least 6 characters long";
  }

  if (!inputs.confirmPassword) {
    errors.confirmPassword = "Confirm password is required";
  } else if (inputs.confirmPassword !== inputs.password) {
    errors.confirmPassword = "Passwords do not match";
  }

  if (!inputs.postalCode) {
    errors.postalCode = "Postal code is required";
  } else if (inputs.postalCode.length !== 5) {
    errors.postalCode = "Postal code must be 5 characters long";
  }

  if (!inputs.phone) {
    errors.phone = "Phone is required";
  } else if (inputs.phone.length !== 10) {
    errors.phone = "Phone must be 10 characters long";
  } else if (!isValidPhone(inputs.phone)) {
    errors.phone = "Invalid phone number";
  }

  return errors;
}

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export const isValidPhone = (phone) => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
}

export default isValidForm;
