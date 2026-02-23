import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyChMvSGryq73D7gY7yCydUzxufZCKpTsv4",
  authDomain: "my--tsite.firebaseapp.com",
  projectId: "my--tsite",
  appId: "1:796931259954:web:b93016baea31a70ba7c62b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

console.log("Firebase v10 loaded");

// ================= Email/Password Login =================
document.getElementById("emailLoginBtn").addEventListener("click", () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Enter email and password");
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      console.log("Email login success:", userCredential.user.email);
      window.location.href = "home.html";
    })
    .catch(err => alert(err.message));
});

// ================= Google Login =================
document.getElementById("googleBtn").addEventListener("click", () => {
  console.log("Redirecting to Google login...");
  signInWithRedirect(auth, provider);
});

// ================= After Redirect =================
getRedirectResult(auth)
  .then(result => {
    if (result && result.user) {
      console.log("Google login success:", result.user.email);
      window.location.href = "home.html";
    }
  })
  .catch(err => console.error(err.code, err.message));