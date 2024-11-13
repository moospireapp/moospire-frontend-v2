export default function useValidator() {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const trimInput = (inputText: string | number) => {
    return typeof inputText === "number"
      ? inputText.toString().trim()
      : inputText.trim();
  };

  const inputContainsNumber = (input: string) => {
    const numbers = "0123456789";
    return input.split("").some((value) => numbers.includes(value));
  };

  const validateRequired = (
    input: string | number,
    message: string = "This input field is required"
  ) => {
    const trimmedInput = trimInput(input);
    return trimmedInput.length ? "" : message;
  };

  const validateEmail = (
    input: string,
    message: string = "Please provide a valid email address"
  ) => {
    const trimmedInput = trimInput(input);
    return emailRegex.test(trimmedInput) ? "" : message;
  };

  const validateNumberEntry = (
    input: string,
    message: string = "Should not contain any number or a special character"
  ) => {
    const trimmedInput = trimInput(input);

    return /^[0-9]+$/.test(trimmedInput) ? "" : message;
  };

  const validatePhone = (
    input: string | number,
    countryCode: string,
    message: string = "Please provide a valid phone number"
  ) => {
    const trimmedInput = trimInput(input);

    if (countryCode.length) {
      if (trimmedInput.startsWith(countryCode || `+${countryCode}`)) {
        // check for phone length
        const phoneLength = trimmedInput.length - countryCode.length;
        return phoneLength >= 9 && phoneLength <= 11 ? "" : message;
      } else {
        return trimmedInput.length >= 9 && trimmedInput.length <= 12
          ? ""
          : message;
      }
    } else return "No country code has been selected";
  };

  const validatePasswordStrength = (input: string) => {
    const trimmedInput = trimInput(input);

    // Check for minimum length
    if (trimmedInput.length < 8) {
      return "Password must be at least 8 characters long";
    }

    // Check for an uppercase letter
    if (!/[A-Z]/.test(trimmedInput)) {
      return "Password must contain at least one uppercase letter";
    }

    // Check for a lowercase letter
    if (!/[a-z]/.test(trimmedInput)) {
      return "Password must contain at least one lowercase letter";
    }

    // Check for a special character (e.g., !, @, #, etc.)
    if (
      !/[-!$%^&*()_+|~=`{}$begin:math:display$$end:math:display$:";'<>?#@,.\/]/.test(
        trimmedInput
      )
    ) {
      return "Password must contain at least one special character";
    }

    // Check for a number
    if (!/\d/.test(trimmedInput)) {
      return "Password must contain at least one number.";
    }

    return "";
  };

  const validateFullName = (input: string) => {
    const trimmedInput = trimInput(input);
    const wordLimit = trimmedInput.split(" ");

    // CHECK FOR FIRST NUMBER ENTRY
    if (trimmedInput.length <= 2) return "Enter a minimum of 2 characters";
    else if (wordLimit.length === 1)
      return "Both first and last names are required";
    else if (wordLimit.length > 2) return "Enter only first and last names";
    else if (inputContainsNumber(trimmedInput))
      return "Fullname should not contain any number";
    else return "";
  };

  const validateSingleName = (
    input: string,
    message: string = "Input field should not contain any number"
  ) => {
    const trimmedInput = trimInput(input);

    if (trimmedInput.length <= 2) return "Enter a minimum of 2 characters";
    else if (inputContainsNumber(trimmedInput)) return message;
    else return "";
  };

  const validateDateRange = (
    input: string,
    range: number,
    message: string = "Input value should be outside of the range"
  ) => {
    const providedDate = new Date(input);
    const today = new Date();

    // Calculate period
    let period = today.getFullYear() - providedDate.getFullYear();
    const monthDiff = today.getMonth() - providedDate.getMonth();

    // Adjust period if the provided month hasn't occurred yet this year
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < providedDate.getDate())
    ) {
      period--;
    }

    // Return true if period is 18 or more, otherwise false
    return period >= range ? "" : message;
  };

  const validateURL = (
    input: string,
    message: string = "Please provide a valid url string"
  ) => {
    const trimmedInput = trimInput(input);

    try {
      new URL(trimmedInput);
      return "";
    } catch {
      return message;
    }
  };

  return {
    validateRequired,
    validateEmail,
    validateNumberEntry,
    validatePhone,
    validatePasswordStrength,
    validateFullName,
    validateSingleName,
    validateDateRange,
    validateURL,
  };
}
