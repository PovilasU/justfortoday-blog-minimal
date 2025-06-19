// menu.js
document.addEventListener("DOMContentLoaded", () => {
  const nav = document.createElement("nav");
  nav.innerHTML = `
    <ul>
      <li><a href="index.html">Home</a></li>
      <li><a href="about.html">About</a></li>
    </ul>
  `;
  nav.style.padding = "1em";
  nav.style.background = "#f0f0f0";
  nav.style.marginBottom = "1em";
  document.body.prepend(nav);
});
