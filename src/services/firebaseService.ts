import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import '@react-native-firebase/storage';

const uploadImage = async (imageToUpload: string) => {
  if (imageToUpload) {
    const blob = await new Promise<Blob>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response as Blob);
      };
      xhr.onerror = function () {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', imageToUpload, true);
      xhr.send(null);
    });

    const ref = firebase.storage().ref().child(`images/${Date.now()}`);
    return new Promise<string | null>((resolve, reject) => {
      ref.put(blob).on(
        'state_changed',
        null,
        error => {
          console.error('Error uploading image: ', error);
          reject(null);
        },
        async () => {
          const downloadURL = await ref.getDownloadURL();
          resolve(downloadURL);
        },
      );
    });
  }
};

const postItem = async (
  image: string,
  title: string,
  description: string,
  price: number,
) => {
  if (image) {
    const imageUrl = await uploadImage(image);
    const db = firebase.firestore();
    await db.collection('forsale').add({
      title,
      description,
      price: Number(price),
      imageUrl,
      userId: firebase.auth().currentUser?.uid,
      postedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  }
};

export {postItem, uploadImage};
