document.addEventListener("DOMContentLoaded", () => {
  const nav = document.createElement("nav");
  nav.innerHTML = `
    <div class="w3-bar w3-theme">
      <a href="index.html" class="w3-bar-item w3-button logo-link">JustForToday</a>
      <a href="about.html" class="w3-bar-item w3-button nav-link">About</a>
      <a href="about.html" class="w3-bar-item w3-button nav-link">todo</a>
      <a href="about.html" class="w3-bar-item w3-button nav-link">Media</a>
      <a href="about.html" class="w3-bar-item w3-button nav-link">Meditation</a>
      <a href="about.html" class="w3-bar-item w3-button nav-link">Stuff</a>
      <a href="reflection.html" class="w3-bar-item w3-button nav-link">Day Reflection</a>
      <button type="button" class="w3-bar-item w3-button w3-right w3-hide-large w3-hide-medium" id="navToggle" aria-label="Open menu">
        <span id="navIcon">&#9776;</span>
      </button>
    </div>
    <div id="navOverlay" class="nav-overlay">
      <div class="nav-overlay-content">
        <button class="nav-close" aria-label="Close menu">&times;</button>
        <a href="index.html" class="w3-bar-item w3-button">Home</a>
        <a href="about.html" class="w3-bar-item w3-button">About</a>
        <a href="about.html" class="w3-bar-item w3-button">todo</a>
        <a href="about.html" class="w3-bar-item w3-button">Media</a>
        <a href="about.html" class="w3-bar-item w3-button">Meditation</a>
        <a href="about.html" class="w3-bar-item w3-button">Stuff</a>
        <a href="about.html" class="w3-bar-item w3-button">Day Reflection</a>
      </div>
    </div>
  `;
  document.body.prepend(nav);

  // Toggle overlay menu and icon on mobile
  const navToggle = document.getElementById("navToggle");
  const navIcon = document.getElementById("navIcon");
  const navOverlay = document.getElementById("navOverlay");
  const navClose = nav.querySelector(".nav-close");
  if (navToggle && navOverlay && navIcon) {
    function closeMenu() {
      navOverlay.classList.remove("open");
      document.body.classList.remove("nav-open");
      navIcon.innerHTML = "&#9776;";
    }
    navToggle.addEventListener("click", () => {
      const isOpen = navOverlay.classList.toggle("open");
      document.body.classList.toggle("nav-open", isOpen);
      navIcon.innerHTML = isOpen ? "&times;" : "&#9776;";
    });
    if (navClose) {
      navClose.addEventListener("click", closeMenu);
    }
    // Optional: close overlay when clicking a menu item
    navOverlay.addEventListener("click", (e) => {
      if (e.target.classList.contains("w3-bar-item")) {
        closeMenu();
      }
    });
  }
});
