// --- 1. Opening Invitation Logic ---
const MUSIC_VOLUME = 0.5;
const MUSIC_FADE_DURATION = 1200;
let musicShouldPlay = false;
let musicFadeFrame;
let musicPlayRequest = 0;

function fadeMusicTo(audio, targetVolume) {
    cancelAnimationFrame(musicFadeFrame);

    const startVolume = audio.volume;
    const startTime = performance.now();

    function step(currentTime) {
        const progress = Math.min((currentTime - startTime) / MUSIC_FADE_DURATION, 1);
        audio.volume = startVolume + (targetVolume - startVolume) * progress;

        if (progress < 1) {
            musicFadeFrame = requestAnimationFrame(step);
        } else if (targetVolume === 0 && !musicShouldPlay) {
            audio.pause();
        }
    }

    musicFadeFrame = requestAnimationFrame(step);
}

function playMusic() {
    const audio = document.getElementById('bg-music');
    const request = ++musicPlayRequest;
    musicShouldPlay = true;

    audio.play()
        .then(() => {
            if (request !== musicPlayRequest) {
                if (!musicShouldPlay) {
                    audio.pause();
                }
                return;
            }

            if (musicShouldPlay) {
                fadeMusicTo(audio, MUSIC_VOLUME);
            } else {
                audio.pause();
            }
        })
        .catch(error => {
            if (request === musicPlayRequest && musicShouldPlay) {
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
    updateMusicButton(false);
    fadeMusicTo(audio, 0);
}

document.getElementById('bg-music').volume = 0;

function updateMusicButton(isPlaying) {
    const icon = document.getElementById('music-icon');
    icon.classList.toggle('ph-speaker-high', isPlaying);
    icon.classList.toggle('animate-pulse', isPlaying);
    icon.classList.toggle('ph-speaker-x', !isPlaying);
}

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
