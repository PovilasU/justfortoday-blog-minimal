---
layout: layout.njk
title: Medijų biblioteka
permalink: /media/
---

<style>
  .media-section {
    max-width: 600px;
    margin: 2em auto;
    border-radius: 10px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
    padding: 2em 1.5em 1.5em 1.5em;
    background: var(--background, #fff);
  }
  .media-section h1 {
    text-align: center;
    color: #04aa6d;
    margin-bottom: 0.5em;
  }
  .media-section h3 {
    margin-top: 2em;
    color: #04aa6d;
    border-bottom: 2px solid #04aa6d;
    padding-bottom: 0.3em;
  }
  .media-section h5 {
    margin-top: 1.5em;
    color: #282a35;
    font-size: 1.2em;
  }
  .media-section p {
    color: var(--text, #444);
    line-height: 1.6;
  }
  .media-list {
    list-style: none;
    padding: 0;
    margin: 1em 0;
  }
  .media-list li {
    background: var(--surface, #f7f7f7);
    border-radius: 6px;
    margin-bottom: 0.5em;
    padding: 0.7em 1em;
    display: flex;
    align-items: center;
    transition: background 0.2s;
  }
  .media-list li:hover {
    background: #e8f5ef;
  }
  .media-checkbox {
    margin-right: 1em;
    accent-color: #04aa6d;
    width: 1.2em;
    height: 1.2em;
  }
  .media-list label {
    cursor: pointer;
    flex: 1;
    display: flex;
    align-items: center;
  }
  .media-list a {
    color: #04aa6d;
    font-weight: 500;
    text-decoration: none;
    margin-left: 0.5em;
    transition: color 0.2s;
  }
  .media-list a:hover {
    text-decoration: underline;
    color: #028a57;
  }
  .media-progress {
    text-align: right;
    font-size: 0.95em;
    color: #666;
    margin-bottom: 1em;
  }
  @media (max-width: 700px) {
    .media-section {
      padding: 1em 0.5em;
    }
  }
  @media (prefers-color-scheme: dark) {
    .media-section {
      background: #23272e;
    }
    .media-section h1,
    .media-section h3 {
      color: #7fffd4;
      border-color: #7fffd4;
    }
    .media-section h5 {
      color: #e0e0e0;
    }
    .media-section p,
    .media-progress {
      color: #d0d0d0;
    }
    .media-list li {
      background: #23272e;
    }
    .media-list li:hover {
      background: #183c35;
    }
    .media-list a {
      color: #7fffd4;
    }
    .media-list a:hover {
      color: #04aa6d;
    }
  }
</style>

<div class="media-section">
  <!-- <h1>Medijų biblioteka</h1> -->
  <p>
    Žemiau rasite nuorodas į audioknygas ir kitą naudingą medžiagą.
    Klausykitės ir sekite savo pažangą pažymėdami perklausytas dalis.
  </p>

  <h3>📚 Nikodemas Agiorietis – „Nematoma kova“</h3>
  <p>
    Audioknyga iš „Marijos radijo“ svetainės. Klausykite dalis iš eilės ir
    pažymėkite perklausytas.
  </p>
  <div class="media-progress" id="media-progress-nematoma"></div>
  <ul id="media-list-nematoma" class="media-list"></ul>

  <p>
    <small>
      Šaltinis:
      <a
        href="https://www.marijosradijas.lt"
        target="_blank"
        rel="noopener noreferrer"
      >
        marijosradijas.lt</a
      >. Visos teisės priklauso Marijos radijui. Čia pateiktos tik nuorodos –
      vartotojo patogumui. Turinys nėra kopijuojamas ar talpinamas vietoje.
    </small>
  </p>
</div>

<script>
  const nematomaKovaRecordings = [
    276761, 276758, 276496, 276406, 276400, 276395, 276373, 276384, 274421,
    274375, 274372, 275383, 273932, 273886, 273883, 273874, 273567, 273397,
    273394, 273385, 273078, 274706, 274773, 274937, 275011, 272589, 272465,
    272419, 272416, 272407, 271976, 271930, 271927, 271918, 271611, 270980,
    270931, 270928, 270919, 270612, 274577, 270446, 270443, 270434, 270127,
    270010, 269961, 269949, 269642, 269525, 269473, 269464, 269157, 269040,
    268991, 268988, 268979, 268672, 268555, 268506,
  ].reverse();

  const STORAGE_KEY_NEMATOMA = "nematoma-kova-checked";
  let checkedNematoma = {};

  try {
    const saved = localStorage.getItem(STORAGE_KEY_NEMATOMA);
    if (saved) checkedNematoma = JSON.parse(saved);
  } catch {}

  function saveCheckedNematoma() {
    localStorage.setItem(
      STORAGE_KEY_NEMATOMA,
      JSON.stringify(checkedNematoma)
    );
  }

  function updateProgressNematoma() {
    const total = nematomaKovaRecordings.length;
    const done = nematomaKovaRecordings.filter((id) => checkedNematoma[id])
      .length;
    const percent = total === 0 ? 100 : Math.round((done / total) * 100);
    document.getElementById("media-progress-nematoma").textContent = `Progresas: ${done} iš ${total} (${percent}%)`;
  }

  const listNematoma = document.getElementById("media-list-nematoma");
  listNematoma.innerHTML = "";
  nematomaKovaRecordings.forEach((id, index) => {
    const li = document.createElement("li");
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "media-checkbox";
    checkbox.checked = !!checkedNematoma[id];
    checkbox.addEventListener("change", () => {
      checkedNematoma[id] = checkbox.checked;
      saveCheckedNematoma();
      updateProgressNematoma();
    });
    label.appendChild(checkbox);
    const link = document.createElement("a");
    link.href = `https://www.marijosradijas.lt/transliacijos/${id}-muzika-ir-skaitiniai.html`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = `${index + 1} dalis`;
    label.appendChild(link);
    li.appendChild(label);
    listNematoma.appendChild(li);
  });

  updateProgressNematoma();
</script>
