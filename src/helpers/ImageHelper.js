import { ImagePicker } from "expo";
import firebase from "firebase";

import { uploadImageAsByteArray } from "../db/FileDb";

export async function uploadImgAndGetUrl(documentFolder, progressCallback) {
  const pickerResult = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: false,
    aspect: [4, 3],
    base64: true
  });
  console.log("pickerResult:", pickerResult);

  uploadImageAsByteArray(
    convertToByteArray(pickerResult.base64),
    progressCallback
  );
}

convertToByteArray = input => {
  let binary_string = atob(input);
  let len = binary_string.length;
  let bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes;
};

atob = input => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

  let str = input.replace(/=+$/, "");
  let output = "";

  if (str.length % 4 == 1) {
    throw new Error(
      "'atob' failed: The string to be decoded is not correctly encoded."
    );
  }
  for (
    let bc = 0, bs = 0, buffer, i = 0;
    (buffer = str.charAt(i++));
    ~buffer && ((bs = bc % 4 ? bs * 64 + buffer : buffer), bc++ % 4)
      ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
      : 0
  ) {
    buffer = chars.indexOf(buffer);
  }

  return output;
};

// _uploadAsByteArray = async (pickerResultAsByteArray, progressCallback) => {
//   try {
//     let metadata = {
//       contentType: "image/jpeg"
//     };

//     let storageRef = firebase.storage().ref();
//     let uid = firebase
//       .database()
//       .ref("/")
//       .push().key;
//     let ref = storageRef.child(`images/${uid}.jpg`);
//     let uploadTask = ref.put(pickerResultAsByteArray, metadata);

//     uploadTask.on(
//       "state_changed",
//       function(snapshot) {
//         progressCallback &&
//           progressCallback(snapshot.bytesTransferred / snapshot.totalBytes, 0);

//         let progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
//         // console.log("Upload is " + progress + "% done");
//       },
//       function(error) {
//         console.log("in _uploadAsByteArray ", error);
//       },
//       function() {
//         let downloadURL = uploadTask.snapshot.downloadURL;
//         console.log(" IN COMPLETED FUNCTION, download url:", downloadURL);
//         progressCallback(1, downloadURL);
//         // console.log("_uploadAsByteArray ", downloadURL);
//       }
//     );
//   } catch (ee) {
//     console.log("when trying to load _uploadAsByteArray ", ee);
//   }
// };
