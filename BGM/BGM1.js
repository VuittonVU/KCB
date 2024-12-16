const musicPlayer = document.getElementById('background-music');
const muteBtn = document.getElementById('mute');
const menuButton = document.getElementById('menu-button');
const dropdownContent = document.getElementById('dropdown-content');

const tracks = [
    "BGM/BGM1.mp3",
    "BGM/BGM2.mp3",
    "BGM/BGM3.mp3",
    "BGM/BGM4.mp3",
    "BGM/BGM5.mp3"
];

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
        dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
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
