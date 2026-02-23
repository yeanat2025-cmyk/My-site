function done() {
  const p1 = document.getElementById("p1").value.trim();
  const p2 = document.getElementById("p2").value.trim();

  if (!p1 || !p2) {
    alert("Please enter both fields");
    return;
  }

  if (p1.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }

  if (p1 !== p2) {
    alert("Passwords do not match");
    return;
  }

  alert("✅ Signup successful");

  // Optionally, save password (or move to next step)
  localStorage.setItem("password", p1);

  // Redirect to home page or login
  window.location.href = "home.html";
}

// Make global for HTML onclick
window.done = done;