import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBbVf1Ju1pFw3TFcnvLL-lXt5DXlspRJmU',
  authDomain: 'where-is-waldo-320b6.firebaseapp.com',
  projectId: 'where-is-waldo-320b6',
  storageBucket: 'where-is-waldo-320b6.appspot.com',
  messagingSenderId: '986590216316',
  appId: '1:986590216316:web:d89d55d5af4bc7773849f9',
};

firebase.initializeApp(firebaseConfig);
export default firebase;
