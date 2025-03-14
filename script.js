// script.js
const sentences = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing fast requires practice and patience.",
  "JavaScript makes web pages interactive and fun.",
  "Coding is like solving a puzzle with logic."
];
let startTime;
let timerInterval;
const sentenceElement = document.getElementById("sentence");
const inputElement = document.getElementById("input-text");
const timerElement = document.getElementById("timer");
const speedElement = document.getElementById("speed-percentage");
const worldRecordSpeed = 216; // Words per minute (WPM)

function startGame() {
  const randomIndex = Math.floor(Math.random() * sentences.length);
  sentenceElement.textContent = sentences[randomIndex];
  inputElement.value = "";
  inputElement.focus();
  inputElement.classList.remove("error");
  startTime = null;
  timerElement.textContent = "Time: 0s";
  speedElement.textContent = "Speed: 0%";
  clearInterval(timerInterval);
  inputElement.addEventListener("input", checkTyping);
}

function checkTyping() {
  if (!startTime) {
      startTime = new Date();
      timerInterval = setInterval(updateTimer, 100);
  }
  const expectedText = sentenceElement.textContent;
  const userText = inputElement.value;
  
  if (expectedText.startsWith(userText)) {
      inputElement.classList.remove("error");
  } else {
      inputElement.classList.add("error");
      return; // Prevent further typing if incorrect
  }
  
  if (userText === expectedText) {
      clearInterval(timerInterval);
      calculateSpeed();
      alert("Well done! You finished in " + timerElement.textContent);
  }
}

function updateTimer() {
  const elapsedTime = ((new Date() - startTime) / 1000).toFixed(1);
  timerElement.textContent = "Time: " + elapsedTime + "s";
}

function calculateSpeed() {
  const elapsedTime = (new Date() - startTime) / 1000 / 60; // Convert to minutes
  const wordsTyped = sentenceElement.textContent.split(" ").length;
  const userSpeed = wordsTyped / elapsedTime; // Words per minute (WPM)
  const speedPercentage = ((userSpeed / worldRecordSpeed) * 100).toFixed(2);
  speedElement.textContent = "Speed: " + speedPercentage + "% of world record";
}

function restartGame() {
  startGame();
}

startGame();