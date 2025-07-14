---
layout: layout.njk
title: Prisijungimas
permalink: /login/
---

    <form action="/login" method="POST">
      <label for="email">El. paštas:</label>
      <input type="email" id="email" name="email" required />

      <label for="password">Slaptažodis:</label>
      <input type="password" id="password" name="password" required />

      <button type="submit">Prisijungti</button>
    </form>

    <p>Neturite paskyros? <a href="signup.html">Registruokitės čia</a></p>
