const titleChanege = (str) => {
  return (document.title = str);
};
titleChanege("My music player");

const audioDb = [
  {
    title: "lut gaye Song",
    artist: "jubin nautial",
    audio: "./assets/music/lut gaye.m4a",
    img: "./assets/Images/lutgaye.webp",
  },
  {
    title: "Main Jis Din Bhulaa Du",
    artist: "jubin nautial",
    audio: "./assets/music/jis din.m4a",
    img: "./assets/Images/mian.webp",
  },

  {
    title: "Baarish Mein Tum",
    artist: "Neha Kakkar, Rohanpreet Singh",
    audio: "./assets/music/pasand.m4a",
    img: "./assets/Images/tum.webp",
  },
];

const songTitle = document.querySelector(".song-title");
const songArtist = document.querySelector(".song-artist");
const image = document.querySelector(".img-fluid");
const audio = document.querySelector("audio");
const startTime = document.querySelector(".start-time");
const endTime = document.querySelector(".end-time");
const progressBar = document.querySelector("progress");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const playBtn = document.getElementById("play");

let songcount = 0;
let isPlay = false;
const loadSong = (song) => {
  songTitle.innerHTML = song.title;
  songArtist.innerHTML = song.artist;
  image.src = song.img;
  audio.src = song.audio;
};

loadSong(audioDb[songcount]);

const nextMusic = () => {
  songcount = (songcount + 1) % audioDb.length;
  loadSong(audioDb[songcount]);
  playMusic();
};

const prevMusic = () => {
  songcount = (songcount - 1 + audioDb.length) % audioDb.length;
  loadSong(audioDb[songcount]);
  playMusic();
};

const percentage = (val,totalVal)=>{
   return result = (val/totalVal) * 100
}


const secToMin = (sec)=>{
   let min = Math.floor (sec / 60);
   let secRem = Math.floor(sec % 60);
   min = min<10? `0${min}` : `${min}`;
   secRem = secRem<10? `0${secRem}` : `${secRem}`
   return `${min}:${secRem}`;
}

const playMusic = () => {
   playBtn.classList = "fa-sharp fa-solid fa-pause";
   audio.play();
   image.classList.add("anime");
   audio.addEventListener("timeupdate", (event) => {
    const {currentTime, duration} = event.srcElement;
    progressBar.value = percentage(currentTime, duration);
    progressBar.max = 100;
    if(currentTime === duration){
      nextMusic();
    }
    startTime.innerText = secToMin(currentTime);
    endTime.innerText = secToMin(duration);
   });

   isPlay = true;
 };

 const pauseMusic = () => {
   playBtn.classList = "fa-sharp fa-solid fa-play";
   audio.pause();
   isPlay = false;
 };

prevBtn.addEventListener("click", prevMusic);
nextBtn.addEventListener("click", nextMusic);
playBtn.addEventListener("click", () => {
  image.classList.toggle("anime");
  isPlay ? pauseMusic() : playMusic();
});
