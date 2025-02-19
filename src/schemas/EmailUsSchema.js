import * as Yup from 'yup';

export const EmailUsSchema = Yup.object({
  fullName: Yup.string().min(2).max(25).required('Please Enter Full Name'),
  account: Yup.string().required('Please Enter Account/Entity'),
  subject: Yup.string().required('Please Enter Subject'),
  message: Yup.string().required('Please Enter Message')
});
