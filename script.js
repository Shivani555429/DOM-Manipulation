const form = document.getElementById('myForm');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const errorMessagesDiv = document.getElementById('errorMessages');
const validationRules = {
  username: {
    required: true,
    minLength: 3,
    maxLength: 15
  },
  email: {
    required: true,
    email: true
  },
  password: {
    required: true,
    minLength: 8,
    maxLength: 20
  },
  confirmPassword: {
    required: true,
    equalTo: passwordInput
  }
};
const errorMessages = {
  username: {
    required: 'Username is required',
    minLength: 'Username must be at least 3 characters long',
    maxLength: 'Username must be no more than 15 characters long'
  },
  email: {
    required: 'Email is required',
    email: 'Invalid email address'
  },
  password: {
    required: 'Password is required',
    minLength: 'Password must be at least 8 characters long',
    maxLength: 'Password must be no more than 20 characters long'
  },
  confirmPassword: {
    required: 'Confirm Password is required',
    equalTo: 'Passwords do not match'
  }
};
function validateFormField(field, value) {
  const rules = validationRules[field];
  const errors = [];

  for (const rule in rules) {
    if (rules[rule]) {
      switch (rule) {
        case 'required':
          if (!value.trim()) {
            errors.push(errorMessages[field][rule]);
          }
          break;
        case 'minLength':
          if (value.length < rules[rule]) {
            errors.push(errorMessages[field][rule]);
          }
          break;
        case 'maxLength':
          if (value.length > rules[rule]) {
            errors.push(errorMessages[field][rule]);
          }
          break;
        case 'email':
          if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
            errors.push(errorMessages[field][rule]);
          }
          break;
        case 'equalTo':
          if (value !== passwordInput.value) {
            errors.push(errorMessages[field][rule]);
          }
          break;
        default:
          break;
      }
    }
  }

  return errors;
}
function updateErrorMessages(field, errors) {
  const errorMessageHtml = errors.map(error => `<p>${error}</p>`).join('');
  const errorMessageElement = document.getElementById(`error-${field}`);

  if (errorMessageElement) {
    errorMessageElement.innerHTML = errorMessageHtml;
  } else {
    const errorMessageDiv = document.createElement('div');
    errorMessageDiv.id = `error-${field}`;
    errorMessageDiv.innerHTML = errorMessageHtml;
    errorMessagesDiv.appendChild(errorMessageDiv);
  }
}
function clearErrorMessages(field) {
  const errorMessageElement = document.getElementById(`error-${field}`);

  if (errorMessageElement) {
    errorMessageElement.innerHTML = '';
  }
}
usernameInput.addEventListener('input', () => {
  const errors = validateFormField('username', usernameInput.value);
  updateErrorMessages('username', errors);
});
emailInput.addEventListener('input', () => {
  const errors = validateFormField('email', emailInput.value);
  updateErrorMessages('email', errors);
});
passwordInput.addEventListener('input', () => {
  const errors = validateFormField('password', passwordInput.value);
  updateErrorMessages('password', errors);
});
confirmPasswordInput.addEventListener('input', () => {
  const errors = validateFormField('confirmPassword', confirmPasswordInput.value);
  updateErrorMessages('confirmPassword', errors);
});
form.addEventListener('submit', (e) => {
  e.preventDefault();