// Function for validating the email
export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

// function for validating password
export const validatePassword = (pass) => {
  if (pass.length !== null && pass.length >= 6) {
    return true;
  }
  return false;
};

// function for validating mobile number
export const validateMobileNumber = (mobileNumber) => {
  // Regular expression for Indian mobile numbers (10 digits, starting with 7, 8, or 9)
  const regex = /^\d{10}$|^(\+91\s)?(0)?[789]\d{9}$/;

  // Test the mobile number against the regular expression
  return regex.test(mobileNumber);
};
