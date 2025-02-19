import { API_CONSTANT } from '../../services/ApiConstant';
import { getWithOutToken, get } from '../../services/ApiServices';
import { store } from '../Store';
import { setCategoryList, setInventoryData } from './reducer';

const getUniversalData = () => {
  return new Promise((resolve, reject) => {
    getWithOutToken(API_CONSTANT.UNIVERSAL_DATA)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

const getUniversalFeaturesData = () => {
  return new Promise((resolve, reject) => {
    getWithOutToken(API_CONSTANT.USER_GET_FEATURES)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
const getVendorOrderData = (queryParams) => {
  return new Promise((resolve, reject) => {
    get(`${API_CONSTANT.FETCH_ORDER_DATA}${queryParams}`)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

const getVendorOrderDetails = (request) => {
  return new Promise((resolve, reject) => {
    get(`${API_CONSTANT.FETCH_GET_BY_ORDER_ID}${request}`)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

const getInventory = (queryParams = '') => {
  return new Promise((resolve, reject) => {
    get(`${API_CONSTANT.GET_INVENTORY}${queryParams}`)
      .then((res) => {
        store.dispatch(setInventoryData(res?.data?.data));

        resolve(res);
      })
      .catch((err) => reject(err));
  });
};

const getInventoryProduct = (queryParams = '') => {
  return new Promise((resolve, reject) => {
    get(`${API_CONSTANT.GET_INVENTORY_PRODUCT}${queryParams}`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => reject(err));
  });
};

const fetchCategory = () => {
  return new Promise((resolve, reject) => {
    get(API_CONSTANT.FETCH_CATEGORY)
      .then((res) => {
        resolve(res);
        store.dispatch(setCategoryList(res?.data?.data));
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getProductList = (queryParams) => {
  return new Promise((resolve, reject) => {
    get(`${API_CONSTANT.FETCH_PRODUCT}${queryParams}`)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

const getCategoryList = (queryParams) => {
  return new Promise((resolve, reject) => {
    get(`${API_CONSTANT.SUB_CATEGORY_BY_ID}${queryParams}`)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export {
  getUniversalData,
  getVendorOrderData,
  getVendorOrderDetails,
  getInventory,
  getInventoryProduct,
  fetchCategory,
  getUniversalFeaturesData,
  getProductList,
  getCategoryList
};
