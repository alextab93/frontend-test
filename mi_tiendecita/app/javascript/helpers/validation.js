const EMAIL_REGEX =
  /^(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\dA-Za-z-]+\.)+[A-Za-z]{2,}))$/;

const PASSWORD_REGEX = /\d/;

export function validPassword(password) {
  return password.length >= 4 ? PASSWORD_REGEX.test(password) : false;
}

export function validEmail(email) {
  return EMAIL_REGEX.test(String(email).toLowerCase());
}
