import { beatmaps } from "./beatmaps.js";
import { fishLootTable } from './fishLootTable.js';

const noteContainer = document.getElementById("note-container");
const scoreDisplay = document.getElementById("score");
const beatmapDisplay = document.getElementById("beatmap-name");
const bgMusic = document.getElementById("bg-music");

const pauseBtn = document.getElementById("pause-btn");
const pauseOverlay = document.getElementById("pause-overlay");
const retryBtn = document.getElementById("retry-btn");
const songSelectBtn = document.getElementById("song-select-btn");
const mainMenuBtn = document.getElementById("main-menu-btn");
const mainMenu = document.getElementById("main-menu");
const gameContainer = document.getElementById("game-container");
const body = document.body;
const backBtn = document.getElementById("back-btn");

const resultsScreen = document.getElementById("results-screen");
const finalScoreDisplay = document.getElementById("final-score");
const retryFromResultsBtn = document.getElementById("retry-from-results-btn");
const mainMenuFromResultsBtn = document.getElementById("main-menu-from-results-btn");
const goBackSongSelectBtn = document.getElementById("go-back-song-select-btn");
const beatmapNameResult = document.getElementById("beatmap-name-result");
const highScoreResult   = document.getElementById("high-score-result");
const fishContainer     = document.getElementById("fish-image-container");
const fishImageEl       = document.getElementById("fish-image");
const fishSizeEl        = document.getElementById("fish-size-display");
let caughtFishListByDifficulty = {};

// Don and Ka sounds
const donSfx = document.getElementById("don-sfx");
const kaSfx = document.getElementById("ka-sfx");

let score = 0;
let notes = [];
let noteSpeed = 4;
let beatmapName = "";
let musicSrc = "";
let currentBeatmap = [];
let kaTimings = [];
let notesInHitzone = [];
let missCount = 0;
let missDisplay = document.getElementById("miss-count");

let isPaused = false;
let animationFrame;
let selectedMap = null;
let selectedDifficulty = "";
let spawnTimeouts = [];
let isCountdownActive = false;
let fishGif;

// 🌟 Globals for spawning system
let startTime = 0;
let lastFrameTime = 0;
let nextNoteIndex = 0;
let nextKaIndex = 0;


// stopwatch / timing
let gameStartTime = 0;
let pauseStartTime = 0;
let totalPausedTime = 0;
let stopwatchInterval = null;
let beatmapDuration = 0;

const hitzoneWidth = 55;
const hitzoneStartX = 220;

// Home Page reference (fixed)
const homePage = document.getElementById("home-page");

document.getElementById("easy-btn").addEventListener("click", () => setDifficulty("easy"));
document.getElementById("medium-btn").addEventListener("click", () => setDifficulty("medium"));
document.getElementById("hard-btn").addEventListener("click", () => setDifficulty("hard"));

let maxMisses; // declare globally at the top of your script

function setDifficulty(level) {
    selectedDifficulty = level;

    // 🧠 Dynamic maxMisses by difficulty
    if (level === "easy") maxMisses = 10;
    else if (level === "medium") maxMisses = 8;
    else if (level === "hard") maxMisses = 6;

    mainMenu.style.display = "none";
    document.getElementById("song-menu").style.display = "block";

    // 🔁 Smooth background transition
    let bgImage = "";
    if (level === "easy") bgImage = "/images/bg/easy-bg.gif";
    if (level === "medium") bgImage = "/images/bg/medium-bg.gif";
    if (level === "hard") bgImage = "/images/bg/hard-bg.gif";
    changeBackground(bgImage);

    showSongMenu(level);
}



function showSongMenu(level) {
    const songList = document.getElementById("song-list");
    songList.innerHTML = "";  // Clear the existing song list

    beatmaps[level].forEach(map => {
        const wrapper = document.createElement("div");
        wrapper.classList.add("beatmap-item");

        // Get the current high score for this map and difficulty level
        const bestScore = getHighScore(map.name, level);
        const maxScore = calculateMaxScore(map);
        const grade = getScoreGrade(bestScore, maxScore, level);

        // Create button styled with an image background
        const btn = document.createElement("button");
        btn.classList.add("image-button"); // apply custom button styles

        // Background image and layout styling
        btn.style.backgroundImage = `url('./images/btn/Longbutton2.png')`;
        btn.style.backgroundSize = "fill";
        btn.style.backgroundRepeat = "no-repeat";
        btn.style.backgroundPosition = "center";
        btn.style.width = "536px";  // adjust to match your PNG dimensions
        btn.style.height = "150px";
        btn.style.border = "none";
        btn.style.padding = "0";
        btn.style.margin = "0";
        btn.style.cursor = "pointer";
        btn.style.position = "relative";
        btn.style.display = "flex";
        btn.style.alignItems = "center";
        btn.style.justifyContent = "center";
        btn.style.backgroundColor = "transparent";

        // Create label text overlay
        const label = document.createElement("span");
        label.classList.add("button-label");
        label.innerHTML = `
               <span class="map-name">${map.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
               <span class="best-score">${bestScore} (${grade})</span>
`;
        // Style the label for clarity on top of image
        label.style.position = "absolute";
        label.style.top = "50%";
        label.style.left = "50%";
        label.style.transform = "translate(-50%, -50%)";
        label.style.color = "#ffffff";
        label.style.fontFamily = "'Montserrat', sans-serif";
        label.style.fontWeight = "500";
        label.style.textTransform = "uppercase";
        label.style.pointerEvents = "none"; // allows clicking through label to button
        label.style.width = "100%";

        btn.appendChild(label);
        btn.addEventListener("click", () => selectSong(map));
        wrapper.appendChild(btn);

        // Add fish info preview
        const info = document.createElement("div");
        info.classList.add("beatmap-info");

        wrapper.appendChild(info);
        songList.appendChild(wrapper);
    });
}



