// Load header HTML
fetch("components/header.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("header").innerHTML = html;
    initHeader();
  });

function initHeader() {
  firebase.auth().onAuthStateChanged(user => {
    if (!user) {
      window.location.href = "login.html";
      return;
    }

    // UID auto
    document.getElementById("hUserId").innerText = user.uid.slice(0, 8);

    // Load profile data
    firebase.firestore()
      .collection("users")
      .doc(user.uid)
      .get()
      .then(doc => {
        if (!doc.exists) return;

        const d = doc.data();

        document.getElementById("hName").innerText = d.name || "User";
        document.getElementById("hBalance").innerText = d.balance || 0;

        if (d.photo) {
          document.getElementById("hPhoto").src = d.photo;
        }
      });
  });
}

// 🔗 Share
function shareProfile() {
  if (navigator.share) {
    navigator.share({
      title: "My App",
      text: "Check my profile",
      url: location.href
    });
  }
}

// 💰 Balance page
function goBalance() {
  window.location.href = "balance.html";
}