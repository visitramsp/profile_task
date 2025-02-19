import * as Yup from 'yup';

export const SetNewPassSchema = Yup.object().shape({
  // email: Yup.string().required('Email is required.'),
  oldPassword: Yup.string()
    .required('old Password is required.')
    .test('isValid', 'Password is not valid', function (value) {
      const { path, createError } = this;
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasDigit = /\d/.test(value);
      const hasSpecialChar = /[@$!%*?&#]/.test(value);
      const isValid =
        hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar;

      if (!isValid) {
        return createError({
          path,
          message: 'Password does not meet all criteria.'
        });
      }
      return true;
    }),
  newPassword: Yup.string()
    .required('New Password is required.')
    .test('isValid', 'Password is not valid', function (value) {
      const { path, createError } = this;
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasDigit = /\d/.test(value);
      const hasSpecialChar = /[@$!%*?&#]/.test(value);
      const isValid =
        hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar;

      if (!isValid) {
        return createError({
          path,
          message: 'Password does not meet all criteria.'
        });
      }
      return true;
    }),
  confirmPAssword: Yup.string()
    .oneOf(
      [Yup.ref('newPassword'), null],
      'Confirm password should be must match to password'
    )
    .required('Confirm Password is required')
});
