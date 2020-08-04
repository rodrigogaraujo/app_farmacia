import firebase from 'firebase';
const config = {
  apiKey: 'AIzaSyCD_innd8XjUq8Wd9-aLkPAU6N_b8A8ey8',
  authDomain: 'appfarmacia-5e385.firebaseapp.com',
  databaseURL: 'https://appfarmacia-5e385.firebaseio.com',
  projectId: 'appfarmacia-5e385',
  storageBucket: 'appfarmacia-5e385.appspot.com',
  messagingSenderId: '989707087509',
  appId: '1:989707087509:web:2e55b67868a2bde9d5f59c',
};

const initialize = firebase.initializeApp(config);

export default initialize;
