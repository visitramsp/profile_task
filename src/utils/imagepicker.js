import ImageCropPicker from 'react-native-image-crop-picker';
import { showToastError } from '.';
import i18next from '../I18n/i18n';
import {
  APP_LANGUAGE_CONSTANT,
  IMG_UPLOAD_SIZE_LIMIT
} from '../constants/AppConstant';

const calculateImg = (resolve, image, isGallery) => {
  const calculatedImg =
    image?.length > 0 &&
    image?.filter((res) => {
      return res?.size < IMG_UPLOAD_SIZE_LIMIT * 1024 * 1024;
    });

  image?.length > calculatedImg?.length &&
    showToastError(
      i18next.t(APP_LANGUAGE_CONSTANT.IMAGE_UPLOAD_LIMIT, {
        size: IMG_UPLOAD_SIZE_LIMIT
      })
    );
  resolve(isGallery ? calculatedImg : calculatedImg[0]);
};

const openCamera = () => {
  return new Promise((resolve, reject) => {
    ImageCropPicker.openCamera({
      cropping: true,
      mediaType: 'photo',
      compressImageQuality: 0.3,
      freeStyleCropEnabled: true,
      includeBase64: false
    })
      .then((image) => {
        calculateImg(resolve, [image]);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const openGallery = (multiple = false) => {
  return new Promise((resolve, reject) => {
    ImageCropPicker.openPicker({
      cropping: multiple ? false : true,
      mediaType: 'photo',
      freeStyleCropEnabled: true,
      includeBase64: false,
      multiple: multiple,
      compressImageQuality: 0.3
    })
      .then((image) => {
        calculateImg(resolve, multiple ? image : [image], true);
      })
      .catch((error) => reject(error));
  });
};

export { openCamera, openGallery };
