import { API_CONSTANT } from '../../services/ApiConstant';
import { put, putWithTokenAndFormHeader } from '../../services/ApiServices';

// const putRequestUpdateProfile = (data) => {
//   return new Promise((resolve, reject) => {
//     put(`${API_CONSTANT.UPDATE_PROFILE}`, data)
//       .then((res) => {
//         resolve(res);
//       })
//       .catch((err) => {
//         reject(err);
//       });
//   });
// };

const putRequestUpdateProfile = (data) => {
  return new Promise((resolve, reject) => {
    putWithTokenAndFormHeader(API_CONSTANT.UPDATE_PROFILE, data)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => reject(err));
  });
};

const putRequestchangePassword = (data) => {
  return new Promise((resolve, reject) => {
    put(`${API_CONSTANT.CHANGE_PASSWORD}`, data)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export { putRequestUpdateProfile, putRequestchangePassword };
