import {InputErrorType, ValidationResult, ValidationRule} from '@types';

import moment from 'moment';

export const emailValidation: ValidationRule = (
  value: string,
  error = InputErrorType.VALID_EMAIL_ID,
): ValidationResult => {
  const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (reg.test(value) === false) {
    return {success: false, error};
  } else {
    return {success: true};
  }
};

export const valueRequired: ValidationRule = (
  value: string,
  error = InputErrorType.MISSING_VALUE,
): ValidationResult => {
  if (value) return {success: true};
  return {success: false, error};
};

export const onlyDigits: ValidationRule = (
  value: string,
  error = InputErrorType.NO_SPECIAL_CHARACTERS_ALLOWED,
): ValidationResult => {
  const reg = /^\d+$/;
  const newValue = value.replace('$', '');
  if (reg.test(newValue)) {
    return {success: true};
  }
  return {success: false, error};
};

export const exceedingDateValue: ValidationRule = (
  value: string,
  error = InputErrorType.VALID_DATE,
): ValidationResult => {
  const selectedDate = moment(value);
  const currentDate = moment();
  const diff = currentDate.diff(selectedDate);
  if (diff >= 0) {
    return {success: true};
  }
  return {success: false, error};
};

export const zipCodeValidation: ValidationRule = (
  value: string,
  error = InputErrorType.VALID_ZIPCODE,
): ValidationResult => {
  const reg = /(^\d{5}$)|(^\d{5}-\d{4}$)/;

  if (reg.test(value)) {
    return {success: true};
  }
  return {success: false, error};
};

export const ssnValidation: ValidationRule = (
  value: string,
  error = InputErrorType.VALID_SOCIAL_SECURITY_NUMBER,
): ValidationResult => {
  const reg = /(^(?!(000|666|9))\d{3}-(?!00)\d{2}-(?!0000)\d{4}$)/;

  if (reg.test(value)) {
    return {success: true};
  }
  return {success: false, error};
};

export const minLengthRequired: ValidationRule = (
  value: string,
  error = InputErrorType.PASSWORD_GREATER_THAN_EIGHT,
): ValidationResult => {
  if (value.length < 8 || value.length > 20) {
    return {success: false, error};
  } else {
    return {success: true};
  }
};

export const specialCharsRequired: ValidationRule = (
  value: string,
  error = InputErrorType.ONE_SPECIAL_CHARACTER_REQUIRED,
): ValidationResult => {
  const reg = /[!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/;
  if (reg.test(value) === false) {
    return {success: false, error};
  } else {
    return {success: true};
  }
};

export const upperCaseLetterRequired: ValidationRule = (
  value: string,
  error = InputErrorType.ONE_CAPITAL_LETTER_REQUIRED,
): ValidationResult => {
  const reg = /[A-Z]/;
  if (reg.test(value) === false) {
    return {success: false, error};
  } else {
    return {success: true};
  }
};

export const lowerCaseLetterRequired: ValidationRule = (
  value: string,
  error = InputErrorType.ONE_SMALL_LETTER_REQUIRED,
): ValidationResult => {
  const reg = /[a-z]/;
  if (reg.test(value) === false) {
    return {success: false, error};
  } else {
    return {success: true};
  }
};

export const notEmpty: ValidationRule = (
  value: string,
  error = InputErrorType.MISSING_VALUE,
): ValidationResult => {
  if (value.length < 3 || value.length > 20) {
    return {success: false, error};
  } else {
    return {success: true};
  }
};

export const sixDigitInput: ValidationRule = (
  value: string,
  error = InputErrorType.MISSING_VALUE,
): ValidationResult => {
  if (value.length < 6) {
    return {success: false, error};
  } else {
    return {success: true};
  }
};
