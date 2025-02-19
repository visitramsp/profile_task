import * as Yup from 'yup';

export const RattingFeedbackSchema = Yup.object({
  feedback: Yup.string().required('Please Enter Feedback')
});
