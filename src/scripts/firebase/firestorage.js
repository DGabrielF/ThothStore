import { getStorage, ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js';

import { app } from './fireapp.js';

const storage = getStorage(app);

export const Firestorage = {
  uploadImages: async () => {}
};

Firestorage.uploadImages = async (files) => {
  const uploadPromises = [];
  const imageUrls = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i]

    const storageRef = ref(storage, 'products/' + file.name);

    const uploadTask = uploadBytes(storageRef, file).then(snapshot => {
      return getDownloadURL(snapshot.ref).then(downloadUrl => {
        imageUrls.push(downloadUrl)
      })
    })

    uploadPromises.push(uploadTask);
  }
  await Promise.all(uploadPromises);
  
  return imageUrls;
}