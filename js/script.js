// --- 1. Opening Invitation Logic ---
const MUSIC_VOLUME = 0.5;
let musicShouldPlay = false;
let musicPlayRequest = 0;

function playMusic() {
    const audio = document.getElementById('bg-music');
    const request = ++musicPlayRequest;
    musicShouldPlay = true;
    audio.volume = MUSIC_VOLUME;
    updateMusicButtonLoading(true);

    audio.play().then(() => {
        if (request === musicPlayRequest && musicShouldPlay) {
            updateMusicButton(true);
        } else {
            audio.pause();
        }
    }).catch(error => {
        if (request === musicPlayRequest) {
            musicShouldPlay = false;
            updateMusicButton(false);
        }
        console.error("Music playback failed:", error);
    });
}

function pauseMusic() {
    const audio = document.getElementById('bg-music');
    musicShouldPlay = false;
    musicPlayRequest++;
    audio.pause();
    updateMusicButton(false);
}

function updateMusicButton(isPlaying) {
    const icon = document.getElementById('music-icon');
    const musicBtn = document.getElementById('music-btn');
    // clear loading state if any
    updateMusicButtonLoading(false);

    icon.classList.toggle('ph-speaker-high', isPlaying);
    icon.classList.toggle('animate-pulse', isPlaying);
    icon.classList.toggle('ph-speaker-x', !isPlaying);
    musicBtn.setAttribute('aria-pressed', isPlaying ? 'true' : 'false');
}

function updateMusicButtonLoading(isLoading) {
    const icon = document.getElementById('music-icon');
    const musicBtn = document.getElementById('music-btn');
    if (!icon || !musicBtn) return;

    if (isLoading) {
        // show spinner icon and subtle opacity to indicate loading
        icon.classList.remove('ph-speaker-high', 'ph-speaker-x', 'animate-pulse');
        icon.classList.add('ph-spinner', 'animate-spin');
        musicBtn.classList.add('opacity-80');
        musicBtn.setAttribute('aria-busy', 'true');
    } else {
        icon.classList.remove('ph-spinner', 'animate-spin');
        musicBtn.classList.remove('opacity-80');
        musicBtn.removeAttribute('aria-busy');
    }

}

const backgroundMusic = document.getElementById('bg-music');
backgroundMusic.addEventListener('playing', () => {
    if (musicShouldPlay) {
        updateMusicButton(true);
    }
});
backgroundMusic.addEventListener('waiting', () => {
    if (musicShouldPlay) {
        updateMusicButtonLoading(true);
    }
});
backgroundMusic.addEventListener('error', () => {
    if (musicShouldPlay) {
        musicShouldPlay = false;
        updateMusicButton(false);
    }
    console.error("Background music failed to load:", backgroundMusic.error);
});

function openInvitation() {
// Slide up cover
const cover = document.getElementById('welcome-screen');
cover.classList.add('-translate-y-full');

// Allow scrolling
document.body.classList.remove('overflow-hidden');

// Fade in main content
const mainContent = document.getElementById('main-content');
mainContent.classList.remove('opacity-0');

// Play music & show button
const musicBtn = document.getElementById('music-btn');
musicBtn.classList.remove('hidden');
musicBtn.classList.add('flex');

playMusic();
}

// --- 2. Music Toggle Logic ---
function toggleMusic() {
if (!musicShouldPlay) {
    playMusic();
} else {
    pauseMusic();
}
}

// --- 3. Scroll Reveal Animation Logic ---
function reveal() {
var reveals = document.querySelectorAll(".reveal");
for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 100; // threshold

    if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
    }
}
}
window.addEventListener("scroll", reveal);
// Trigger once on load in case elements are already in viewport
reveal();

// --- 4. Countdown Timer Logic ---
// Set the date we're counting down to (e.g., Sep 10, 2026)
const countDownDate = new Date("Oct 10, 2026 03:00:00").getTime();

const countdownTimer = setInterval(function() {
const now = new Date().getTime();
const distance = countDownDate - now;

// Time calculations
const days = Math.floor(distance / (1000 * 60 * 60 * 24));
const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
const seconds = Math.floor((distance % (1000 * 60)) / 1000);

// Display results, padded with zero if < 10
document.getElementById("days").innerHTML = days < 10 ? "0" + days : days;
document.getElementById("hours").innerHTML = hours < 10 ? "0" + hours : hours;
document.getElementById("minutes").innerHTML = minutes < 10 ? "0" + minutes : minutes;
document.getElementById("seconds").innerHTML = seconds < 10 ? "0" + seconds : seconds;

// If countdown finished
if (distance < 0) {
    clearInterval(countdownTimer);
    document.getElementById("days").innerHTML = "00";
    document.getElementById("hours").innerHTML = "00";
    document.getElementById("minutes").innerHTML = "00";
    document.getElementById("seconds").innerHTML = "00";
}
}, 1000);
