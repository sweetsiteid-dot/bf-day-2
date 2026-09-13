/* =====================================================
   BOYFRIEND DAY WEB 2
   A DAY KEPT FOR YOU
   AKBAR × DEANDRA
===================================================== */


/* =====================================================
   CONFIG
===================================================== */

const CORRECT_PIN = "1111";

let enteredPin = "";

let openedMemories = new Set();

let openedFeelings = new Set();

let letterOpened = false;

let gameFinished = false;

let musicPlaying = false;


/* =====================================================
   GAME DATA
===================================================== */

const questions = [

    {
        question:
            "Kalau kita punya waktu kosong, Akbar lebih pilih...",

        options: [
            "Jalan berdua",
            "Rebahan sambil call"
        ],

        correct: 1,

        correctText:
            "Hehe, kamu tahu aku. Yang penting sama kamu."
    },

    {
        question:
            "Kalau Deandra lagi bad mood, Akbar bakal...",

        options: [
            "Nunggu sampai mood-nya baik",
            "Tetap nemenin sampai dia senyum"
        ],

        correct: 1,

        correctText:
            "Nah ini baru benar. Aku nggak tega ninggalin kamu sendirian."
    },

    {
        question:
            "Kalau harus pilih satu untuk seharian...",

        options: [
            "Main game",
            "Ngobrol sama Deandra"
        ],

        correct: 1,

        correctText:
            "Jelas kamu. Game bisa kapan aja, kamu nggak."
    },

    {
        question:
            "Hal kecil dari Deandra yang paling Akbar suka...",

        options: [
            "Cara kamu cerita",
            "Semuanya"
        ],

        correct: 1,

        correctText:
            "Jawaban paling aman sekaligus paling jujur. Semuanya."
    },

    {
        question:
            "Kalau ada satu tempat yang ingin Akbar datangi...",

        options: [
            "Tempat yang belum pernah kita datangi",
            "Tempat mana pun, asal sama kamu"
        ],

        correct: 1,

        correctText:
            "Nah. Sekarang kamu benar-benar tahu jawabannya."
    }

];

let currentQuestion = 0;


/* =====================================================
   ELEMENTS
===================================================== */

const pinScreen =
    document.getElementById("pinScreen");

const pinDisplay =
    document.getElementById("pinDisplay");

const pinHint =
    document.getElementById("pinHint");

const mainContent =
    document.getElementById("mainContent");

const music =
    document.getElementById("music");

const musicButton =
    document.getElementById("musicButton");

const progressCount =
    document.getElementById("progressCount");

const progressFill =
    document.getElementById("progressFill");

const envelope =
    document.getElementById("envelope");

const hiddenLetter =
    document.getElementById("hiddenLetter");

const questionNumber =
    document.getElementById("questionNumber");

const questionText =
    document.getElementById("questionText");

const choiceButtons =
    document.querySelectorAll(".choices button");

const choiceResult =
    document.getElementById("choiceResult");

const nextQuestionButton =
    document.getElementById("nextQuestion");

const choiceGame =
    document.getElementById("choiceGame");

const gameComplete =
    document.getElementById("gameComplete");


/* =====================================================
   PIN
===================================================== */

function enterPin(number) {

    if (enteredPin.length >= 4) {
        return;
    }


    enteredPin += number;

    updatePinDisplay();


    if (enteredPin.length === 4) {

        setTimeout(() => {

            checkPin();

        }, 200);

    }

}


/* =====================================================
   UPDATE PIN DISPLAY
===================================================== */

function updatePinDisplay() {

    const dots =
        pinDisplay.querySelectorAll("span");


    dots.forEach((dot, index) => {

        if (index < enteredPin.length) {

            dot.classList.add("filled");

        } else {

            dot.classList.remove("filled");

        }

    });

}


/* =====================================================
   DELETE PIN
===================================================== */

function deletePin() {

    enteredPin =
        enteredPin.slice(0, -1);

    updatePinDisplay();

    pinHint.classList.remove("error");

}


/* =====================================================
   CHECK PIN
===================================================== */

function checkPin() {

    if (enteredPin === CORRECT_PIN) {

        unlockWebsite();

    } else {

        wrongPin();

    }

}


/* =====================================================
   WRONG PIN
===================================================== */

