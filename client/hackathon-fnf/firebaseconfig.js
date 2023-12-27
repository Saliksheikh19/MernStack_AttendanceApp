import { initializeApp } from "firebase/app";

import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCvlGPtJXvfyX5TMlWiSe16GHyV5g6HxlE",
  authDomain: "blogapp-bbeb2.firebaseapp.com",
  projectId: "blogapp-bbeb2",
  storageBucket: "blogapp-bbeb2.appspot.com",
  messagingSenderId: "416935003710",
  appId: "1:416935003710:web:e583f75bbd064cdad6336f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Storage and get a reference to the service
 export const  storage = getStorage(app);