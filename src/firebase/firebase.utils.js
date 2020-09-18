import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBXSseeqeaVcwvzE9OQne5asqKZV1YAGrc',
  authDomain: 'crwn-clothing-3f75b.firebaseapp.com',
  databaseURL: 'https://crwn-clothing-3f75b.firebaseio.com',
  projectId: 'crwn-clothing-3f75b',
  storageBucket: 'crwn-clothing-3f75b.appspot.com',
  messagingSenderId: '165005376029',
  appId: '1:165005376029:web:8833abe89c9e4f625064f4',
  measurementId: 'G-X4PB48R300',
};

firebase.initializeApp(firebaseConfig);

export const createUserProfileDocument = async (userAuth, data) => {
  if (!userAuth) {
    return;
  }
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({ displayName, email, createdAt, ...data });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
