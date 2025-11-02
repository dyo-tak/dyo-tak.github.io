// DOM Elements
const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navLinksArray = document.querySelectorAll(".nav-links a");

// Mobile Navigation Toggle
mobileNavToggle.addEventListener("click", () => {
  const isOpened = mobileNavToggle.getAttribute("aria-expanded") === "true";
  mobileNavToggle.setAttribute("aria-expanded", !isOpened);
  mobileNavToggle.classList.toggle("active");
  navLinks.classList.toggle("active");

  // Toggle ARIA labels
  mobileNavToggle.setAttribute(
    "aria-label",
    isOpened ? "Open navigation menu" : "Close navigation menu"
  );
});

// Close mobile menu when clicking on a link
navLinksArray.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    mobileNavToggle.classList.remove("active");
    mobileNavToggle.setAttribute("aria-expanded", "false");
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    if (targetId === "#") return; // Skip if href is just "#"

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const navHeight = document.querySelector(".navbar").offsetHeight;
      const targetPosition = targetElement.offsetTop - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Active section highlight in navigation
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

function highlightNavOnScroll() {
  const navHeight = document.querySelector(".navbar").offsetHeight;
  const scrollPosition = window.scrollY + navHeight + 100; // Add offset for better UX

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      navItems.forEach((item) => {
        item.classList.remove("active");
        if (item.getAttribute("href") === `#${sectionId}`) {
          item.classList.add("active");
        }
      });
    }
  });
}

// Add scroll event listener for navigation highlighting
window.addEventListener("scroll", highlightNavOnScroll);

// Initialize navigation state on page load
document.addEventListener("DOMContentLoaded", () => {
  highlightNavOnScroll();

  // Set initial ARIA states
  mobileNavToggle.setAttribute("aria-expanded", "false");
  mobileNavToggle.setAttribute("aria-label", "Open navigation menu");

  // Initialize AOS
  AOS.init({
    duration: 800,
    once: true,
    offset: 100,
    easing: "ease-out-cubic",
  });
});
