import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import { storage } from "./firebase";

const upload = async (file, filename) => {
  // Create the file metadata
  /** @type {any} */
  console.log(file, filename);
  // Upload file and metadata to the object 'images/mountains.jpg'
  const storageRef = ref(storage, "images/" + filename);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        reject(`Some error occured + ${error.code}`);
        /* switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;
            case "storage/canceled":
              // User canceled the upload
              break;
  
            // ...
  
            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
          } */
      },
      () => {
        console.log("uploaded successfully");
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL);
          resolve(downloadURL);
        });
      }
    );
  });
};

export default upload;
