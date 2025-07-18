---
layout: layout.njk
title: Meditacija
permalink: /meditation/
---

<style>
  .timer-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5em;
    margin-bottom: 1em;
  }
  .timer-buttons button {
    flex: 1 1 80px;
    min-width: 80px;
    padding: 0.5em 1em;
    font-size: 1em;
    cursor: pointer;
  }
  .controls {
    margin-top: 1em;
    display: flex;
    gap: 1em;
  }
  .timer-display {
    margin-top: 1em;
    font-size: 1.2em;
    font-weight: bold;
  }
</style>

<p>
  Sveiki atvykę į savo meditacijos erdvę. Pasirinkite laikmatį ir pradėkite
  sesiją.
</p>

<section>
  <h2>Apie meditaciją</h2>
  <p>
    Meditacija yra praktika, padedanti sutelkti mintis, nuraminti protą ir
    susijungti su dabartimi. Reguliari meditacija gali sumažinti stresą,
    pagerinti emocinę savijautą ir padidinti savęs pažinimą. Nesvarbu, ar
    esate pradedantysis, ar jau metų metus praktikuojate, kelių minučių
    kasdienė tyla ir gilus kvėpavimas atneša aiškumo ir ramybės į jūsų
    gyvenimą.
  </p>
  <p>
    Medituoti galima įvairiai – nuo vedamų kvėpavimo pratimų iki minties
    stebėjimo be vertinimo. Svarbiausia rasti patogią poziciją,
    atsipalaiduoti ir būti čia bei dabar. Atminkite, meditacija nėra minties
    sustabdymas, o jų pastebėjimas ir švelnus dėmesio sugrąžinimas į
    kvėpavimą ar pasirinktą tašką.
  </p>
</section>

<section>
  <div class="timer-buttons">
    <button data-min="1">1 min</button>
    <button data-min="3">3 min</button>
    <button data-min="5">5 min</button>
    <button data-min="10">10 min</button>
    <button data-min="15">15 min</button>
    <button data-min="20">20 min</button>
    <button data-min="30">30 min</button>
    <button data-min="45">45 min</button>
    <button data-min="60">60 min</button>
  </div>
  <div class="controls">
    <button id="stop-btn">Stabdyti</button>
    <button id="mute-btn">Išjungti garsą</button>
  </div>
  <div class="timer-display" id="timer-display"></div>

  <audio id="meditation-audio" preload="none">
    <source
      src="https://nextjs-tiksiandien.netlify.app/Indian_Flute_Meditation_Music.mp3"
      type="audio/mpeg"
    />
    Jūsų naršyklė nepalaiko audio elemento.
  </audio>

  <audio id="timer-sound" preload="auto">
    <source
      src="https://cdn.pixabay.com/audio/2022/07/26/audio_124bfae3c3.mp3"
      type="audio/mpeg"
    />
  </audio>
</section>

<script>
  const audio = document.getElementById("meditation-audio");
  const timerSound = document.getElementById("timer-sound");
  const timerDisplay = document.getElementById("timer-display");
  const stopBtn = document.getElementById("stop-btn");
  const muteBtn = document.getElementById("mute-btn");
  let timer = null;
  let remaining = 0;
  let muted = false;

  function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  }

  function startTimer(minutes) {
    clearInterval(timer);
    audio.pause();
    audio.currentTime = 0;
    audio.muted = muted;
    audio.load();
    audio.play();
    remaining = minutes * 60;
    timerDisplay.textContent = `Liko laiko: ${formatTime(remaining)}`;
    timer = setInterval(() => {
      remaining--;
      timerDisplay.textContent = `Liko laiko: ${formatTime(remaining)}`;
      if (remaining <= 0) {
        clearInterval(timer);
        audio.pause();
        audio.currentTime = 0;
        timerDisplay.textContent = "Sesija baigta!";
        timerSound.play();
      }
    }, 1000);
  }

  function stopAll() {
    clearInterval(timer);
    audio.pause();
    audio.currentTime = 0;
    timerDisplay.textContent = "";
  }

  function muteAll() {
    muted = !muted;
    audio.muted = muted;
    muteBtn.textContent = muted ? "Įjungti garsą" : "Išjungti garsą";
  }

  document.querySelectorAll(".timer-buttons button").forEach((btn) => {
    btn.addEventListener("click", () => {
      startTimer(Number(btn.dataset.min));
    });
  });

  stopBtn.addEventListener("click", stopAll);
  muteBtn.addEventListener("click", muteAll);
</script>
