// Music Handling
const music = document.getElementById("birthdayMusic");
const musicButton = document.getElementById("musicButton");
let audioEnabled = false;

// Initialize music settings
music.volume = 0.5;

function enableAudio() {
  if (!audioEnabled) {
    music
      .play()
      .then(() => {
        audioEnabled = true;
        musicButton.textContent = "🔊";
      })
      .catch((error) => {
        showMusicPrompt();
      });
  }
}

function showMusicPrompt() {
  const prompt = document.createElement("div");
  prompt.className = "music-prompt";
  prompt.innerHTML = `<p>Click anywhere to enable music! 🎶</p>`;
  document.body.appendChild(prompt);

  document.body.addEventListener(
    "click",
    () => {
      prompt.remove();
      enableAudio();
    },
    { once: true }
  );
}

// Check for previous interaction
document.addEventListener("DOMContentLoaded", () => {
  if (sessionStorage.getItem("userInteracted")) {
    enableAudio();
    sessionStorage.removeItem("userInteracted");
  }
});

// Music Controls
musicButton.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    musicButton.textContent = "🔊";
  } else {
    music.pause();
    musicButton.textContent = "🔇";
  }
});

document.getElementById("volumeSlider").addEventListener("input", (e) => {
  music.volume = e.target.value;
});

// Interactive Elements
document.querySelector(".card").addEventListener("click", function () {
  this.classList.toggle("flipped");
  shootConfetti();
});

function shootConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
}

// Lightbox Functionality
document.querySelectorAll(".photos img").forEach((img) => {
  img.addEventListener("click", () => {
    document.getElementById("lightbox").style.display = "block";
    document.getElementById("lightboxImg").src = img.src;
  });
});

document.querySelector(".close").addEventListener("click", () => {
  document.getElementById("lightbox").style.display = "none";
});

// Message Board
function addMessage() {
  const input = document.getElementById("messageInput");
  const messageText = input.value.trim();

  if (messageText) {
    const message = document.createElement("div");
    message.className = "wish-message";
    message.innerHTML = `
            <p>${messageText}</p>
            <small>${new Date().toLocaleTimeString()}</small>
        `;
    document.getElementById("wishesContainer").prepend(message);
    input.value = "";
    localStorage.setItem(
      "birthdayWishes",
      document.getElementById("wishesContainer").innerHTML
    );
    confetti({ particleCount: 30, spread: 40 });
  } else {
    input.style.animation = "shake 0.4s";
    setTimeout(() => (input.style.animation = ""), 400);
  }
}

// Initialization
window.onload = () => {
  const savedWishes = localStorage.getItem("birthdayWishes");
  if (savedWishes) {
    document.getElementById("wishesContainer").innerHTML = savedWishes;
  }

  // Create interactive balloons
  const colors = ["#ff3366", "#4CAF50", "#2196F3", "#FFEB3B"];
  const balloonContainer = document.querySelector(".balloons");
  for (let i = 0; i < 10; i++) {
    const balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.style.left = Math.random() * 90 + "%";
    balloon.style.backgroundColor = colors[(Math.random() * colors.length) | 0];
    balloon.addEventListener("click", () => {
      balloon.remove();
      new Audio("pop-sound.mp3").play();
      shootConfetti();
    });
    balloonContainer.appendChild(balloon);
  }

  setTimeout(shootConfetti, 1000);
};
