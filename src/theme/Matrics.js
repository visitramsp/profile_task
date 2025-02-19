/* eslint-disable complexity */
import { Dimensions, Platform } from 'react-native';
export const { width, height } = Dimensions.get('window');
export const WINDOW = Dimensions.get('window');

export const isPhoneX =
  Platform.OS === 'ios' && (WINDOW.height === 812 || WINDOW.height === 896);

export const isLowerDevice = WINDOW.height <= 700;

export const isPhone12 =
  Platform.OS === 'ios' && (height === 844 || height === 926);

export const deviceType = WINDOW.width < 480 ? 'phone' : 'tablet';

export const isIphoneXFun = () => {
  const dim = Dimensions.get('window');

  return (
    // This has to be iOS
    Platform.OS === 'ios' &&
    // Check either, iPhone X or XR
    (isIPhoneXSize(dim) || isIPhoneXrSize(dim))
  );
};

const isIPhoneXSize = (dim) => {
  return (
    dim.height === 780 ||
    dim.width === 780 ||
    dim.height === 812 ||
    dim.width === 812 ||
    dim.height === 844 ||
    dim.width === 844 ||
    dim.height === 896 ||
    dim.width === 896 ||
    dim.height === 926 ||
    dim.width === 926
  );
};

const isIPhoneXrSize = (dim) => {
  return (
    dim.height === 780 ||
    dim.width === 780 ||
    dim.height === 812 ||
    dim.width === 812 ||
    dim.height === 844 ||
    dim.width === 844 ||
    dim.height === 896 ||
    dim.width === 896 ||
    dim.height === 926 ||
    dim.width === 926
  );
};

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;
const horizontalScale = (size) => (width / guidelineBaseWidth) * size;
const verticalScale = (size) => (height / guidelineBaseHeight) * size;
const moderateScale = (size) => {
  const heightScale =
    Platform.OS === 'ios'
      ? isPhoneX
        ? WINDOW.height - 78
        : WINDOW.height
      : WINDOW.height - 24;
  return ((size - 2) * heightScale) / 667;
};

const cardRadius = 20;

export {
  horizontalScale,
  verticalScale,
  moderateScale,
  isIPhoneXSize,
  isIPhoneXrSize,
  cardRadius
};
