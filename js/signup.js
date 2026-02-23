//////////////////////////
// EMAILJS INIT
//////////////////////////
emailjs.init("Lho7gVRUUqJ5gk8pR"); // tumaar EmailJS user ID

//////////////////////////
// FIREBASE v8 INIT
//////////////////////////
const firebaseConfig = {
  apiKey: "AIzaSyChMvSGryq73D7gY7yCydUzxufZCKpTsv4",
  authDomain: "my--tsite.firebaseapp.com",
  projectId: "my--tsite",
  storageBucket: "my--tsite.appspot.com",
  messagingSenderId: "796931259954",
  appId: "1:796931259954:web:b93016baea31a70ba7c62b"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

//////////////////////////
// SEND OTP FUNCTION
//////////////////////////
function sendCode() {
  const emailInput = document.getElementById("email");
  const email = emailInput.value.trim();

  if (!email) {
    alert("Enter your email");
    emailInput.focus();
    return;
  }

  // Simple email validation
  if (!/\S+@\S+\.\S+/.test(email)) {
    alert("Enter a valid email");
    emailInput.focus();
    return;
  }

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000);
  localStorage.setItem("otp", otp);
  localStorage.setItem("email", email);
  localStorage.setItem("otpTime", Date.now());

  // Send Email using EmailJS
  emailjs.send("service_15lpvbn", "template_4vdjsch", {
    to_email: email,
    code: otp
  })
  .then(function(response) {
    console.log("OTP sent successfully", response.status, response.text);
    alert("OTP sent to " + email);
    window.location.href = "verify.html"; // redirect after sending
  })
  .catch(function(error) {
    console.error("EmailJS error", error);
    alert("Failed to send OTP. Check console.");
  });
}

//////////////////////////
// GOOGLE SIGNUP FUNCTION
//////////////////////////
function googleSignup() {
  const provider = new firebase.auth.GoogleAuthProvider();

  auth.signInWithPopup(provider)
    .then(result => {
      console.log("Google signup success:", result.user.email);
      window.location.href = "userform.html";
    })
    .catch(err => {
      alert(err.message);
      console.error(err);
    });
}

//////////////////////////
// Make functions global for HTML onclick
//////////////////////////
window.sendCode = sendCode;
window.googleSignup = googleSignup;

console.log("✅ signup.js loaded, OTP ready");