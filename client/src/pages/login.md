---
layout: layout.njk
title: Prisijungimas
permalink: /login/
---

<h2>Prisijungimas</h2>

<form id="login-form">
  <label for="username">Vartotojo vardas:</label><br/>
  <input type="text" id="username" name="username" required /><br/>

<label for="password">Slaptažodis:</label><br/>
<input type="password" id="password" name="password" required /><br/>

<button type="submit">Prisijungti</button>

</form>

<div id="login-message" style="color:red; margin-top:1rem;"></div>

<script>
  document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      if (res.ok) {
        // Redirect on successful login (to homepage or profile)
        window.location.href = "/";
      } else {
        const text = await res.text();
        document.getElementById("login-message").textContent = text || "Klaida prisijungiant";
      }
    } catch (err) {
      document.getElementById("login-message").textContent = "Tinklo klaida";
    }
  });
</script>
