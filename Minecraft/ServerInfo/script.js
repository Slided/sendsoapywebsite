let chart;
let playerHistory = [];

async function fetchStatus() {

try {

let res = await fetch("https://api.mcsrvstat.us/3/pls.sendsoapytit.pics");
let data = await res.json();

let dot = document.getElementById("statusDot");
let text = document.getElementById("statusText");

if (data.online) {

dot.style.background = "#22c55e";
text.innerText = "ONLINE";

let online = data.players?.online ?? 0;
let max = data.players?.max ?? 0;

document.getElementById("players").innerText = online + " / " + max;
document.getElementById("version").innerText = data.version || "Unknown";

let motd = data.motd?.clean?.join(" ") || "No MOTD";
document.getElementById("motd").innerText = motd;

// Use hosted icon (safer)
document.getElementById("serverIcon").src =
"https://sendsoapytit.pics/Minecraft/Guide/server-icon.png";

playerHistory.push(online);
if (playerHistory.length > 20) playerHistory.shift();

updateChart();
updatePlayerHeads(data);

} else {

dot.style.background = "#ef4444";
text.innerText = "OFFLINE";

}

} catch (e) {

console.log("Reconnect attempt...");
document.getElementById("statusText").innerText = "RECONNECTING...";
setTimeout(fetchStatus, 5000);

}

}

function updatePlayerHeads(data) {

let list = document.getElementById("playerList");
list.innerHTML = "";

if (!data.players || !data.players.list) return;

data.players.list.forEach(p => {

let img = document.createElement("img");
img.className = "playerHead";
img.src = "https://mc-heads.net/avatar/" + p;
list.appendChild(img);

});

}

function updateChart() {

let canvas = document.getElementById("playerChart");
if (!canvas) return;

if (!chart) {

chart = new Chart(canvas, {
type: "line",
data: {
labels: playerHistory.map((_, i) => i),
datasets: [{
label: "Players",
data: playerHistory,
borderColor: "#22c55e",
tension: 0.3,
fill: false
}]
},
options: {
responsive: true,
plugins: {
legend: { display: false }
},
scales: {
y: { beginAtZero: true }
}
}
});

} else {

chart.data.labels = playerHistory.map((_, i) => i);
chart.data.datasets[0].data = playerHistory;
chart.update();

}

}

function copyIP() {
navigator.clipboard.writeText("pls.sendsoapytit.pics");
alert("Copied!");
}

fetchStatus();
setInterval(fetchStatus, 10000);