// Calculate max score based on don and ka notes
function calculateMaxScore(map) {
    let totalNotes = 0;

    if (map["beats-don"]) {
        totalNotes += map["beats-don"].length;
    } else if (map.beats) {
        totalNotes += map.beats.length;
    }

    if (map["beats-ka"]) {
        totalNotes += map["beats-ka"].length;
    }

    return totalNotes * 50;
}

document
    .getElementById("reset-scores-btn")
    .addEventListener("click", () => {
        if (
            !confirm("Are you sure you want to reset all high‑scores and your fish collection?")
        )
            return;

        // 1) Clear high‑scores
        localStorage.removeItem("highScores");
        console.log("All high‑scores cleared from localStorage.");

        // 2) Clear fish collection
        localStorage.removeItem("fishCollection");
        console.log("All fish collection cleared from localStorage.");

        // 3) Reset our in‑memory store
        caughtFishListByDifficulty = {};

        // 4) Refresh the song menu (so Best scores show 0)
        if (selectedDifficulty) {
            showSongMenu(selectedDifficulty);
        }

        // 5) If the collection screen is open, refresh or hide it
        const collScreen = document.getElementById("fish-collection-screen");
        if (collScreen.style.display === "block") {
            // Simply clear out the grid
            document.getElementById("collection-grid").innerHTML = "";
            // Or go back to song menu:
            collScreen.style.display = "none";
            document.getElementById("song-menu").style.display = "block";
        }

        alert("All high‑scores and your fish collection have been reset!");
    });

function selectSong(map) {
    selectedMap     = map;
    beatmapName     = map.name;
    musicSrc        = map.music;

    // Compute ms-per-beat & offset
    const beatDuration = map.bpm ? 60000 / map.bpm : 0;
    const offset       = map.offset || 0;

    // Convert don-taps (formerly `beats`) into ms timings
    const donBeats = map["beats-don"] || map.beats || [];
    currentBeatmap = donBeats.map(b => offset + b * beatDuration);

    // Convert ka-taps into ms timings
    kaTimings = (map["beats-ka"] || []).map(b => offset + b * beatDuration);

    // Load the audio and get duration
    const audio = document.getElementById("bg-music");
    audio.src = map.music;
    audio.addEventListener("loadedmetadata", () => {
        beatmapDuration = Math.floor(audio.duration);
    }, { once: true });


    // Switch UIs
    document.getElementById("song-menu").style.display = "none";
    gameContainer.style.display = "block";

    // Set dynamic note speed based on BPM
    const referenceBpm = 120; // You can adjust this base value if needed
    noteSpeed = (map.bpm / referenceBpm) * 4;
    // Base speed is 4 at 120 BPM, faster if BPM is higher, slower if lower

    beatmapDisplay.textContent = `Currently Catching On: ${beatmapName}`;
    startGame();
}


function startGame() {
    console.log("Game is starting, resetting stopwatch...");
    resetStopwatch(); // Reset stopwatch at the start of the game
    showGameplayUI();
    missCount = 0;
    // Fix: Convert missCount and maxMisses to strings before concatenation
    missDisplay.textContent = `${missCount} / ${maxMisses}`;

    const countdownElem = document.getElementById("countdown");
    let count = 3;

    countdownElem.textContent = count.toString();
    countdownElem.style.display = "block";
    isPaused = true; // Pause the game during countdown
    isCountdownActive = true;  // Set countdown active

    // Disable pause button during countdown
    pauseBtn.disabled = true;

    const countdownInterval = setInterval(() => {
        count--;
        if (count > 0) {
            countdownElem.textContent = count.toString();
        } else if (count === 0) {
            countdownElem.textContent = "Start!";
        } else {
            clearInterval(countdownInterval);
            countdownElem.style.display = "none";
            isPaused = false; // Unpause when countdown finishes
            isCountdownActive = false;  // Set countdown inactive

            // Enable pause button after countdown ends
            pauseBtn.disabled = false;

            beginGameplay();  // Start the actual game
        }
    }, 1000);
}



