module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  if (username.trim() === '') {
    errors.username = 'Username must not be empty';
  }
  if (email.trim() === '') {
    errors.email = 'Email must not be empty';
  } else {
    const regExp = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
    if (!email.match(regExp)) {
      errors.email = 'Email must be a valid email address';
    }
  }
  if (password.trim() === '') {
    password.password = 'Password must not be empty';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Password should match'
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  }
};