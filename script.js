// =========================
// AURA KAWAKI227 SYSTEM
// =========================

// LOADER

window.addEventListener("load", () => {

setTimeout(() => {

document.getElementById("loader").style.display = "none";

}, 4500);

});

// =========================
// MATRIX EFFECT
// =========================

const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters =
"アカサタナハマヤラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const fontSize = 16;

const columns = canvas.width / fontSize;

const drops = [];

for(let i=0;i<columns;i++){

drops[i]=1;

}

function drawMatrix(){

ctx.fillStyle = "rgba(0,0,0,0.05)";
ctx.fillRect(0,0,canvas.width,canvas.height);

ctx.fillStyle = "#00ff88";
ctx.font = fontSize + "px monospace";

for(let i=0;i<drops.length;i++){

const text =
letters.charAt(
Math.floor(
Math.random()*letters.length
)
);

ctx.fillText(
text,
i*fontSize,
drops[i]*fontSize
);

if(
drops[i]*fontSize > canvas.height
&&
Math.random() > 0.975
){

drops[i]=0;

}

drops[i]++;

}

}

setInterval(drawMatrix,33);

// =========================
// VIEW SOURCE
// =========================

const result =
document.getElementById("result");

const viewBtn =
document.getElementById("viewBtn");

viewBtn.addEventListener(
"click",
viewSource
);

async function viewSource(){

const url =
document.getElementById("urlInput").value;

if(!url){

alert("Enter URL");

return;

}

document.getElementById(
"statusText"
).innerText =
"LOADING";

try{

const response =
await fetch(
"http://localhost:3000/view-source?url="
+
encodeURIComponent(url)
);

const html =
await response.text();

result.textContent = html;

updateStats(html);

analyzeHTML(html);

saveHistory(url);

document.getElementById(
"statusText"
).innerText =
"SUCCESS";

}catch(err){

result.textContent =
"ERROR : "
+
err.message;

document.getElementById(
"statusText"
).innerText =
"FAILED";

}

}

// =========================
// UPDATE STATS
// =========================

function updateStats(code){

const lines =
code.split("\n").length;

document.getElementById(
"lineCount"
).innerText =
lines;

const size =
(code.length/1024)
.toFixed(2);

document.getElementById(
"sizeCount"
).innerText =
size+" KB";

}

// =========================
// ANALYZER
// =========================

function analyzeHTML(html){

const parser =
new DOMParser();

const doc =
parser.parseFromString(
html,
"text/html"
);

document.getElementById(
"imgCount"
).innerText =
doc.images.length;

document.getElementById(
"linkCount"
).innerText =
doc.links.length;

document.getElementById(
"scriptCount"
).innerText =
doc.querySelectorAll(
"script"
).length;

document.getElementById(
"cssCount"
).innerText =
doc.querySelectorAll(
"link[rel='stylesheet']"
).length;

}

// =========================
// COPY
// =========================

document.getElementById(
"copyBtn"
).onclick = () => {

navigator.clipboard.writeText(
result.textContent
);

alert(
"Copied Successfully"
);

};

// =========================
// DOWNLOAD
// =========================

document.getElementById(
"downloadBtn"
).onclick = () => {

const blob =
new Blob(
[result.textContent],
{
type:"text/html"
}
);

const a =
document.createElement("a");

a.href =
URL.createObjectURL(blob);

a.download =
"source-code.html";

a.click();

};

// =========================
// CLEAR
// =========================

document.getElementById(
"clearBtn"
).onclick = () => {

result.textContent =
"SYSTEM READY...";

document.getElementById(
"lineCount"
).innerText = "0";

document.getElementById(
"sizeCount"
).innerText = "0 KB";

};

// =========================
// HISTORY
// =========================

function saveHistory(url){

let history =

JSON.parse(
localStorage.getItem(
"auraHistory"
)
)
||
[];

if(!history.includes(url)){

history.unshift(url);

}

history =
history.slice(0,10);

localStorage.setItem(
"auraHistory",
JSON.stringify(history)
);

renderHistory();

}

function renderHistory(){

const list =
document.getElementById(
"historyList"
);

list.innerHTML="";

const history =
JSON.parse(
localStorage.getItem(
"auraHistory"
)
)
||
[];

history.forEach(url=>{

const li =
document.createElement("li");

li.innerText=url;

list.appendChild(li);

});

}

renderHistory();

// =========================
// ENTER SYSTEM BUTTON
// =========================

document
.getElementById(
"enterBtn"
)
.addEventListener(
"click",
()=>{

window.scrollTo({

top:
document.querySelector(
".viewer"
).offsetTop,

behavior:
"smooth"

});

}
);

// =========================
// RESIZE MATRIX
// =========================

window.addEventListener(
"resize",
()=>{

canvas.width =
window.innerWidth;

canvas.height =
window.innerHeight;

}
);

// =========================
// AURA SOUND
// =========================

const audio =
new Audio(
"assets/aura.mp3"
);

document
.getElementById(
"enterBtn"
)
.addEventListener(
"click",
()=>{

audio.play();

}
);

// =========================
// TERMINAL EFFECT
// =========================

const messages = [

"SYSTEM ONLINE...",
"SECURITY CHECK...",
"AURA PROTOCOL...",
"ACCESS GRANTED...",
"KAWAKI227 ACTIVE..."

];

let index = 0;

setInterval(()=>{

if(index <
messages.length){

console.log(
messages[index]
);

index++;

}

},1000);