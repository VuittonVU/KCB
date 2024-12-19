const musicPlayer = document.getElementById('background-music');
const muteBtn = document.getElementById('mute');
const menuButton = document.getElementById('menu-button');

const tracks = ["BGM/BGM.mp3",];

let currentTrackIndex = 0;
let isMuted = false; 

function playRandomTrack() {
    const randomIndex = Math.floor(Math.random() * tracks.length);
    currentTrackIndex = randomIndex; 
    musicPlayer.src = tracks[currentTrackIndex];
    musicPlayer.play();
    muteBtn.textContent = 'Mute';
}

if (menuButton) {
    menuButton.addEventListener('click', () => {
        playRandomTrack();
    });
}

if (muteBtn) {
    muteBtn.addEventListener('click', () => {
        if (isMuted) {
            musicPlayer.play();
            muteBtn.textContent = 'Mute';
        } else {
            musicPlayer.pause();
            muteBtn.textContent = 'Unmute';
        }
        isMuted = !isMuted;
    });
}

// Click sound
const clickSound = document.getElementById("click-sound");
if (clickSound) {
    document.addEventListener("click", () => {
        clickSound.currentTime = 0;
        clickSound.play();
    });
}
