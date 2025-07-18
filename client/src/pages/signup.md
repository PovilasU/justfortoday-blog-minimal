---
layout: layout.njk
title: Registracija
permalink: /signup/
---

<h2>Registracija</h2>

<form id="signup-form">
  <label for="username">Vartotojo vardas:</label><br/>
  <input type="text" id="username" name="username" required /><br/>

<label for="password">Slaptažodis:</label><br/>
<input type="password" id="password" name="password" required /><br/>

<button type="submit">Registruotis</button>

</form>

<div id="signup-message" style="color:red; margin-top:1rem;"></div>

<script>
  document.getElementById("signup-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      if (res.ok) {
        document.getElementById("signup-message").style.color = "green";
        document.getElementById("signup-message").textContent = "Registracija sėkminga! Dabar galite prisijungti.";
        e.target.reset();
      } else {
        const text = await res.text();
        document.getElementById("signup-message").textContent = text || "Klaida registruojantis";
      }
    } catch (err) {
      document.getElementById("signup-message").textContent = "Tinklo klaida";
    }
  });
</script>
