document.addEventListener("DOMContentLoaded", () => {
  const nav = document.createElement("nav");
  nav.innerHTML = `
    <button class="nav-toggle" aria-label="Toggle navigation" aria-expanded="false">
      &#9776;
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
  });

  // Add responsive styles
  const style = document.createElement("style");
  style.textContent = `
    nav {
      width: 100%;
      background: #f0f0f0;
      margin-bottom: 1em;
      position: relative;
    }
    .nav-toggle {
      display: none;
      background: none;
      border: none;
      font-size: 2em;
      position: absolute;
      top: 0.5em;
      right: 1em;
      z-index: 2;
      color: #333;
      cursor: pointer;
    }
    .main-nav {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      padding: 0.5em 0;
      margin: 0;
      list-style: none;
      gap: 0.5em;
      transition: max-height 0.3s;
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
    display: none;
    flex-direction: column;
    gap: 0;
    max-height: none;
    overflow: visible;
  }
  .main-nav.nav-open {
    display: flex;
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
}
    @media (prefers-color-scheme: dark) {
      nav {
        background: #222;
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
      .nav-toggle {
        color: #eee;
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
