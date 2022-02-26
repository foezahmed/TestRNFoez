// Import the functions you need from the SDKs you need
//@ts-check

import  firebase  from '@react-native-firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyBbpG3tLOYc7cwLbaCCV6ChV6Lxr9FlIC0',
    authDomain: 'test-reacnative-aa98f.firebaseapp.com',
    databaseURL: 'https://test-reacnative-aa98f-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'test-reacnative-aa98f',
    storageBucket: 'test-reacnative-aa98f.appspot.com',
    messagingSenderId: '85684263588',
    appId: '1:85684263588:web:8719efd2308d6b5dd12431',
    measurementId: 'G-W88H38Y1TF'
};

// Initialize Firebase

export const firebaseInit = ()=>{
    if (firebase.apps.length === 0) {
        const app = firebase.initializeApp(firebaseConfig);
    }
}
