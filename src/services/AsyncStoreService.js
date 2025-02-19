import AsyncStorage from '@react-native-async-storage/async-storage';

const setInAsyncStorage = async (key, value) => {
  await AsyncStorage.setItem(key, value);
};

const getFromAsync = async (key) => {
  const asyncItem = await AsyncStorage.getItem(key);
  return asyncItem;
};

const removeFromAsync = async (key) => {
  await AsyncStorage.removeItem(key);
};

export { setInAsyncStorage, getFromAsync, removeFromAsync };
