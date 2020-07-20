import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCmfGLM7cD5Vnz_4C9ihDk-t0idoonwcOg",
    authDomain: "expensify-57e18.firebaseapp.com",
    databaseURL: "https://expensify-57e18.firebaseio.com",
    projectId: "expensify-57e18",
    storageBucket: "expensify-57e18.appspot.com",
    messagingSenderId: "564730546037",
    appId: "1:564730546037:web:382c36b53f8c885504353c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const tasksRef = firebase.firestore().collection('Tasks');
  export const projectTypesRef = firebase.firestore().collection('ProjectTypes');
  export const projectsRef = firebase.firestore().collection('Projects');
  export const dailyDataRef = firebase.firestore().collection('DailyData');