function beginGameplay() {
    console.log("Game has started, starting stopwatch...");
    if (musicSrc) {
        bgMusic.src = musicSrc;
        bgMusic.currentTime = 0;
        bgMusic.play();
        startStopwatch();
        showGameplayUI();
    }

    // Reset everything
    startTime = performance.now();
    nextNoteIndex = 0;
    nextKaIndex = 0;
    notes = [];
    missCount = 0;
    // Fix: Convert missCount and maxMisses to strings before concatenation
    missDisplay.textContent = `${missCount} / ${maxMisses}`;
    lastFrameTime = null;


    animationFrame = requestAnimationFrame(spawnLoop); // 🛠 replace with new spawn loop
}

function spawnLoop(timestamp) {
    if (isPaused) {
        lastFrameTime = null;
        return;
    }

    if (!lastFrameTime) lastFrameTime = timestamp;
    const elapsedTime = (timestamp - startTime) / 1000; // seconds since start

    // Spawn don notes
    while (nextNoteIndex < currentBeatmap.length && elapsedTime >= currentBeatmap[nextNoteIndex] / 1000) {
        spawnNote("don");
        nextNoteIndex++;
    }

    // Spawn ka notes
    while (nextKaIndex < kaTimings.length && elapsedTime >= kaTimings[nextKaIndex] / 1000) {
        spawnNote("ka");
        nextKaIndex++;
    }

    // Run normal game logic
    gameLoop(timestamp);

    // Loop again
    animationFrame = requestAnimationFrame(spawnLoop);
}

function gameLoop(timestamp) {
    if (isPaused) {
        lastFrameTime = null;
        return;
    }

    if (!lastFrameTime) lastFrameTime = timestamp;
    const deltaTime = (timestamp - lastFrameTime) / 1000; // seconds passed since last frame
    lastFrameTime = timestamp;

    for (let i = notes.length - 1; i >= 0; i--) {
        const note = notes[i];

        // Move the note based on speed and delta time
        note.x -= noteSpeed * deltaTime * 60; // ✅ adjust movement by frame timing
        note.elem.style.left = note.x + "px";

        // mark that this note has entered the hit-zone
        if (!note.inHitzone && note.x <= hitzoneStartX + hitzoneWidth) {
            note.inHitzone = true;
        }

        // if it slipped past without being hit...
        if (note.inHitzone && !note.counted && note.x < hitzoneStartX) {
            note.counted = true; // only count once
            missCount++;
score = Math.max(0, score - 50);
            // Fix: Convert missCount to string before displaying
            document.getElementById("miss-count").textContent = `${missCount} / ${maxMisses}`;

            if (missCount >= maxMisses) {
                return endGame("missed"); // Important: Pass "missed" reason!
            }
        }

        // finally, remove it once fully off-screen
        if (note.x < -20) {
            note.elem.remove();
            notes.splice(i, 1);
        }
    }

    animationFrame = requestAnimationFrame(gameLoop);
}

function spawnNote(type = "don") {
    const note = document.createElement("div");
    note.classList.add("note");

    // Add specific class and label based on note type
    if (type === "ka") {
        note.classList.add("note-ka");
        note.textContent = "E";
    } else {
        note.classList.add("note-don");
        note.textContent = "W";
    }

    note.style.left = "800px";  // Initial position of the note
    noteContainer.appendChild(note);

    // Push the note object into the notes array with its DOM element, initial position, and type
    notes.push({
        elem: note,
        x: 800,
        type: type
    });
}


document.addEventListener("keydown", (e) => {
    if (isPaused) return;

    // W for don notes, E for ka notes
    if (e.code === "KeyW" || e.code === "KeyE") {
        const pressedType = e.code === "KeyW" ? "don" : "ka";
        let noteHandled = false;

        for (let i = 0; i < notes.length; i++) {
            let note = notes[i];
            if (note.x > hitzoneStartX && note.x < hitzoneStartX + hitzoneWidth) {
                if (note.type === pressedType) {
                    // ✅ Correct key
                    if (note.type === "don") {
                        donSfx.currentTime = 0;
                        donSfx.play();
                    } else {
                        kaSfx.currentTime = 0;
                        kaSfx.play();
                    }

                    score += 50;
                    showFeedback("HIT!", "#9fff0b"); // green for hit
                } else {
                    // ❌ Wrong key (wrong note type)
                    incrementMiss();
                    showFeedback("MISS!", "#ff0505"); // red for miss
                }

                // Update score display
                scoreDisplay.textContent = score.toString();

                // Remove the note
                const hitzoneIndex = notesInHitzone.indexOf(note);
                if (hitzoneIndex > -1) {
                    notesInHitzone.splice(hitzoneIndex, 1);
                }

                note.elem.remove();
                notes.splice(i, 1);
                noteHandled = true;
                break;
            }
        }

        // ❌ If player pressed and NO note was in the hitzone at all
        if (!noteHandled) {
            incrementMiss();
            showFeedback("MISS!", "#f44336");
        }
    }

    if (e.code === "Escape") {
        if (
            gameContainer.style.display === "block" &&
            !isPaused &&
            !isCountdownActive
        ) {
            pauseGame();
        }
    }
});