function wrongPin() {

    pinHint.textContent =
        "wrong numbers — try again";

    pinHint.classList.add("error");


    pinScreen.classList.add("shake");


    setTimeout(() => {

        enteredPin = "";

        updatePinDisplay();

        pinHint.classList.remove("error");

        pinHint.textContent =
            "four little numbers";

    }, 700);

}


/* =====================================================
   UNLOCK WEBSITE
===================================================== */

function unlockWebsite() {

    pinHint.textContent =
        "welcome, deandra ♡";

    pinHint.style.color =
        "#78b9e8";


    setTimeout(() => {

        pinScreen.classList.add("hide");

        mainContent.classList.add("visible");

        musicButton.classList.add("active");


        startMusic();

        createOpeningParticles();


        setTimeout(() => {

            scrollToSection("memorySection");

        }, 900);

    }, 500);

}


/* =====================================================
   MUSIC
===================================================== */

function startMusic() {

    if (!music) return;


    music.volume = 0.35;


    music.play()
        .then(() => {

            musicPlaying = true;

            musicButton.classList.add("playing");

            musicButton.textContent = "♫";

        })
        .catch(() => {

            musicPlaying = false;

            musicButton.textContent = "♪";

        });

}


/* =====================================================
   TOGGLE MUSIC
===================================================== */

function toggleMusic() {

    if (!music) return;


    if (musicPlaying) {

        music.pause();

        musicPlaying = false;

        musicButton.classList.remove("playing");

        musicButton.textContent = "♪";

    } else {

        music.play()
            .then(() => {

                musicPlaying = true;

                musicButton.classList.add("playing");

                musicButton.textContent = "♫";

            })
            .catch(() => {

                console.log(
                    "Music could not be played."
                );

            });

    }

}


/* =====================================================
   SCROLL TO SECTION
===================================================== */

function scrollToSection(id) {

    const section =
        document.getElementById(id);

    if (!section) return;


    section.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

}


/* =====================================================
   MEMORY CARD
===================================================== */

function openMemory(card, number) {

    if (!card.classList.contains("open")) {

        card.classList.add("open");

        openedMemories.add(number);

        updateProgress();

    }

}


/* =====================================================
   FEELING ACCORDION
===================================================== */

function revealFeeling(item) {

    const items =
        document.querySelectorAll(".feeling-item");

    const index =
        Array.from(items).indexOf(item) + 1;


    const wasOpen =
        item.classList.contains("open");


    items.forEach(other => {

        if (other !== item) {

            other.classList.remove("open");

        }

    });


    if (!wasOpen) {

        item.classList.add("open");

        openedFeelings.add(index);

        updateProgress();

    } else {

        item.classList.remove("open");

    }

}


/* =====================================================
   LETTER
===================================================== */

function openLetter() {

    if (letterOpened) return;


    letterOpened = true;


    envelope.classList.add("open");


    setTimeout(() => {

        hiddenLetter.classList.add("show");

        updateProgress();


        setTimeout(() => {

            hiddenLetter.scrollIntoView({

                behavior: "smooth",

                block: "center"

            });

        }, 400);

    }, 650);

}


/* =====================================================
   PROGRESS
===================================================== */

function updateProgress() {

    let completed = 0;


    /*
       Memory dianggap selesai kalau
       minimal 1 memory dibuka
    */

    if (openedMemories.size > 0) {

        completed++;

    }


    /*
       Feelings selesai kalau
       minimal 1 dibuka
    */

    if (openedFeelings.size > 0) {

        completed++;

    }


    /*
       Letter
    */

    if (letterOpened) {

        completed++;

    }


    /*
       Game
    */

    if (gameFinished) {

        completed++;

    }


    progressCount.textContent =
        completed;


    progressFill.style.width =
        (completed / 4 * 100) + "%";

}


/* =====================================================
   GAME
===================================================== */

function loadQuestion() {

    const question =
        questions[currentQuestion];


    questionNumber.textContent =
        String(currentQuestion + 1).padStart(2, "0");


    questionText.textContent =
        question.question;


    choiceButtons.forEach((button, index) => {

        button.classList.remove("selected");

        button.disabled = false;

        button.innerHTML =
            `<span>${index === 0 ? "A" : "B"}</span>
             ${question.options[index]}`;

    });


    choiceResult.textContent = "";

    nextQuestionButton.classList.remove("show");

}


/* =====================================================
   ANSWER
===================================================== */

