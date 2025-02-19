import * as Yup from 'yup';

export const VendorRegisterSchema3 = Yup.object({
  tradeLicense: Yup.string()
    .min(2)
    .max(50)
    .required('Please Enter Trade License'),
  iban: Yup.string().min(2).max(50).required('Please Enter IBAN'),
  vatNumber: Yup.string().min(2).max(50).required('Please Enter VAT Number'),
  emirate: Yup.string().min(2).max(50).required('Please Enter Emirates Number'),
  residenceVisa: Yup.string()
    .min(2)
    .max(50)
    .required('Please Enter Visa Number')
  // trade_license: Yup.mixed()
  //   .required('Trade License document is required')
  //   .test(
  //     'fileSize',
  //     'File too large',
  //     (value) => !value || value.size <= 5 * 1024 * 1024
  //   )
  //   .test(
  //     'fileFormat',
  //     'Unsupported file format',
  //     (value) =>
  //       !value ||
  //       ['application/pdf', 'image/jpeg', 'image/jpg'].includes(value.type)
  //   ),
  // cheque_scan: Yup.mixed()
  //   .required('Cancelled Cheque document is required')
  //   .test(
  //     'fileSize',
  //     'File too large',
  //     (value) => !value || value.size <= 5 * 1024 * 1024
  //   )
  //   .test(
  //     'fileFormat',
  //     'Unsupported file format',
  //     (value) =>
  //       !value ||
  //       ['application/pdf', 'image/jpeg', 'image/jpg'].includes(value.type)
  //   ),
  // vat_certificate: Yup.mixed()
  //   .required('VAT Certificate document is required')
  //   .test(
  //     'fileSize',
  //     'File too large',
  //     (value) => !value || value.size <= 5 * 1024 * 1024
  //   )
  //   .test(
  //     'fileFormat',
  //     'Unsupported file format',
  //     (value) =>
  //       !value ||
  //       ['application/pdf', 'image/jpeg', 'image/jpg'].includes(value.type)
  //   ),
  // emirate_id_pic: Yup.mixed()
  //   .required('Emirats ID document is required')
  //   .test(
  //     'fileSize',
  //     'File too large',
  //     (value) => !value || value.size <= 5 * 1024 * 1024
  //   )
  //   .test(
  //     'fileFormat',
  //     'Unsupported file format',
  //     (value) =>
  //       !value ||
  //       ['application/pdf', 'image/jpeg', 'image/jpg'].includes(value.type)
  //   ),
  // residence_visa: Yup.mixed()
  //   .required('Resident visa document is required')
  //   .test(
  //     'fileSize',
  //     'File too large',
  //     (value) => !value || value.size <= 5 * 1024 * 1024
  //   )
  //   .test(
  //     'fileFormat',
  //     'Unsupported file format',
  //     (value) =>
  //       !value ||
  //       ['application/pdf', 'image/jpeg', 'image/jpg'].includes(value.type)
  //   )
});
