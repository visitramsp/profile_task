import * as Yup from 'yup';

export const VendorRegisterSchema = Yup.object({
  name: Yup.string().min(2).max(25).required('Please Enter Your Name'),
  // email: Yup.string().email().required('Please Enter Your Email'),
  phone: Yup.string().length(9).required('Please Enter Your Number')
});