// Pause and resume
pauseBtn.addEventListener("click", () => {
    // ✅ Only allow pausing if game container is visible
    if (gameContainer.style.display === "block" && !isPaused && !isCountdownActive) {
        pauseGame();
    }
});

function pauseGame() {
    isPaused = true;
    bgMusic.pause();  // Pause the background music
    pauseStopwatch()
    pauseOverlay.style.display = "flex";  // Show pause overlay
    cancelAnimationFrame(animationFrame);  // Stop the game loop

    // Clear spawn timeouts so no new notes are spawned
    spawnTimeouts.forEach(timeout => clearTimeout(timeout));
    spawnTimeouts = [];

    // Clear notes from the screen
    notes.forEach(note => note.elem.remove());
    notes = [];

    // Hide countdown during pause
    document.getElementById("countdown").style.display = "none";
}

// FULL reset logic for retry
function resetGame() {
    // Cancel game loop and reset animation frame
    cancelAnimationFrame(animationFrame);


    // Stop and reset music
    bgMusic.pause();
    bgMusic.currentTime = 0;

    // Clear all notes from the screen
    notes.forEach(note => note.elem.remove());
    notes = [];

    // Clear pending timeouts
    spawnTimeouts.forEach(timeout => clearTimeout(timeout));
    spawnTimeouts = [];

    // Reset score
    score = 0;
    scoreDisplay.textContent = score.toString();

    // Reset miss counter
    missCount = 0;
    if (missDisplay) {
        // Fix: Convert missCount and maxMisses to strings
        missDisplay.textContent = `${missCount} / ${maxMisses}`;
    }
    notesInHitzone = [];

    // Hide overlays
    pauseOverlay.style.display = "none";

    // Reset game state
    isPaused = false;

    // Make sure visual elements are restored
    document.getElementById("countdown").style.display = "none";
    document.getElementById("note-bar").style.display = "block";
    document.getElementById("hitzone").style.display = "block";
    document.getElementById("note-container").style.display = "block";


    // Start game again
    startGame();
}

// Retry button to reset the game
retryBtn.addEventListener("click", () => {
    resetGame();  // Full reset and start the game from the beginning
    resultsScreen.style.display = "none";
});

// Song select from pause menu
songSelectBtn.addEventListener("click", () => {
    stopGame();  // Stop the game completely
    document.getElementById("song-menu").style.display = "block";  // Show song select menu
    pauseOverlay.style.display = "none";  // Hide the pause overlay
    gameContainer.style.display = "none";  // Hide the game container
    resultsScreen.style.display = "none";
});

// Main menu from pause menu
mainMenuBtn.addEventListener("click", () => {
    stopGame();  // Stop the game completely
    mainMenu.style.display = "block";  // Show the main menu
    gameContainer.style.display = "none";  // Hide the game container
    body.classList.remove("easy-bg", "medium-bg", "hard-bg");
    resultsScreen.style.display = "none";
});

// Back button from song menu to go to main menu
backBtn.addEventListener("click", () => {
    document.getElementById("song-menu").style.display = "none";
    mainMenu.style.display = "block";
    document.body.classList.remove("easy-bg", "medium-bg", "hard-bg");
    changeBackground("images/bg/difficulty-bg.gif");
    resultsScreen.style.display = "none";
});

function stopGame() {
    // Call the pauseGame function to stop all game-related processes
    pauseGame();
    resetStopwatch();

    // Reset all game-specific state
    isPaused = false;  // Just to ensure it's reset
    score = 0;  // Reset score
    scoreDisplay.textContent = score.toString();

    // Hide game container and pause overlay
    gameContainer.style.display = "none";
    pauseOverlay.style.display = "none";

    // Clear all notes and spawn timeouts
    spawnTimeouts.forEach(timeout => clearTimeout(timeout));
    spawnTimeouts = [];
    notes.forEach(note => note.elem.remove());
    notes = [];
}

