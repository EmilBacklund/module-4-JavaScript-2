import '../style.css';
import { LOGIN_USER_URL_ENDPOINT } from './settings/api.js';

const logInForm = document.querySelector('#login-form');

const email = document.querySelector('#email');
const emailError = document.querySelector('#emailError');
const emailErrorNotValid = document.querySelector('#emailErrorNotValid');

const password = document.querySelector('#password');
const passwordError = document.querySelector('#passwordError');

const generalErrorMessage = document.querySelector('#general-error-message');

logInForm.addEventListener('submit', function (event) {
  event.preventDefault();

  let isEmail = false;
  if (email.value.trim().length > 0) {
    emailError.classList.add('hidden');
    isEmail = true;
  } else {
    emailError.classList.remove('hidden');
  }

  let isValidEmail = false;
  if (email.value.trim().length && validateEmail(email.value) === true) {
    emailErrorNotValid.classList.add('hidden');
    isValidEmail = true;
  } else if (email.value.trim().length && validateEmail(email.value) !== true) {
    emailErrorNotValid.classList.remove('hidden');
  }

  let isPassword = false;

  if (password.value.trim().length >= 8) {
    passwordError.classList.add('hidden');
    isPassword = true;
  } else {
    passwordError.classList.remove('hidden');
  }

  let isFormValid = isEmail && isValidEmail && isPassword;

  if (isFormValid) {
    console.log('Validation SUCCEEDED!!  🥳');
    const userData = {
      email: email.value,
      password: password.value,
    };
    console.log(LOGIN_USER_URL_ENDPOINT);
  } else {
    console.log('Validation FAILED!! 💩');
  }
});

function validateEmail(email) {
  const regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(stud.noroff.no|noroff.no)$/;
  return email.match(regEx) ? true : false;
}
