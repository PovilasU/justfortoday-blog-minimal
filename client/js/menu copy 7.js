document.addEventListener("DOMContentLoaded", () => {
  const nav = document.createElement("nav");
  nav.innerHTML = `
    <div class="w3-bar w3-theme">
      <a href="index.html" class="w3-bar-item w3-button w3-mobile logo-link">JustForToday</a>
      <a href="about.html" class="w3-bar-item w3-button w3-mobile">About</a>
      <a href="about.html" class="w3-bar-item w3-button w3-mobile">todo</a>
      <a href="about.html" class="w3-bar-item w3-button w3-mobile">Media</a>
      <a href="about.html" class="w3-bar-item w3-button w3-mobile">Meditation</a>
      <a href="about.html" class="w3-bar-item w3-button w3-mobile">Stuff</a>
      <a href="about.html" class="w3-bar-item w3-button w3-mobile">Day Reflection</a>
      <a href="javascript:void(0);" class="w3-bar-item w3-button w3-right w3-hide-large w3-hide-medium" id="navToggle">
        <span id="navIcon">&#9776;</span>
      </a>
    </div>
    <div id="navOverlay" class="nav-overlay">
      <div class="nav-overlay-content">
        <button class="nav-close" aria-label="Close menu">&times;</button>
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

  // Add styles for overlay menu
  const style = document.createElement("style");
  style.textContent = `
    .w3-bar {
      overflow: hidden;
      background-color: #282A35;
      font-family: Verdana,sans-serif;
      padding: 0;
      margin: 0;
      width: 100%;
    }
    .w3-bar .w3-bar-item {
      float: left;
      display: block;
      color: #f1f1f1;
      text-align: center;
      padding: 14px 16px;
      text-decoration: none;
      font-size: 17px;
      border: none;
      background: none;
      outline: none;
      transition: background 0.2s;
    }
    .w3-bar .logo-link {
      font-weight: bold;
      color: #04AA6D;
      font-size: 20px;
    }
    .w3-bar .w3-bar-item:hover, .nav-overlay-content .w3-bar-item:hover {
      background-color: #04AA6D;
      color: white;
    }
    .w3-bar .w3-right {
      float: right !important;
    }
    .w3-theme {
      background-color: #282A35 !important;
      color: #f1f1f1 !important;
    }
    .w3-mobile {
      display: block;
      width: auto;
      float: none;
    }
    /* Overlay styles */
    .nav-overlay {
      position: fixed;
      top: 0;
      left: 100vw;
      width: 100vw;
      height: 100vh;
      background: rgba(40,42,53,0.98);
      z-index: 9999;
      transition: left 0.4s cubic-bezier(.4,0,.2,1);
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
    }
    .nav-overlay.open {
      left: 0;
      pointer-events: auto;
    }
    .nav-overlay-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 90vw;
      max-width: 400px;
      margin: 0 auto;
      position: relative;
    }
    .nav-overlay-content .nav-close {
      position: absolute;
      top: 1em;
      right: 1em;
      background: none;
      border: none;
      color: #f1f1f1;
      font-size: 2.2em;
      cursor: pointer;
      z-index: 10001;
      line-height: 1;
      padding: 0;
      transition: color 0.2s;
    }
    .nav-overlay-content .nav-close:hover {
      color: #04AA6D;
    }
    .nav-overlay-content .w3-bar-item {
      color: #f1f1f1;
      font-size: 1.2em;
      padding: 0.8em 0;
      background: none;
      border: none;
      width: 100%;
      text-align: center;
      transition: background 0.2s;
      border-bottom: 1px solid #333;
      margin: 0;
    }
    .nav-overlay-content .w3-bar-item:last-child {
      border-bottom: none;
    }
    .nav-overlay-content .w3-bar-item:hover {
      background: #04AA6D;
      color: #fff;
    }
    @media (max-width: 800px) {
      .w3-bar .w3-bar-item:not(.logo-link):not(.w3-right) {
        display: none;
      }
      .w3-bar .w3-right {
        display: block !important;
      }
    }
    @media (min-width: 801px) {
      .nav-overlay {
        display: none !important;
      }
      .w3-bar-block {
        display: none !important;
      }
      .w3-bar .w3-bar-item {
        display: block;
      }
      .w3-bar .w3-right {
        display: none !important;
      }
    }
    body.nav-open {
      overflow: hidden;
    }
  `;
  document.head.appendChild(style);

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
