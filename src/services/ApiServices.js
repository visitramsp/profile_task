import axios from 'axios';
import { environmentVariables } from '../config/Config';
import { ASYNC_KEY } from '../constants';
import { getFromAsync } from './AsyncStoreService';

const api = axios.create({
  baseURL: environmentVariables?.apiUrl,
  delayed: false
});

const headerWithFormData = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data'
  }
};

const getAccessToken = async () => {
  const token = await getFromAsync(ASYNC_KEY.TOKEN);
  if (token !== null) {
    return token;
  }
};

const headerWithToken = async () => {
  const getToken = await getAccessToken();
  if (getToken) {
    return {
      headers: {
        token: getToken
      }
    };
  } else {
    return Error('Something went wrong');
  }
};

const getWithOutToken = (endPoint) => {
  return new Promise(async (resolve, reject) => {
    api
      .get(`${endPoint}`)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

const get = (endPoint) => {
  return new Promise(async (resolve, reject) => {
    let header = null;
    try {
      header = await headerWithToken();
    } catch (err) {
      reject(err);
      return;
    }
    api
      .get(`${endPoint}`, header)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

const post = (endPoint, data = {}) => {
  return new Promise(async (resolve, reject) => {
    let header = null;
    try {
      header = await headerWithToken();
    } catch (err) {
      reject(err);
      return;
    }
    api
      .post(`${endPoint}`, data, header)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => reject(err));
  });
};

const postWithOutToken = (endPoint, data = {}) => {
  return new Promise(async (resolve, reject) => {
    api
      .post(`${endPoint}`, data)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => reject(err));
  });
};

const postDocsAPI = (endPoint, data) => {
  return new Promise(async (resolve, reject) => {
    api
      .post(`${endPoint}`, data)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => reject(err));
  });
};

const putWithOutToken = (endPoint, data = {}) => {
  return new Promise(async (resolve, reject) => {
    api
      .put(`${endPoint}`, data)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => reject(err));
  });
};

const put = (endPoint, data = {}) => {
  return new Promise(async (resolve, reject) => {
    let header = null;
    try {
      header = await headerWithToken();
    } catch (err) {
      reject(err);
      return;
    }
    api
      .put(`${endPoint}`, data, header)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => reject(err));
  });
};

const postWithFormData = (endPoint, data = {}) => {
  return new Promise(async (resolve, reject) => {
    api
      .post(`${endPoint}`, data, headerWithFormData)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const postWithTokenAndFormHeader = (endPoint, data = {}) => {
  return new Promise(async (resolve, reject) => {
    let header = null;
    try {
      header = await headerWithToken();
    } catch (err) {
      reject(err);
      return;
    }

    const headerWithTokenFormData = {
      headers: {
        token: header?.headers?.token,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    };

    api
      .post(`${endPoint}`, data, headerWithTokenFormData)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => reject(err));
  });
};

const putWithTokenAndFormHeader = (endPoint, data = {}) => {
  return new Promise(async (resolve, reject) => {
    let header = null;
    try {
      header = await headerWithToken();
    } catch (err) {
      reject(err);
      return;
    }

    const headerWithTokenFormData = {
      headers: {
        token: header?.headers?.token,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    };

    api
      .put(`${endPoint}`, data, headerWithTokenFormData)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => reject(err));
  });
};

const remove = (endPoint, data = {}) => {
  return new Promise(async (resolve, reject) => {
    let header = null;
    try {
      header = await headerWithToken();
    } catch (err) {
      reject(err);
      return;
    }

    api
      .delete(`${endPoint}`, { ...header, ...{ data } })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export {
  api,
  post,
  postWithOutToken,
  postDocsAPI,
  get,
  postWithFormData,
  getWithOutToken,
  put,
  putWithOutToken,
  remove,
  putWithTokenAndFormHeader,
  postWithTokenAndFormHeader
};
