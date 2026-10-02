const $ = (id) => document.getElementById(id);

const places = [
  "Mount Royal Lookout (Belvédère Kondiaronk)",
  "Old Port of Montreal",
  "Notre-Dame Basilica",
  "Jean-Talon Market",
  "Saint Joseph's Oratory",
  "Botanical Garden",
  "Lachine Canal",
  "Parc La Fontaine",
  "Atwater Market",
  "Biosphere (Parc Jean-Drapeau)",
];

const CORRECT_PLACE = "Saint Joseph's Oratory";
const WRONG_LIGHTHOUSE = "Chih dushtu, the correct answer was we watched the sunset by the sea, you freak";

let current = 0;
function go(n) {
  document.querySelectorAll(".page").forEach((p) => p.classList.remove("active"));
  $("p" + n).classList.add("active");
  current = n;
  $("back").classList.toggle("hidden", n === 0 || n === 10);
}

$("back").addEventListener("click", () => go(current - 1));

const wrongCount = {};
function shake(id) {
  const el = $(id);
  el.classList.remove("shake");
  void el.offsetWidth;
  el.classList.add("shake");
}
function fail(id, text) {
  wrongCount[id] = (wrongCount[id] || 0) + 1;
  say(id, text, false);
  if (wrongCount[id] >= 2) shake(id);
}

document.querySelectorAll(".next").forEach((b) =>
  b.addEventListener("click", () => go(current + 1))
);

function say(id, text, good) {
  const el = $(id);
  el.textContent = text;
  el.className = "msg " + (good ? "good" : "bad");
}

// Step 1: Starbucks drink
$("check1").addEventListener("click", () => {
  const words = $("q1").value.toLowerCase().match(/[a-z]+/g) || [];
  const ok = ["pink", "drink", "with", "chocolate", "foam"].every((w) => words.includes(w));
  if (ok) {
    say("m1", "Correct! 💗", true);
    $("n1").classList.remove("hidden");
  } else {
    fail("m1", "Hmm, that's not right. Are you really Sokina? 🤨");
    $("n1").classList.add("hidden");
  }
});

// Step 2: first meet + lighthouse
[...places].sort(() => Math.random() - 0.5).forEach((p) => {
  const o = document.createElement("option");
  o.value = p;
  o.textContent = p;
  $("q2").appendChild(o);
});
const ph = document.createElement("option");
ph.value = "";
ph.textContent = "Choose a place...";
ph.selected = true;
$("q2").prepend(ph);

$("check2").addEventListener("click", () => {
  if ($("q2").value === CORRECT_PLACE) {
    say("m2", "Correct! 💗", true);
    $("lighthouse").classList.remove("hidden");
  } else {
    fail("m2", "Nope, try again!");
  }
});

$("check3").addEventListener("click", () => {
  const text = $("q3").value.toLowerCase().replace(/[^a-z]/g, "");
  if (text.includes("makeout") || text.includes("madeout")) {
    say("m3", WRONG_LIGHTHOUSE, true);
    $("n2").classList.remove("hidden");
  } else {
    fail("m3", "Wrong answer, try again!");
    $("n2").classList.add("hidden");
  }
});

// Step 3: trip photo
$("tripImg").addEventListener("error", () => {
  $("tripImg").alt = "Add your photo at images/trip.jpg";
});

$("check4").addEventListener("click", () => {
  const text = $("q4").value.toLowerCase().replace(/[^a-z]/g, "");
  if (text.includes("monttremblant")) {
    say("m4", "Correct! 💗", true);
    $("n3").classList.remove("hidden");
  } else {
    fail("m4", "Not quite, try again!");
    $("n3").classList.add("hidden");
  }
});

// Do you like Janson?
$("likeYes").addEventListener("click", () => {
  say("m5", "Correct! 💗", true);
  $("n5").classList.remove("hidden");
});
$("likeNo").addEventListener("click", () => {
  fail("m5", "Aar kisu? Etai dekhar baki chilo 😢");
  $("n5").classList.add("hidden");
});
$("likeIktu").addEventListener("click", () => {
  $("likeIktu").textContent = "Onek";
  say("m5", "onek? damn ami bhabsilam iktu but not surprised", true);
  $("n5").classList.remove("hidden");
});

// Why do you like Shadman?
$("done6").addEventListener("click", () => {
  say("m6", "tau bhalo je bolo nai fah dih", true);
  $("n6").classList.remove("hidden");
});

// Ask out
$("yes").addEventListener("click", () => {
  go(10);
  for (let i = 0; i < 40; i++) setTimeout(spawnHeart, i * 80);
});

$("no").addEventListener("mouseover", dodge);
$("no").addEventListener("touchstart", (e) => { e.preventDefault(); dodge(); });
$("no").addEventListener("click", dodge);
function dodge() {
  const b = $("no");
  b.style.position = "absolute";
  b.style.left = Math.random() * 70 + "%";
  b.style.top = Math.random() * 70 + "%";
}

// Floating hearts
function spawnHeart() {
  const h = document.createElement("div");
  h.className = "heart";
  h.textContent = ["💗", "💖", "💕", "🌸"][Math.floor(Math.random() * 4)];
  h.style.left = Math.random() * 100 + "vw";
  h.style.fontSize = 14 + Math.random() * 22 + "px";
  h.style.animationDuration = 5 + Math.random() * 5 + "s";
  $("hearts").appendChild(h);
  setTimeout(() => h.remove(), 10000);
}
setInterval(spawnHeart, 700);
