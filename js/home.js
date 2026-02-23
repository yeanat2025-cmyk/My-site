// ================= IMAGE SLIDER =================

const slides = [
  "assets/slide1.jpg",
  "assets/slide2.jpg",
  "assets/slide3.jpg",
  "assets/slide4.jpg",
  "assets/slide5.jpg"
];

let currentIndex = 0;
const slideImg = document.getElementById("slideImg");

if (slideImg) {
  setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    slideImg.src = slides[currentIndex];
  }, 3000);
}

// ================= BOTTOM NAV ACTIVE =================

const navButtons = document.querySelectorAll(".bottom-nav button");

navButtons.forEach(button => {
  button.addEventListener("click", () => {
    navButtons.forEach(b => b.classList.remove("active"));
    button.classList.add("active");
  });
});

console.log("✅ Home.js loaded successfully");