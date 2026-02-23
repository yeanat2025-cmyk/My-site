// 🔥 Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

// 🔐 Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBsw9bEZOmv4fjC4WLFw5ZDlt2zeo5h9Is",
  authDomain: "tako-d0d73.firebaseapp.com",
  projectId: "tako-d0d73",
  storageBucket: "tako-d0d73.firebasestorage.app",
  messagingSenderId: "330638606328",
  appId: "1:330638606328:web:97d5309f578dffb29a600d"
};

// 🔥 Init Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🔘 Upload button
const uploadBtn = document.getElementById("uploadBtn");
if (uploadBtn) {
  uploadBtn.addEventListener("click", uploadVideo);
}

// ===============================
// 🚀 Cloudinary Upload + Firestore Save + Redirect
// ===============================
function uploadVideo() {
  const fileInput = document.getElementById("videoFile");
  const captionInput = document.getElementById("caption");
  const progressBar = document.getElementById("progress");
  const statusText = document.getElementById("status");
  const preview = document.getElementById("preview");

  const file = fileInput?.files[0];
  const caption = captionInput?.value || "";

  if (!file) {
    alert("Please select a video");
    return;
  }

  // UI reset
  statusText.innerText = "Uploading...";
  progressBar.style.width = "0%";
  progressBar.innerText = "0%";

  // 📦 Cloudinary
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "upload_video"); // unsigned preset
  formData.append("folder", "videos");

  const xhr = new XMLHttpRequest();
  xhr.open(
    "POST",
    "https://api.cloudinary.com/v1_1/difn156ho/video/upload"
  );

  // 🔄 Progress
  xhr.upload.onprogress = (e) => {
    if (e.lengthComputable) {
      const percent = Math.round((e.loaded / e.total) * 100);
      progressBar.style.width = percent + "%";
      progressBar.innerText = percent + "%";
    }
  };

  // ✅ Upload success
  xhr.onload = async () => {
    if (xhr.status === 200) {
      const res = JSON.parse(xhr.responseText);

      if (!res.secure_url) {
        statusText.innerText = "Upload error ❌";
        console.error(res);
        return;
      }

      // 🎥 Preview
      if (preview) {
        preview.src = res.secure_url;
        preview.style.display = "block";
        preview.muted = true;
        preview.playsInline = true;
      }

      // 🔥 Save to Firestore (HOME SAFE)
      await addDoc(collection(db, "videos"), {
        videoUrl: res.secure_url,
        caption: caption,
        likes: 0,
        createdAt: serverTimestamp()
      });

      statusText.innerText = "Upload successful ✅ Redirecting...";

      // 🔁 Redirect to Home
      setTimeout(() => {
        window.location.href = "home.html";
      }, 800);

    } else {
      statusText.innerText = "Upload failed ❌";
      console.error(xhr.responseText);
    }
  };

  xhr.onerror = () => {
    statusText.innerText = "Network error ❌";
  };

  xhr.send(formData);
}