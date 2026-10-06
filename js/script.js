// --- 1. Opening Invitation Logic ---
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

const audio = document.getElementById('bg-music');
audio.play().catch(e => console.log("Audio play prevented by browser policy"));
}

// --- 2. Music Toggle Logic ---
function toggleMusic() {
const audio = document.getElementById('bg-music');
const icon = document.getElementById('music-icon');

if (audio.paused) {
    audio.play();
    icon.classList.remove('ph-speaker-x');
    icon.classList.add('ph-speaker-high', 'animate-pulse');
} else {
    audio.pause();
    icon.classList.remove('ph-speaker-high', 'animate-pulse');
    icon.classList.add('ph-speaker-x');
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

// --- 5. RSVP Form Logic (No Alert) ---
function submitRSVP(e) {
e.preventDefault();
// In a real app, here you would send data to a backend via fetch()

// Show custom notification modal
const modal = document.getElementById('notification-modal');
const content = document.getElementById('notification-content');

modal.classList.remove('opacity-0', 'pointer-events-none');
content.classList.remove('scale-90');
content.classList.add('scale-100');

// Reset form
document.getElementById('rsvp-form').reset();
}

function closeNotification() {
const modal = document.getElementById('notification-modal');
const content = document.getElementById('notification-content');

content.classList.remove('scale-100');
content.classList.add('scale-90');
modal.classList.add('opacity-0', 'pointer-events-none');
}