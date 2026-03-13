let sections = document.querySelectorAll("section");
let dots = document.querySelectorAll(".dot");

window.addEventListener("scroll",()=>{

sections.forEach((sec,i)=>{
let top = window.scrollY;
let offset = sec.offsetTop - 400;
let height = sec.offsetHeight;

if(top >= offset && top < offset + height){
sec.classList.add("show");

dots.forEach(d=>d.classList.remove("active"));
if(dots[i]) dots[i].classList.add("active");
}

});

});

/* COPY IP TOAST */

function copyIP(){
navigator.clipboard.writeText("pls.sendsoapytit.pics");

let toast = document.getElementById("toast");
toast.style.opacity="1";
toast.style.transform="translateX(-50%) translateY(0)";

setTimeout(()=>{
toast.style.opacity="0";
toast.style.transform="translateX(-50%) translateY(100px)";
},2000);
}

/* MUSIC */

let music = document.getElementById("bgMusic");
let muteBtn = document.getElementById("muteBtn");
let volumeSlider = document.getElementById("volumeSlider");

music.volume = volumeSlider.value;

muteBtn.onclick = ()=>{
music.muted = !music.muted;
muteBtn.innerText = music.muted ? "🔇" : "🔊";
}

volumeSlider.oninput = ()=>{
music.volume = volumeSlider.value;
}

/* AUTO PAUSE MUSIC WHEN VIDEO PLAYS */

let vid = document.getElementById("installVideo");

vid.onplay = ()=> music.pause();
vid.onpause = ()=> music.play();
vid.onended = ()=> music.play();