import { isNull, isUndefined, isString, isArray } from "lodash";

const EMAIL_REGEX =
  /^(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\dA-Za-z-]+\.)+[A-Za-z]{2,}))$/;

const PASSWORD_REGEX = /\d/;

const EMPTY_STRING_REGEXP = /^\s*$/;

export function validPassword(password) {
  return password.length >= 4 ? PASSWORD_REGEX.test(password) : false;
}

export function validEmail(email) {
  return EMAIL_REGEX.test(String(email).toLowerCase());
}

function isWhiteSpaceOnly(value) {
  return EMPTY_STRING_REGEXP.test(value);
}

export function isPresent(value) {
  if (isNull(value) || isUndefined(value)) {
    return false;
  }

  if (isString(value)) {
    return !isWhiteSpaceOnly(value);
  }

  if (isArray(value)) {
    return value.length > 0;
  }

  return true;
}
