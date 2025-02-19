import * as Yup from 'yup';

export const AddDriverSchema = Yup.object({
  name: Yup.string().min(2).max(50).required('Please Enter Full Name'),
  driverLicense: Yup.string().required('Please Enter Driver License No.'),
  driverLicenseDocument: Yup.string().required(
    'Please Enter Driver License Document'
  ),
  assignVehicle: Yup.string().required('Please Select Assign Vehicle')
});
