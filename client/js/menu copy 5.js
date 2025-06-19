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
    <div id="navDropdown" class="w3-bar-block w3-theme w3-hide w3-hide-large w3-hide-medium">
      <a href="about.html" class="w3-bar-item w3-button">About</a>
      <a href="about.html" class="w3-bar-item w3-button">todo</a>
      <a href="about.html" class="w3-bar-item w3-button">Media</a>
      <a href="about.html" class="w3-bar-item w3-button">Meditation</a>
      <a href="about.html" class="w3-bar-item w3-button">Stuff</a>
      <a href="about.html" class="w3-bar-item w3-button">Day Reflection</a>
    </div>
  `;
  document.body.prepend(nav);

  // Add W3Schools-like styles
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
    .w3-bar .w3-bar-item:hover, .w3-bar-block .w3-bar-item:hover {
      background-color: #04AA6D;
      color: white;
    }
    .w3-bar .w3-right {
      float: right !important;
    }
    .w3-bar-block {
      display: none;
      background-color: #282A35;
    }
    .w3-bar-block .w3-bar-item {
      float: none;
      display: block;
      text-align: left;
      padding-left: 32px;
      border-bottom: 1px solid #222;
    }
    .w3-theme {
      background-color: #282A35 !important;
      color: #f1f1f1 !important;
    }
    .w3-hide {
      display: none !important;
    }
    .w3-mobile {
      display: block;
      width: auto;
      float: none;
    }
    @media (max-width: 800px) {
      .w3-bar .w3-bar-item:not(.logo-link):not(.w3-right) {
        display: none;
      }
      .w3-bar .w3-right {
        display: block !important;
      }
      .w3-bar-block {
        display: none;
      }
      .w3-bar-block.w3-show {
        display: block !important;
      }
    }
    @media (min-width: 801px) {
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
  `;
  document.head.appendChild(style);

  // Toggle dropdown menu and icon on mobile
  const navToggle = document.getElementById("navToggle");
  const navDropdown = document.getElementById("navDropdown");
  const navIcon = document.getElementById("navIcon");
  if (navToggle && navDropdown && navIcon) {
    navToggle.addEventListener("click", () => {
      navDropdown.classList.toggle("w3-show");
      // Toggle icon between hamburger and X
      if (navDropdown.classList.contains("w3-show")) {
        navIcon.innerHTML = "&times;";
      } else {
        navIcon.innerHTML = "&#9776;";
      }
    });
  }
});
