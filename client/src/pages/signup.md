---
layout: layout.njk
title: Registracija
permalink: /signup/
---

    <form action="/signup" method="POST">
      <label for="name">Vardas:</label>
      <input type="text" id="name" name="name" required />

      <label for="email">El. paštas:</label>
      <input type="email" id="email" name="email" required />

      <label for="password">Slaptažodis:</label>
      <input type="password" id="password" name="password" required />

      <button type="submit">Registruotis</button>
    </form>

    <p>Jau turite paskyrą? <a href="login.html">Prisijunkite čia</a></p>
