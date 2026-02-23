firebase.auth().onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "login.html";
  } else {
    loadProfile(user);
  }
});

function loadProfile(user) {
  const db = firebase.firestore();
  db.collection("users")
    .doc(user.uid)
    .get()
    .then(doc => {
      if (!doc.exists) return;

      const data = doc.data();

      // Profile body
      document.getElementById("name2").innerText = data.name || "---";
      document.getElementById("country").innerText = data.country || "---";
      document.getElementById("gender").innerText = data.gender || "---";
      document.getElementById("mobile").innerText = data.mobile || "---";
      document.getElementById("balance").innerText = data.balance || 0;

      // Profile photo
      const photoEl = document.getElementById("photo");
      if (photoEl && data.photo) {
        photoEl.src = data.photo;
      }
    })
    .catch(err => console.error("Error loading profile:", err));
}

function goBalance() {
  window.location.href = "balance.html";
}

function logout() {
  firebase.auth().signOut()
    .then(() => window.location.href = "login.html")
    .catch(err => console.error("Logout error:", err));
}