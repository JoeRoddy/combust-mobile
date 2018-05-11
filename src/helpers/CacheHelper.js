import { AsyncStorage } from "react-native";

export const getItem = (key, callback) => {
  try {
    const value = AsyncStorage.getItem(key, (err, val) => {
      callback(null, val !== null ? JSON.parse(val) : null);
    });
  } catch (error) {
    console.error("Error retrieving data");
  }
};

export const storeItem = (key, value) => {
  const data = JSON.stringify(value);
  try {
    AsyncStorage.setItem(key, data);
  } catch (error) {
    console.error("Error saving data");
  }
};
