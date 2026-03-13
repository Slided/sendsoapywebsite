let chart;
let playerHistory = [];

async function fetchStatus(){

try{

let res = await fetch("https://api.mcsrvstat.us/3/pls.sendsoapytit.pics");
let data = await res.json();

let dot = document.getElementById("statusDot");
let text = document.getElementById("statusText");

if(data.online){

dot.style.background="#22c55e";
text.innerText="ONLINE";

document.getElementById("players").innerText =
data.players.online + " / " + data.players.max;

document.getElementById("version").innerText = data.version;

document.getElementById("motd").innerText =
data.motd.clean.join(" ");

document.getElementById("serverIcon").src =
"data:image/png;base64," + data.icon;

playerHistory.push(data.players.online);
if(playerHistory.length > 20) playerHistory.shift();

updateChart();

updatePlayerHeads(data);

}else{

dot.style.background="#ef4444";
text.innerText="OFFLINE";

}

}catch(e){

document.getElementById("statusText").innerText="RECONNECTING...";
setTimeout(fetchStatus,5000);

}

}

function updatePlayerHeads(data){

let list = document.getElementById("playerList");
list.innerHTML="";

if(!data.players.list) return;

data.players.list.forEach(p=>{
let img = document.createElement("img");
img.className="playerHead";
img.src="https://mc-heads.net/avatar/" + p;
list.appendChild(img);
});

}

function updateChart(){

if(!chart){

let ctx = document.getElementById("playerChart");

chart = new Chart(ctx,{
type:"line",
data:{
labels: playerHistory.map((_,i)=>i),
datasets:[{
label:"Players",
data:playerHistory,
borderColor:"#22c55e",
fill:false
}]
},
options:{
scales:{
y:{beginAtZero:true}
}
}
});

}else{
chart.data.datasets[0].data = playerHistory;
chart.update();
}

}

function copyIP(){
navigator.clipboard.writeText("pls.sendsoapytit.pics");
alert("Copied!");
}

fetchStatus();
setInterval(fetchStatus,10000);