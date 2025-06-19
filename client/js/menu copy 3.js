document.addEventListener("DOMContentLoaded", () => {
  const nav = document.createElement("nav");
  nav.innerHTML = `
    <button class="nav-toggle" aria-label="Toggle navigation" aria-expanded="false">
      <span class="burger"></span>
    </button>
    <ul class="main-nav">
      <li><a href="index.html">Home</a></li>
      <li><a href="about.html">About</a></li>
      <li><a href="about.html">todo</a></li>
      <li><a href="about.html">Media</a></li>
      <li><a href="about.html">Meditation</a></li>
      <li><a href="about.html">Stuff</a></li>
      <li><a href="about.html">Day Reflection</a></li>
    </ul>
  `;
  document.body.prepend(nav);

  // Toggle menu on mobile
  const toggle = nav.querySelector(".nav-toggle");
  const menu = nav.querySelector(".main-nav");
  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", !expanded);
    menu.classList.toggle("nav-open");
    toggle.classList.toggle("open");
  });

  // Add responsive styles
  const style = document.createElement("style");
  style.textContent = `
    nav {
      width: 100%;
      background: #f0f0f0;
      margin-bottom: 1em;
      position: relative;
      z-index: 100;
    }
    .nav-toggle {
      display: none;
      background: none;
      border: none;
      font-size: 2em;
      position: fixed;
      top: 1em;
      right: 1em;
      z-index: 102;
      cursor: pointer;
      width: 2em;
      height: 2em;
      padding: 0;
    }
    .burger, .burger::before, .burger::after {
      display: block;
      background: #333;
      height: 3px;
      width: 28px;
      border-radius: 2px;
      position: absolute;
      left: 0;
      transition: all 0.3s;
      content: '';
    }
    .burger {
      position: relative;
      top: 13px;
    }
    .burger::before {
      content: '';
      position: absolute;
      top: -10px;
    }
    .burger::after {
      content: '';
      position: absolute;
      top: 10px;
    }
    .nav-toggle.open .burger {
      background: transparent;
    }
    .nav-toggle.open .burger::before {
      transform: rotate(45deg) translate(5px, 5px);
      top: 0;
    }
    .nav-toggle.open .burger::after {
      transform: rotate(-45deg) translate(5px, -5px);
      top: 0;
    }
    .main-nav {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      padding: 0.5em 0;
      margin: 0;
      list-style: none;
      gap: 0.5em;
      transition: none;
    }
    .main-nav li {
      flex: 1 1 100px;
      text-align: center;
    }
    .main-nav a {
      display: block;
      padding: 0.5em 1em;
      text-decoration: none;
      color: #333;
      border-radius: 4px;
      transition: background 0.2s;
    }
    .main-nav a:hover {
      background: #e0e0e0;
    }
    @media (max-width: 600px) {
      .nav-toggle {
        display: block;
      }
      .main-nav {
        flex-direction: column;
        gap: 0;
        position: fixed;
        top: 0;
        right: 0;
        height: 100vh;
        width: 70vw;
        max-width: 320px;
        background: #f0f0f0;
        box-shadow: -2px 0 8px rgba(0,0,0,0.1);
        transform: translateX(100%);
        transition: transform 0.3s cubic-bezier(.4,0,.2,1);
        overflow-y: auto;
        z-index: 101;
        padding-top: 3em;
        margin: 0;
        border-radius: 0 0 0 0;
      }
      .main-nav.nav-open {
        transform: translateX(0);
      }
      .main-nav li {
        flex: 1 1 auto;
      }
      .main-nav a {
        padding: 1em;
        border-bottom: 1px solid #ddd;
      }
      .main-nav li:last-child a {
        border-bottom: none;
      }
      body {
        overflow-x: hidden;
      }
    }
    @media (prefers-color-scheme: dark) {
      nav {
        background: #222;
      }
      .main-nav {
        background: #222;
        box-shadow: -2px 0 8px rgba(0,0,0,0.4);
      }
      .main-nav a {
        color: #eee;
        background: transparent;
      }
      .main-nav a:hover {
        background: #333;
      }
      .main-nav a:active {
        background: #444;
      }
      .nav-toggle .burger, .nav-toggle .burger::before, .nav-toggle .burger::after {
        background: #eee;
      }
      @media (max-width: 600px) {
        .main-nav a {
          border-bottom: 1px solid #444;
        }
      }
    }
  `;
  document.head.appendChild(style);
});
