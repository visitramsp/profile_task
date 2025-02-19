import * as Yup from 'yup';

export const VendorRegisterSchema2 = Yup.object({
  companyName: Yup.string()
    .min(2)
    .max(50)
    .required('Please Enter Company Name'),
  brandName: Yup.string().min(2).max(50).required('Please Enter Brand Name'),
  designation: Yup.string().min(2).max(50).required('Please Enter Designation'),
  tradeLicenseNo: Yup.string().min(2).max(50),
  companyAddress: Yup.string()
    .min(2)
    .max(100)
    .required('Please Enter Company Address'),
  poBox: Yup.string().min(2).max(50).required('Please Enter PO Box')
});
