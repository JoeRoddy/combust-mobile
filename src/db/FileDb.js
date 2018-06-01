import firebase from "firebase/app";
import "firebase/storage";

export const uploadImageAsync = async function(uri, documentFolder) {
  const response = await fetch(uri);
  const blob = await response.blob();
  const ref = firebase
    .storage()
    .ref(`/${documentFolder}`)
    .child(
      firebase
        .database()
        .ref()
        .push().key
    );
  const snapshot = await ref.put(blob);
  return await ref.getDownloadURL();
};
