import { ImagePicker } from "expo";

import { uploadImageAsync } from "../db/FileDb";

export async function uploadImgAndGetUrl(documentFolder, progressCallback) {
  const pickerResult = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: false,
    aspect: [4, 3],
    base64: true
  });

  if (pickerResult.cancelled) {
    return;
  }

  const imgUrl = await uploadImageAsync(pickerResult.uri, documentFolder);
  progressCallback(null, imgUrl);
}
