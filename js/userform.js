// ================= FIREBASE INSTANCES =================
const auth = firebase.auth();

// Optional: your firebase storage & DB helper instances
// firebaseStorage.uploadPhoto(file, uid)
// firebaseDB.saveProfile(uid, data)

// ================= WAIT FOR PAGE LOAD =================
window.onload = () => {

  const photo = document.getElementById("photo");
  const preview = document.getElementById("preview");
  const uidText = document.getElementById("uidText");

  const name = document.getElementById("name");
  const mobile = document.getElementById("mobile");
  const country = document.getElementById("country");
  const gender = document.getElementById("gender");
  const dob = document.getElementById("dob");

  // ================= AUTH PROTECT =================
  auth.onAuthStateChanged(user => {
    if (!user) {
      // Not logged in → redirect to login page
      window.location.href = "login.html";
    } else {
      // generate unique userId for local display
      if (!localStorage.getItem("userId")) {
        const userId =
          Math.floor(10000000 + Math.random() * 90000000);
        uidText.innerText = userId;
        localStorage.setItem("userId", userId);
      } else {
        uidText.innerText = localStorage.getItem("userId");
      }
    }
  });

  // ================= PHOTO PREVIEW =================
  if (photo && preview) {
    photo.addEventListener("change", e => {
      const file = e.target.files[0];
      if (file) {
        preview.src = URL.createObjectURL(file);
      }
    });
  }

  // ================= SUBMIT PROFILE =================
  window.submitProfile = function () {
    const user = auth.currentUser;
    if (!user) {
      alert("❌ Not logged in");
      return;
    }

    // Validate fields
    if (!name.value.trim() || !mobile.value.trim() || !country.value || !gender.value || !dob.value) {
      alert("Please fill all fields");
      return;
    }

    const data = {
      uid: user.uid,
      userId: localStorage.getItem("userId"),
      name: name.value.trim(),
      mobile: mobile.value.trim(),
      country: country.value,
      gender: gender.value,
      dob: dob.value,
      created: new Date()
    };

    // ================= PHOTO UPLOAD =================
    if (photo.files[0]) {
      firebaseStorage.uploadPhoto(photo.files[0], user.uid)
        .then(url => {
          data.photo = url;
          return firebaseDB.saveProfile(user.uid, data);
        })
        .then(() => {
          alert("✅ Profile saved successfully");
          // Optional: redirect to home
          window.location.href = "home.html";
        })
        .catch(err => {
          console.error(err);
          alert("❌ Error saving profile: " + err.message);
        });
    } else {
      firebaseDB.saveProfile(user.uid, data)
        .then(() => {
          alert("✅ Profile saved successfully");
          window.location.href = "home.html";
        })
        .catch(err => {
          console.error(err);
          alert("❌ Error saving profile: " + err.message);
        });
    }
  };
};