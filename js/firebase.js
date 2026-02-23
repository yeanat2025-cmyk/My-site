// ================= FIREBASE CONFIG =================
const firebaseConfig = {
  apiKey: "AIzaSyChMvSGryq73D7gY7yCydUzxufZCKpTsv4",
  authDomain: "my--tsite.firebaseapp.com",
  projectId: "my--tsite",
  storageBucket: "my--tsite.appspot.com",
  messagingSenderId: "796931259954",
  appId: "1:796931259954:web:b93016baea31a70ba7c62b"
};

// ================= INIT =================
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// ================= CHECK USER PROFILE =================
function checkUserProfile(user) {
  return db.collection("users").doc(user.uid).get();
}

// ================= EMAIL LOGIN =================
function login(email, password) {
  if (!email || !password) {
    alert("Email & Password required");
    return;
  }

  auth.signInWithEmailAndPassword(email, password)
    .then(res => {
      const user = res.user;

      checkUserProfile(user).then(doc => {
        if (doc.exists) {
          // ✅ Profile already created
          window.location.href = "home.html";
        } else {
          // ❌ New user → fill profile
          window.location.href = "userform.html";
        }
      });
    })
    .catch(err => alert(err.message));
}

// ================= GOOGLE LOGIN =================
function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();

  auth.signInWithPopup(provider)
    .then(result => {
      const user = result.user;

      checkUserProfile(user).then(doc => {
        if (doc.exists) {
          window.location.href = "home.html";
        } else {
          // 🔥 Auto save basic info
          db.collection("users").doc(user.uid).set({
            name: user.displayName || "",
            email: user.email,
            photo: user.photoURL || "",
            balance: 0,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
          }).then(() => {
            window.location.href = "userform.html";
          });
        }
      });
    })
    .catch(error => alert(error.message));
}

// ================= AUTH GUARD (Protect pages) =================
function protectPage() {
  auth.onAuthStateChanged(user => {
    if (!user) {
      window.location.href = "login.html";
    }
  });
}

// ================= LOGOUT =================
function logout() {
  auth.signOut().then(() => {
    window.location.href = "login.html";
  });
}

// ================= EXPORT =================
window.firebaseAuth = {
  login,
  googleLogin,
  logout,
  protectPage
};