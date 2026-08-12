const songs = [
    {
        title: "Bring Me To Life",
        artist: "Evanescence",
        file: "music/song1.mp3",
        cover: "images/cover.jpg"
    },

    {
        title: "Love Bites So Do I",
        artist: "Halestorm",
        file: "music/song2.mp3",
        cover: "images/cover2.png"
    },

    {
        title: "Breaking The Habit",
        artist: "Linkin Park",
        file: "music/song3.mp3",
        cover: "images/cover3.jpg"
    }
];


// ==========================
// ELEMENTY
// ==========================

const audio = new Audio(songs[0].file);

const playButton = document.getElementById("play");
const progress = document.getElementById("progress");

const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");

const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");

const homeButton = document.getElementById("home-button");
const songsButton = document.getElementById("songs-button");

const evanescenceButton =
    document.getElementById("evanescence");

const halestormButton =
    document.getElementById("halestorm");

const linkinParkButton =
    document.getElementById("linkin-park");

const songTitle =
    document.getElementById("song-title");

const artist =
    document.getElementById("artist");

const albumCover =
    document.getElementById("album-cover");

const songsList =
    document.getElementById("songs-list");

const playerView =
    document.getElementById("player-view");

const songsView =
    document.getElementById("songs-view");


// ==========================
// AKTUALNA PIOSENKA
// ==========================

let currentSong = 0;

let currentPlaylist = songs;


// ==========================
// FUNKCJA ZMIANY PIOSENKI
// ==========================

function loadSong(index) {

    currentSong = index;

    const song = currentPlaylist[currentSong];

    audio.src = song.file;

    songTitle.textContent = song.title;

    artist.textContent = song.artist;

    albumCover.src = song.cover;

    audio.currentTime = 0;

    progress.value = 0;

    currentTime.textContent = "0:00";

    duration.textContent = "0:00";
}


// ==========================
// PLAY / PAUSE
// ==========================

playButton.addEventListener("click", function () {

    if (audio.paused) {

        audio.play();

        playButton.textContent = "⏸";

    } else {

        audio.pause();

        playButton.textContent = "▶";

    }

});


// ==========================
// AKTUALIZACJA CZASU
// ==========================

audio.addEventListener("timeupdate", function () {

    if (!audio.duration) return;

    const current = audio.currentTime;

    const total = audio.duration;

    progress.value =
        (current / total) * 100;

    currentTime.textContent =
        formatTime(current);

});


// ==========================
// DŁUGOŚĆ PIOSENKI
// ==========================

audio.addEventListener("loadedmetadata", function () {

    duration.textContent =
        formatTime(audio.duration);

});


// ==========================
// PRZEWIJANIE
// ==========================

progress.addEventListener("input", function () {

    if (!audio.duration) return;

    const time =
        (progress.value / 100) *
        audio.duration;

    audio.currentTime = time;

    currentTime.textContent =
        formatTime(time);

});


// ==========================
// FORMATOWANIE CZASU
// ==========================

function formatTime(seconds) {

    const minutes =
        Math.floor(seconds / 60);

    const remainingSeconds =
        Math.floor(seconds % 60);

    return `${minutes}:${remainingSeconds
        .toString()
        .padStart(2, "0")}`;
}


// ==========================
// NASTĘPNA PIOSENKA
// ==========================

nextButton.addEventListener("click", function () {

    currentSong++;

    if (currentSong >= currentPlaylist.length) {

        currentSong = 0;

    }

    loadSong(currentSong);

    audio.play();

    playButton.textContent = "⏸";

});


// ==========================
// POPRZEDNIA PIOSENKA
// ==========================

previousButton.addEventListener("click", function () {

    currentSong--;

    if (currentSong < 0) {

        currentSong =
            currentPlaylist.length - 1;

    }

    loadSong(currentSong);

    audio.play();

    playButton.textContent = "⏸";

});


// ==========================
// FUNKCJA PLAYLISTY
// ==========================

function selectPlaylist(artistName) {

    currentPlaylist =
        songs.filter(function (song) {

            return song.artist === artistName;

        });

    currentSong = 0;

    loadSong(currentSong);

    audio.play();

    playButton.textContent = "⏸";

}


// ==========================
// EVANESCENCE
// ==========================

evanescenceButton.addEventListener("click", function () {

    selectPlaylist("Evanescence");

});


// ==========================
// HALESTORM
// ==========================

halestormButton.addEventListener("click", function () {

    selectPlaylist("Halestorm");

});


// ==========================
// LINKIN PARK
// ==========================

linkinParkButton.addEventListener("click", function () {

    selectPlaylist("Linkin Park");

});


// ==========================
// POKAŻ WSZYSTKIE PIOSENKI
// ==========================

function showSongs() {

    songsList.innerHTML = "";


    songs.forEach(function (song, index) {

        const songElement =
            document.createElement("button");


        songElement.classList.add("song-item");


        songElement.innerHTML = `
            <span class="song-name">
                ${song.title}
            </span>

            <span class="song-artist">
                ${song.artist}
            </span>
        `;


        songElement.addEventListener("click", function () {

            currentPlaylist = songs;

            loadSong(index);

            playerView.style.display = "block";

            songsView.style.display = "none";

            audio.play();

            playButton.textContent = "⏸";

        });


        songsList.appendChild(songElement);

    });

}


// ==========================
// PRZYCISK SONGS
// ==========================

songsButton.addEventListener("click", function () {

    playerView.style.display = "none";

    songsView.style.display = "block";

    showSongs();

});


// ==========================
// PRZYCISK HOME
// ==========================

homeButton.addEventListener("click", function () {

    playerView.style.display = "block";

    songsView.style.display = "none";

});


// ==========================
// START
// ==========================

songsView.style.display = "none";

console.log(songs);