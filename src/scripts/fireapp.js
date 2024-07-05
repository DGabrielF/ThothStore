import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyAJ76nNQmNdUjztA2nSYFfsksbI9N4NJg8",
  authDomain: "tudo-pra-ti.firebaseapp.com",
  projectId: "tudo-pra-ti",
  storageBucket: "tudo-pra-ti.appspot.com",
  messagingSenderId: "291436323776",
  appId: "1:291436323776:web:ee8e3723bed2e41c171e25"
};

export const app = initializeApp(firebaseConfig);