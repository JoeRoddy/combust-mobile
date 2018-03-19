import firebase from "firebase";

export const uploadImageAsByteArray = async (
  pickerResultAsByteArray,
  progressCallback
) => {
  //TODO: blocked by Expo, need them to update to RN54 so we can get Blob support,
  // should be available in Expo v27, faking for now
  for (let i = 0; i <= 3; i++) {
    setTimeout(() => {
      progressCallback(null, {
        status:
          i === 3 ? "completed" : (i * 100 / 3 + "").substring(0, 5) + "%",
        url:
          "https://firebasestorage.googleapis.com/v0/b/not-a-secret-agency.appspot.com/o/images%2F-L7kg4kybL0ruh2Gyaen?alt=media&token=d378cac1-5233-450f-a363-2029e2d1bfce"
      });
    }, i * 500);
  }

  return;
  try {
    var metadata = {
      contentType: "image/jpeg"
    };

    let name = new Date().getTime() + "-media.jpg";
    var storageRef = firebase.storage().ref();
    var ref = storageRef.child("images/" + name);
    let uploadTask = ref.put(pickerResultAsByteArray, metadata);

    uploadTask.on(
      "state_changed",
      function(snapshot) {
        progressCallback &&
          progressCallback(snapshot.bytesTransferred / snapshot.totalBytes);

        var progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
        console.log("Upload is " + progress + "% done");
      },
      function(error) {
        console.log("in _uploadAsByteArray ", error);
      },
      function() {
        var downloadURL = uploadTask.snapshot.downloadURL;
        console.log("_uploadAsByteArray ", uploadTask.snapshot.downloadURL);

        // // save a reference to the image for listing purposes
        // var ref = firebase.database().ref("assets");
        // ref.push({
        //   URL: downloadURL,
        //   //'thumb': _imageData['thumb'],
        //   name: name,
        //   //'coords': _imageData['coords'],
        //   owner: firebase.auth().currentUser && firebase.auth().currentUser.uid,
        //   when: new Date().getTime()
        // });
      }
    );
  } catch (ee) {
    console.log("when trying to load _uploadAsByteArray ", ee);
  }
};
