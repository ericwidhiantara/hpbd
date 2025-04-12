// Flip the birthday card on click
document.querySelector(".card").addEventListener("click", function () {
  this.classList.toggle("flipped");
});

// Play/pause background music with soft start
const music = document.getElementById("birthdayMusic");
const musicButton = document.getElementById("musicButton");

music.volume = 0.5; // Start at 50% volume for a softer feel

// Attempt to autoplay the music
music
  .play()
  .then(() => {
    musicButton.textContent = "🔇"; // Show mute icon if playing
  })
  .catch(() => {
    console.log("Autoplay was prevented."); // Log if autoplay fails
  });

// Toggle music on button click
musicButton.addEventListener("click", function () {
  if (music.paused) {
    music.play();
    musicButton.textContent = "🔇"; // Show mute icon when playing
  } else {
    music.pause();
    musicButton.textContent = "🎵"; // Show play icon when paused
  }
});