function endGame(reason = "missed") {
    resetStopwatch();
    bgMusic.pause();
    cancelAnimationFrame(animationFrame);
    isPaused = true;

    // Hide gameplay UI right away
    document.getElementById("note-bar").style.display = "none";
    document.getElementById("hud").style.display = "none";
    document.getElementById("stopwatch-container").style.display = "none";
    document.getElementById("beatmap-name").style.display = "none";
    document.getElementById("pause-btn").style.display = "none";

    // Show catch gif if not missed
    if (reason !== "missed") {
        playCatchGif(); // shows catch.gif and reverts after 1.5s
    }

    // Delay the results screen logic
    setTimeout(() => {
        // Hide the full game container after delay
        gameContainer.style.display = "none";

        finalScoreDisplay.textContent = score.toString();
        beatmapNameResult.textContent = beatmapName;

        const isNewBest = saveHighScore(beatmapName, selectedDifficulty, score);
        const best = getHighScore(beatmapName, selectedDifficulty);
        highScoreResult.innerHTML = isNewBest
            ? `🎉 New High Score! ${score}`
            : `Personal Best: ${best}`;

        resultsScreen.style.display = "block";

        const noFishMessageEl = document.getElementById('no-fish-message');
        const lootTable = fishLootTable[selectedDifficulty]?.[beatmapName];
        const rankText = document.getElementById('ranktext');

        if (reason === "missed") {
            fishImageEl.style.display = "none";
            fishContainer.style.display = "none";
            noFishMessageEl.style.display = "block";
            noFishMessageEl.innerHTML = `<strong>Oh, no! You missed too many beats. No fish this time! 🎣💨</strong>`;
            rankText.style.display = 'none';
        } else {
            fishImageEl.style.display = "block";
            fishContainer.style.display = "block";

            const caughtFish = getCaughtFish(score, selectedDifficulty, lootTable);

            if (caughtFish) {
                saveToCollection(caughtFish);
                const maxScore = getMaxScoreForBeatmap();
                const grade = getScoreGrade(score, maxScore, selectedDifficulty);

                fishSizeEl.innerHTML = `You caught a <strong>${caughtFish.randomizedSize}kg ${caughtFish.name}!</strong>`;
                fishImageEl.src = caughtFish.fishImage;

                const gradeEl = document.getElementById('fish-grade-display');
                gradeEl.textContent = grade;
                gradeEl.style.display = 'block';

                if (grade === "S+") rankText.textContent = "PERFECT!";
                else if (grade === "S") rankText.textContent = "Top Rank!";
                else if (grade === "A") rankText.textContent = "Great Job!";
                else if (grade === "B") rankText.textContent = "Nice Effort!";
                else if (grade === "C") rankText.textContent = "You Can Do Better!";
                else if (grade === "D") rankText.textContent = "Pretty Rough...";
                else if (grade === "E") rankText.textContent = "Did You Even Try?";

                rankText.style.display = 'block';
                fishImageEl.style.width = '400px';
                fishImageEl.style.height = 'auto';
            } else {
                fishSizeEl.innerHTML = `<strong>No fish this time, better luck next time!</strong>`;
                rankText.style.display = 'none';
            }

            noFishMessageEl.style.display = "none";
        }
    }, reason === "missed" ? 0 : 1500); // skip delay on miss
}


function getMaxScoreForBeatmap() {
    const map = selectedMap;
    const donNotes = map["beats-don"] || map.beats || [];
    const kaNotes = map["beats-ka"] || [];
    const totalNotes = donNotes.length + kaNotes.length;
    return totalNotes * 50; // ✅ match the score added in keydown
}

bgMusic.addEventListener("ended", endGame);

retryFromResultsBtn.addEventListener("click", () => {
    // 1) Hide the results UI & fish image
    resultsScreen.style.display   = "none";
    fishContainer.style.display    = "none";
    pauseOverlay.style.display     = "none";

    // 2) Show the main game container
    gameContainer.style.display    = "block";

    // 3) Fully reset everything (score, notes, music, stopwatch, UI) and restart the countdown
    resetGame();
});

goBackSongSelectBtn.addEventListener("click", () => {
    stopGame();
    resultsScreen.style.display = "none";
    fishContainer.style.display = "none";
    document.getElementById("song-menu").style.display = "block";
    showSongMenu(selectedDifficulty);
});

mainMenuFromResultsBtn.addEventListener("click", () => {
    stopGame();
    resultsScreen.style.display = "none";
    fishContainer.style.display = "none";
    homePage.style.display = "block"; // Fixed reference to homePage
});

