---
layout: layout.njk
title: Dienos planas
permalink: /todo/
---

<p>
  Tiesiog šiandien skirk šiek tiek laiko savo dienos planavimui. Aiškūs
  tikslai ir užduočių sąrašas padės išlaikyti dėmesį, sumažinti stresą ir
  žingsnis po žingsnio siekti savo tikslų. Atmink – kiekviena diena yra
  galimybė augti ir tobulėti.
</p>

<section>
  <h2>📝 Paprastas darbų sąrašas</h2>
  <form id="todo-form" style="max-width: 400px; margin: auto">
    <input
      id="todo-input"
      type="text"
      placeholder="Įrašyk naują užduotį..."
      style="width: 70%"
      required
    />
    <button type="submit">Pridėti</button>
  </form>
  <ul
    id="todo-list"
    style="max-width: 400px; margin: auto; list-style: none; padding: 0"
  ></ul>
  <div
    id="todo-progress"
    style="max-width: 400px; margin: auto; margin-top: 1em; font-weight: bold"
  ></div>
</section>

<script>
  const form = document.getElementById("todo-form");
  const input = document.getElementById("todo-input");
  const list = document.getElementById("todo-list");
  const progress = document.getElementById("todo-progress");
  const STORAGE_KEY = "todo-app-justfortoday";
  const DATE_KEY = "todo-app-date";
  let todos = [];

  function todayStr() {
    const d = new Date();
    return d.toISOString().slice(0, 10);
  }

  function loadTodos() {
    const savedDate = localStorage.getItem(DATE_KEY);
    const today = todayStr();
    if (savedDate !== today) {
      localStorage.setItem(DATE_KEY, today);
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
      return [];
    }
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  }

  function saveTodos() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    localStorage.setItem(DATE_KEY, todayStr());
  }

  function updateList() {
    list.innerHTML = "";
    let completed = 0;
    todos.forEach((todo, idx) => {
      const li = document.createElement("li");
      li.style.display = "flex";
      li.style.alignItems = "center";
      li.style.margin = "0.5em 0";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = todo.done;
      checkbox.style.marginRight = "0.5em";
      checkbox.addEventListener("change", () => {
        todos[idx].done = checkbox.checked;
        saveTodos();
        updateList();
      });

      const span = document.createElement("span");
      span.textContent = todo.text;
      if (todo.done) {
        span.style.textDecoration = "line-through";
        completed++;
      }

      const del = document.createElement("button");
      del.textContent = "✕";
      del.style.marginLeft = "auto";
      del.addEventListener("click", () => {
        todos.splice(idx, 1);
        saveTodos();
        updateList();
      });

      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(del);
      list.appendChild(li);
    });

    const total = todos.length;
    const percent = total === 0 ? 100 : Math.round((completed / total) * 100);
    progress.textContent =
      total === 0
        ? "Visos užduotys atliktos! 🎉"
        : `${completed} atlikta, ${total - completed} liko (${percent}%)`;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (text) {
      todos.push({ text, done: false });
      input.value = "";
      saveTodos();
      updateList();
    }
  });

  // Inicializacija
  todos = loadTodos();
  updateList();
</script>
