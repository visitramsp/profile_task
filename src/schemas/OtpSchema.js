import * as Yup from 'yup';

// r
export const OtpSchema = Yup.object().shape({
  otp: Yup.string()
    .required('OTP Code is required')
    .length(6, 'OTP Code must be exactly 6 digits')
});
