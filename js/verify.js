function verifyCode() {
  const userCode = document.getElementById("code").value.trim();
  const savedCode = localStorage.getItem("otp");
  const otpTime = localStorage.getItem("otpTime");

  if (!userCode) {
    alert("Enter verification code");
    return;
  }

  // Check if OTP expired (5 minutes)
  const now = Date.now();
  if (!otpTime || now - otpTime > 5 * 60 * 1000) {
    alert("OTP expired. Please request a new one.");
    localStorage.removeItem("otp");
    localStorage.removeItem("otpTime");
    window.location.href = "signup.html";
    return;
  }

  // Compare as string
  if (userCode === savedCode) {
    alert("✅ Email verified");

    // Clear otp
    localStorage.removeItem("otp");
    localStorage.removeItem("otpTime");

    // Go to user form
    window.location.href = "userform.html";
  } else {
    alert("❌ Invalid code");
  }
}

// Make global for HTML onclick
window.verifyCode = verifyCode;