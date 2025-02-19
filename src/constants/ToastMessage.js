/* eslint-disable react/react-in-jsx-scope */
import Toast from 'react-native-toast-message';
import {
  ErrorToast,
  SuccessToast
} from '../components/customToast/CustomToast';
export const success = ({ type, text1, text2 }) => {
  Toast.show({
    type: type, // Custom type
    text1: text1,
    text2: text2,
    position: 'top',
    topOffset: 0 // Position of toast (top, bottom, center)
  });
};

export const toastConfig = {
  successToast: (props) => <SuccessToast {...props} />,
  errorToast: (props) => <ErrorToast {...props} />
};