function getCaughtFish(score, difficulty, lootTable) {
    if (!lootTable) return null;

    const maxScore = getMaxScoreForBeatmap();
    const grade = getScoreGrade(score, maxScore, difficulty);

    const gradeOrder = ["C", "B", "A", "S", "S+"];
    const playerGradeIndex = gradeOrder.indexOf(grade);

    // For debugging
    console.log("Player grade:", grade);
    console.log("Available fish:", lootTable.map(f => `${f.name} (${f.grade || 'rare'})`));

    // ✨ Only allow rare catch if grade is S or higher
    const allowRare = playerGradeIndex >= gradeOrder.indexOf("S");

    // 1. RNG rare catch (only if grade is high enough)
    if (allowRare && Math.random() < 1 / 20) {
        const rareFish = lootTable.find(f => f.isRare);
        if (rareFish) {
            console.log("Caught rare fish:", rareFish.name);
            return {
                ...rareFish,
                randomizedSize: rareFish.fishSize,
                isRareCatch: true
            };
        }
    }

    // 2. Grade-based fish (non-rare) with grade normalization
    const eligibleFish = lootTable.filter(f => {
        if (f.isRare) return false;

        const normalizedGrade = (f.grade || "C").trim().toUpperCase().replace(/\s+/g, '');
        const fishGradeIndex = gradeOrder.indexOf(normalizedGrade);

        // Debug print to catch weird data
        if (fishGradeIndex === -1) {
            console.warn(`⚠️ Invalid grade "${f.grade}" on fish "${f.name}"`);
        }

        return fishGradeIndex !== -1 && fishGradeIndex <= playerGradeIndex;
    });

    console.log("Eligible fish:", eligibleFish.map(f => f.name));

    if (eligibleFish.length === 0) {
        console.log("No eligible fish found");
        return null;
    }

    const selectedFish = eligibleFish[Math.floor(Math.random() * eligibleFish.length)];
    console.log("Selected fish:", selectedFish.name);

    const variation = 0.05;
    const multiplier = 1 + (Math.random() * 2 - 1) * variation;
    const randomizedSize = (selectedFish.fishSize * multiplier).toFixed(1);

    return {
        ...selectedFish,
        randomizedSize: parseFloat(randomizedSize),
        isRareCatch: false
    };
}


function loadCaughtFishList() {
    caughtFishListByDifficulty = JSON.parse(
        localStorage.getItem('fishCollection') || '{}'
    );
}

function persistCaughtFishList() {
    localStorage.setItem(
        'fishCollection',
        JSON.stringify(caughtFishListByDifficulty)
    );
}


function _scoreKey(mapName, difficulty) {
    return `${mapName}__${difficulty}`;
}

function loadHighScores() {
    return JSON.parse(localStorage.getItem("highScores") || "{}");
}

function getHighScore(mapName, difficulty) {
    const scores = loadHighScores();
    return scores[_scoreKey(mapName, difficulty)] || 0;
}


function saveHighScore(mapName, difficulty, score) {
    const key = _scoreKey(mapName, difficulty);
    const scores = loadHighScores();
    if (!scores[key] || score > scores[key]) {
        scores[key] = score;
        localStorage.setItem("highScores", JSON.stringify(scores));
        return true; // new personal best
    }
    return false;
}

function getScoreGrade(score, maxScore, difficulty) {
    const ratio = score / maxScore;

    // Define grade thresholds for each difficulty
    const gradeThresholds = {
        easy: {
            SPlus: 0.95,
            S:     0.85,
            A:     0.75,
            B:     0.60,
            C:     0.0
        },
        medium: {
            SPlus: 0.96,
            S:     0.87,
            A:     0.77,
            B:     0.65,
            C:     0.0
        },
        hard: {
            SPlus: 0.97,
            S:     0.89,
            A:     0.78,
            B:     0.66,
            C:     0.0
        }
    };

    const thresholds = gradeThresholds[difficulty] || gradeThresholds.easy;

    if (ratio >= thresholds.SPlus) return "S+";
    if (ratio >= thresholds.S) return "S";
    if (ratio >= thresholds.A) return "A";
    if (ratio >= thresholds.B) return "B";
    if (ratio >= thresholds.C) return "C";
    return "D";
}


// Format seconds as M:SS
function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
}

function resetStopwatch() {
    console.log("Resetting stopwatch...");
    clearInterval(stopwatchInterval);  // Clear any running intervals
    gameStartTime = 0;
    pauseStartTime = 0;
    totalPausedTime = 0;

    // Reset the stopwatch display to "0:00 / X:XX" but do not start the timer yet.
    document.getElementById('stopwatch').textContent = `0:00 / ${formatTime(beatmapDuration)}`;
}

