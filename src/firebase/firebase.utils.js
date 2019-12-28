import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
const config =
{
    apiKey: "AIzaSyASBJuEmau4-fWKPoZN8GqRd3kzT5cQ0ec",
    authDomain: "crwn-db-1091f.firebaseapp.com",
    databaseURL: "https://crwn-db-1091f.firebaseio.com",
    projectId: "crwn-db-1091f",
    storageBucket: "crwn-db-1091f.appspot.com",
    messagingSenderId: "466944543461",
    appId: "1:466944543461:web:b5873602fb654f1c82a20c",
    measurementId: "G-2RJJSMWKYB"
  };
  export const createUserProfileDocument = async (userAuth, additionalData) => {
      if (!userAuth) return;

      const userRef = firestore.doc(`users/${userAuth.uid}`);

      const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();


        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData

            })
        } catch (error){
            console.log('error creating user', error.message);
        }
    }
    return userRef;
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;