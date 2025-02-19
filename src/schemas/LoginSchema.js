import * as Yup from 'yup';

const LoginSchema = Yup.object({
  email: Yup.string().email().required('Please Enter Your Email'),
  password: Yup.string().min(5).required('Please Enter Your Password')
});

const SignUpSchema = Yup.object({
  fullname: Yup.string().required('Please Enter Your Name'),
  email: Yup.string().email().required('Please Enter Your Email'),
  phoneNo: Yup.number().required('Please Enter Phone Number')
});

const AddUserSchema = Yup.object({
  fullname: Yup.string().required('Please Enter Your Full Name'),
  email: Yup.string().email().required('Please Enter Your Email'),
  phoneNo: Yup.string()
    .matches(/^[0-9]{9}$/, 'Phone No. exactly 9 digits')
    .required('Please Enter Your Phone Number')
});

const ForgotSchema = Yup.object({
  email: Yup.string().email().required('Please Enter Your Email'),
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

export { LoginSchema, SignUpSchema, AddUserSchema, ForgotSchema };