function startStopwatch() {
    gameStartTime = Date.now(); // Capture the time when the game starts

    stopwatchInterval = setInterval(() => {
        const elapsedMs = Date.now() - gameStartTime - totalPausedTime; // Time elapsed since start
        const elapsedSec = Math.min(Math.floor(elapsedMs / 1000), beatmapDuration); // Don't go past the duration
        document.getElementById('stopwatch').textContent = `${formatTime(elapsedSec)} / ${formatTime(beatmapDuration)}`;
    }, 200); // Updates every 200ms
}

function pauseStopwatch() {
    clearInterval(stopwatchInterval);
    pauseStartTime = Date.now();
}

// Home Page Elements
const startBtn = document.getElementById("start-btn");
const settingsBtn = document.getElementById("settings-btn");
const tutorialBtn = document.getElementById("tutorial-btn");
const settingsPage = document.getElementById("settings-page");
const tutorialPage = document.getElementById("tutorial-page");
const backFromSettingsBtn = document.getElementById("back-from-settings-btn");
const backFromTutorialBtn = document.getElementById("back-from-tutorial-btn");
document.getElementById("easy-btn");
document.getElementById("medium-btn");
document.getElementById("hard-btn");
const backFromMainBtn = document.getElementById("back-from-main-btn");

// Home Page Navigation
startBtn.addEventListener("click", () => {
    resultsScreen.style.display = "none";
    homePage.style.display = "none";
    mainMenu.style.display = "block"; // Show main menu after clicking "Start"
    changeBackground("/fishing-game/images/bg/difficulty-bg.gif");
});

mainMenuFromResultsBtn.addEventListener("click", () => {
    resultsScreen.style.display = "none";
    resultsScreen.style.display = "none";
    homePage.style.display = "block";
    changeBackground("/fishing-game/images/bg/background.gif");
});

settingsBtn.addEventListener("click", () => {
    resultsScreen.style.display = "none";
    homePage.style.display = "none";
    settingsPage.style.display = "block";
    changeBackground("/fishing-game/images/bg/settings-bg.png");
});

tutorialBtn.addEventListener("click", () => {
    resultsScreen.style.display = "none";
    homePage.style.display = "none";
    tutorialPage.style.display = "block";
    changeBackground("/fishing-game/images/bg/tutorial-bg.jpg");
});

backFromSettingsBtn.addEventListener("click", () => {
    resultsScreen.style.display = "none";
    settingsPage.style.display = "none";
    homePage.style.display = "block";
    changeBackground("/fishing-game/images/bg/background.gif");
});

backFromTutorialBtn.addEventListener("click", () => {
    resultsScreen.style.display = "none";
    tutorialPage.style.display = "none";
    homePage.style.display = "block";
    changeBackground("/fishing-game/images/bg/background.gif");
});

backFromMainBtn.addEventListener("click", () => {
    resultsScreen.style.display = "none";
    mainMenu.style.display = "none";
    homePage.style.display = "block"; // Show the home page
    document.body.classList.remove("easy-bg", "medium-bg", "hard-bg");
    changeBackground("/fishing-game/images/bg/background.gif");
});

//BG transitioning
function changeBackground(imagePath) {
    const oldBg = document.getElementById("background-old");
    const newBg = document.getElementById("background-new");

    if (!oldBg || !newBg) {
        console.error("Background elements not found");
        return;
    }

    // Set the new background image for the new layer
    newBg.style.backgroundImage = `url(${imagePath})`;
    newBg.style.opacity = "1";  // Convert number to string

// After the fade-in, swap the layers
    setTimeout(() => {
        oldBg.style.backgroundImage = `url(${imagePath})`;
        oldBg.style.opacity = "1";   // Convert number to string
        newBg.style.opacity = "0";   // Convert number to string
    }, 300);
}

// 🎵 Volume Controls
const volumeControl = document.getElementById("volume-control");
const sfxVolumeControl = document.getElementById("sfx-volume-control");
const musicVolumeDisplay = document.getElementById("music-volume-display");
const sfxVolumeDisplay = document.getElementById("sfx-volume-display");

// Function to update display text
function updateVolumeDisplays() {
    musicVolumeDisplay.textContent = Math.round(volumeControl.value * 100) + "%";
    sfxVolumeDisplay.textContent = Math.round(sfxVolumeControl.value * 100) + "%";
}

// Load saved settings on startup
const savedMusicVolume = localStorage.getItem("musicVolume");
const savedSfxVolume = localStorage.getItem("sfxVolume");

if (savedMusicVolume !== null) {
    const parsedVolume = parseFloat(savedMusicVolume);
    volumeControl.value = parsedVolume;
    bgMusic.volume = parsedVolume;
}
if (savedSfxVolume !== null) {
    const parsedSfxVolume = parseFloat(savedSfxVolume);
    sfxVolumeControl.value = parsedSfxVolume;
    if (donSfx) donSfx.volume = parsedSfxVolume;
    if (kaSfx) kaSfx.volume = parsedSfxVolume;
}