function answerChoice(selectedIndex) {

    const question =
        questions[currentQuestion];


    choiceButtons.forEach(button => {

        button.classList.remove("selected");

        button.disabled = true;

    });


    choiceButtons[selectedIndex]
        .classList.add("selected");


    if (selectedIndex === question.correct) {

        choiceResult.textContent =
            "♡ " + question.correctText;

    } else {

        choiceResult.textContent =
            "Hehe, hampir. Tapi aku rasa kamu tahu jawaban yang sebenarnya.";

    }


    nextQuestionButton.classList.add("show");

}


/* =====================================================
   NEXT QUESTION
===================================================== */

function nextQuestion() {

    currentQuestion++;


    if (currentQuestion >= questions.length) {

        finishGame();

        return;

    }


    loadQuestion();

}


/* =====================================================
   FINISH GAME
===================================================== */

function finishGame() {

    gameFinished = true;


    choiceGame.style.display =
        "none";


    gameComplete.classList.add("show");


    updateProgress();


    createConfetti();


    setTimeout(() => {

        gameComplete.scrollIntoView({

            behavior: "smooth",

            block: "center"

        });

    }, 500);

}


/* =====================================================
   OPENING PARTICLES
===================================================== */

function createOpeningParticles() {

    for (let i = 0; i < 12; i++) {

        setTimeout(() => {

            createParticle();

        }, i * 250);

    }

}


function createParticle() {

    const particle =
        document.createElement("span");


    particle.innerHTML = "·";


    particle.style.position =
        "fixed";

    particle.style.left =
        Math.random() * 100 + "vw";

    particle.style.top =
        Math.random() * 100 + "vh";

    particle.style.color =
        "rgba(120,185,232,0.35)";

    particle.style.fontSize =
        Math.random() * 10 + 5 + "px";

    particle.style.pointerEvents =
        "none";

    particle.style.zIndex =
        "1";


    document.body.appendChild(particle);


    particle.animate(

        [
            {
                opacity: 0,
                transform: "translateY(10px)"
            },

            {
                opacity: 1
            },

            {
                opacity: 0,
                transform: "translateY(-80px)"
            }
        ],

        {
            duration:
                Math.random() * 3000 + 3000,

            easing: "ease-out"
        }

    );


    setTimeout(() => {

        particle.remove();

    }, 6500);

}


/* =====================================================
   CONFETTI
===================================================== */

function createConfetti() {

    const symbols = [
        "♡",
        "·",
        "✦",
        "♥"
    ];


    for (let i = 0; i < 35; i++) {

        const piece =
            document.createElement("span");


        piece.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        piece.style.position =
            "fixed";

        piece.style.left =
            Math.random() * 100 + "vw";

        piece.style.top =
            "-30px";

        piece.style.zIndex =
            "9998";

        piece.style.pointerEvents =
            "none";

        piece.style.color =
            Math.random() > 0.5
                ? "#78b9e8"
                : "#dceaf4";

        piece.style.fontSize =
            Math.random() * 12 + 8 + "px";


        document.body.appendChild(piece);


        const duration =
            Math.random() * 2500 + 2500;


        piece.animate(

            [
                {
                    transform:
                        "translateY(0) rotate(0deg)",

                    opacity: 1
                },

                {
                    transform:
                        `translateY(110vh)
                         rotate(${Math.random() * 720 - 360}deg)`,

                    opacity: 0
                }
            ],

            {
                duration: duration,

                easing: "cubic-bezier(.2,.7,.3,1)"
            }

        );


        setTimeout(() => {

            piece.remove();

        }, duration);

    }

}


/* =====================================================
   REPLAY
===================================================== */

function replayWebsite() {

    location.reload();

}


/* =====================================================
   KEYBOARD PIN
===================================================== */

document.addEventListener(
    "keydown",
    function(event) {

        /*
           Memudahkan testing di laptop.
           Bisa langsung ketik 1111.
        */

        if (
            pinScreen &&
            !pinScreen.classList.contains("hide")
        ) {

            if (/^[0-9]$/.test(event.key)) {

                enterPin(event.key);

            }


            if (
                event.key === "Backspace"
            ) {

                deletePin();

            }

        }

    }
);


/* =====================================================
   LOAD GAME
===================================================== */

loadQuestion();


/* =====================================================
   INITIAL PROGRESS
===================================================== */

updateProgress();


/* =====================================================
   CONSOLE
===================================================== */

console.log(
    "♡ A Day Kept For You — Akbar × Deandra"
);

console.log(
    "PIN: 1111"
);
