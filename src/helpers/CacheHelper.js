import { AsyncStorage } from "react-native";

export const getItem = (key, callback) => {
  console.log("getItem called w/key:", key);

  try {
    const value = AsyncStorage.getItem(key, (err, val) => {
      console.log("got data:", val);
      callback(null, val !== null ? JSON.parse(val) : null);
    });
  } catch (error) {
    console.log("Error retrieving data");
  }
};

export const storeItem = (key, value) => {
  const data = JSON.stringify(value);
  try {
    AsyncStorage.setItem(key, data);
  } catch (error) {
    console.log("Error saving data");
  }
};