// Update display immediately after loading
updateVolumeDisplays();

// 🎶 Update Music Volume
volumeControl.addEventListener("input", (e) => {
    const newVolume = parseFloat(e.target.value);
    bgMusic.volume = newVolume;
    localStorage.setItem("musicVolume", newVolume.toString());
    updateVolumeDisplays();
});

// 🎧 Update SFX Volume
sfxVolumeControl.addEventListener("input", (e) => {
    const newSfxVolume = parseFloat(e.target.value);
    if (donSfx) donSfx.volume = newSfxVolume;
    if (kaSfx) kaSfx.volume = newSfxVolume;
    localStorage.setItem("sfxVolume", newSfxVolume.toString());
    updateVolumeDisplays();
});



function showFeedback(text, color) {
    const feedback = document.createElement("div");
    feedback.className = "feedback";
    feedback.textContent = text;
    feedback.style.color = color;

    // No offset — fixed position from CSS
    document.body.appendChild(feedback);

    setTimeout(() => {
        feedback.remove();
    }, 500);
}

// incremental miss function
const missCountDisplay = document.getElementById("miss-count");

function incrementMiss() {
    missCount++;
score = Math.max(0, score - 50);
    missCountDisplay.textContent = `${missCount} / ${maxMisses}`; // 🔁 Show X / Y

    if (missCount >= maxMisses) {
        endGame("missed");  // 😵 Game over!
    }
}

// Open the collection
document.getElementById("view-collection-btn").addEventListener("click", () => {
    showCollection(selectedDifficulty);
});

// Return to song menu
document.getElementById("return-to-menu-btn").addEventListener("click", () => {
    document.getElementById("fish-collection-screen").style.display = "none";
    document.getElementById("song-menu").style.display            = "block";
});

function saveToCollection(fish) {
    const diff = selectedDifficulty;
    if (!caughtFishListByDifficulty[diff]) {
        caughtFishListByDifficulty[diff] = [];
    }
    if (!caughtFishListByDifficulty[diff].includes(fish.name)) {
        caughtFishListByDifficulty[diff].push(fish.name);
        persistCaughtFishList();
    }
}

function showCollection() {
    const grid = document.getElementById('collection-grid');
    grid.innerHTML = ''; // clear old cards

    const caughtList = caughtFishListByDifficulty[selectedDifficulty] || [];
    const lootForDiff = fishLootTable[selectedDifficulty] || {};

    Object.entries(lootForDiff).forEach(([beatmapName, fishList]) => {
        const section = document.createElement('div');
        section.classList.add('collection-section');
        section.innerHTML = `<h3>${beatmapName}</h3>`;
        grid.appendChild(section);

        fishList.forEach(fish => {
            const card = document.createElement('div');
            const isCaught = caughtList.includes(fish.name);

            card.classList.add('fish-card');
            if (!isCaught) card.classList.add('uncaught');

            card.innerHTML = isCaught
                ? `
                    <img src="${fish.fishImage}" alt="${fish.name}">
                    <h4>${fish.name}</h4>
                    <p>${fish.fishSize}kg</p>
                    <p>Status: <span class="status">✅ Caught</span></p>
                  `
                : `
                    <img src="${fish.fishImage}" alt="Unknown Fish">
                    <p>???</p>
                    <p>?? kg</p>
                    <p>Status: <span class="status">❌ Not Caught</span></p>
                  `;

            section.appendChild(card);
        });
    });
}


window.addEventListener('DOMContentLoaded', () => {
    // 1) Load any previously caught fish
    loadCaughtFishList();
    fishGif = document.getElementById('fish-gif');

    // 2) Show collection button
    document
        .getElementById('view-collection-btn')
        .addEventListener('click', () => {
            showCollection();
            document.getElementById('song-menu').style.display = 'none';
            document.getElementById('fish-collection-screen').style.display = 'block';
        });

    // 3) Return to menu button
    document
        .getElementById('return-to-menu-btn')
        .addEventListener('click', () => {
            document.getElementById('fish-collection-screen').style.display = 'none';
            document.getElementById('song-menu').style.display = 'block';
        });
});

function playCatchGif() {
    fishGif.src = 'images/gif/catch.gif';
    setTimeout(() => {
        fishGif.src = 'images/gif/idle.gif';
    }, 2000); // match your GIF length
}

function showGameplayUI() {
    document.getElementById("note-bar").style.display = "block";
    document.getElementById("hud").style.display = "block";
    document.getElementById("stopwatch-container").style.display = "block";
    document.getElementById("beatmap-name").style.display = "block";
    document.getElementById("pause-btn").style.display = "inline-block"; // buttons usually need this
    document.getElementById("fish-gif-container").style.display = "block";
}
