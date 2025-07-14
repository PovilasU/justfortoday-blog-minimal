---
layout: layout.njk
title: 📝 Savistaba
permalink: /reflection/
---

<section>
      <!-- <h2></h2> -->
      <form id="reflection-form" style="max-width: 400px; margin: auto">
        <div style="margin-bottom: 1em">
          <label for="reflection-input"
            ><strong>Ant ko esu pykęs?</strong></label
          ><br />
          <input
            id="reflection-input"
            type="text"
            placeholder="pvz., ant savęs"
            style="width: 90%; margin: 0 auto; display: block"
          />
        </div>
        <div style="margin-bottom: 1em">
          <label for="notes-input"><strong>Kas įvyko?</strong></label
          ><br />
          <textarea
            id="notes-input"
            placeholder="Kas iš tikrųjų nutiko?"
            style="width: 100%; min-height: 20px; resize: vertical"
          ></textarea>
        </div>
        <div style="margin-bottom: 1em">
          <label for="defects-input"
            ><strong>Charakterio trūkumai</strong></label
          ><br />
          <textarea
            id="defects-input"
            placeholder="Kokie charakterio trūkumai man turėjo įtakos?"
            style="width: 100%; min-height: 20px; resize: vertical"
          ></textarea>
        </div>
        <button type="submit" class="add-btn">Pridėti</button>
        <button type="button" class="clear-btn">Išvalyti</button>
      </form>
      <ul id="reflection-list"></ul>
    </section>
    <script>
      const form = document.getElementById("reflection-form");
      const list = document.getElementById("reflection-list");
      const reflectionInput = document.getElementById("reflection-input");
      const notesInput = document.getElementById("notes-input");
      const defectsInput = document.getElementById("defects-input");
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        const reflection = reflectionInput.value.trim();
        const notes = notesInput.value.trim();
        const defects = defectsInput.value.trim();
        if (reflection || notes || defects) {
          const li = document.createElement("li");
          li.textContent = `Apmąstymas: ${reflection} | Pastabos: ${notes} | Trūkumai: ${defects}`;
          list.appendChild(li);
          reflectionInput.value = "";
          notesInput.value = "";
          defectsInput.value = "";
        }
      });
      form.querySelector(".clear-btn").addEventListener("click", function () {
        reflectionInput.value = "";
        notesInput.value = "";
        defectsInput.value = "";
      });
    </script>
