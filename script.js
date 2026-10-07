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
  $("back").classList.toggle("hidden", n === 0);
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

function react(id, filename) {
  const image = $(id);
  clearTimeout(image.hideTimer);
  image.classList.remove("showing");
  image.classList.add("hidden");
  image.onload = () => {
    image.classList.remove("hidden");
    void image.offsetWidth;
    image.classList.add("showing");
    image.hideTimer = setTimeout(() => {
      image.classList.remove("showing");
      image.classList.add("hidden");
    }, 1600);
  };
  image.onerror = () => {
    image.classList.remove("showing");
    image.classList.add("hidden");
  };
  image.onanimationend = () => {
    if (image.classList.contains("showing")) {
      clearTimeout(image.hideTimer);
      image.classList.remove("showing");
      image.classList.add("hidden");
    }
  };
  image.src = `images/memes/${filename}`;
}

function hideReaction(id) {
  const image = $(id);
  clearTimeout(image.hideTimer);
  image.classList.remove("showing");
  image.classList.add("hidden");
}

// Step 1: Starbucks drink
$("check1").addEventListener("click", () => {
  const words = $("q1").value.toLowerCase().match(/[a-z]+/g) || [];
  const ok = ["pink", "drink", "with", "chocolate", "foam"].every((w) => words.includes(w));
  if (ok) {
    say("m1", "Correct! 💗", true);
    react("r1", "happy2.jpg");
    $("n1").classList.remove("hidden");
  } else if (words.length === 2 && words.includes("pink") && words.includes("drink")) {
    fail("m1", "Pink Drink with what? Give me the full order 😭");
    react("r1", "mock.gif");
    $("n1").classList.add("hidden");
  } else {
    fail("m1", "Hmm, that's not right. Are you really Mokarrama? 🤨");
    react("r1", "sus.jpg");
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
    react("r2", "celebrate.jpg");
    $("lighthouse").classList.remove("hidden");
  } else {
    fail("m2", "Nope, try again!");
    react("r2", "sad2.jpg");
  }
});

$("check3").addEventListener("click", () => {
  const text = $("q3").value.toLowerCase().replace(/[^a-z]/g, "");
  if (text.includes("makeout") || text.includes("madeout")) {
    say("m3", WRONG_LIGHTHOUSE, true);
    react("r3", "mock.gif");
    $("n2").classList.remove("hidden");
  } else {
    fail("m3", "Wrong answer, try again!");
    react("r3", "sad2.jpg");
    $("n2").classList.add("hidden");
  }
});

// Step 3: trip photo
$("tripImg").addEventListener("error", () => {
  $("tripImg").alt = "Add your photo at images/memes/trip.jpg";
});

$("check4").addEventListener("click", () => {
  const text = $("q4").value.toLowerCase().replace(/[^a-z]/g, "");
  if (text === "tremblant" || text.includes("monttremblant")) {
    say("m4", "Correct! 💗", true);
    react("r4", "happy4.jpg");
    $("n3").classList.remove("hidden");
  } else {
    fail("m4", "Not quite, try again!");
    react("r4", "sus.jpg");
    $("n3").classList.add("hidden");
  }
});

// Do you like Shadman?
$("likeYes").addEventListener("click", () => {
  say("m5", "Correct! 💗", true);
  react("r5", "happy2.jpg");
  $("n5").classList.remove("hidden");
});
$("likeNo").addEventListener("click", () => {
  fail("m5", "Aar kisu? Etai dekhar baki chilo 😢");
  react("r5", "sad2.jpg");
  $("n5").classList.add("hidden");
});
$("likeIktu").addEventListener("click", () => {
  $("likeIktu").textContent = "Onek";
  say("m5", "onek? damn ami bhabsilam iktu but not surprised", true);
  hideReaction("r5");
  $("n5").classList.remove("hidden");
});

$("wormNo").addEventListener("click", () => {
  say("wormMessage", "Jak tau bhalo je corny na", false);
  react("wormMeme", "sus.jpg");
  $("wormNext").classList.remove("hidden");
});
$("wormHeck").addEventListener("click", () => {
  say("wormMessage", "Yuh ikr test korlam arki", true);
  react("wormMeme", "sus2.png");
  $("wormNext").classList.remove("hidden");
});

$("moodYes").addEventListener("click", () => {
  say("moodMessage", "Yes! That makes me happy too 💗", true);
  react("moodMeme", "happy3.jpg");
  $("moodNext").classList.remove("hidden");
});

$("moodNo").addEventListener("mouseover", dodgeMoodNo);
$("moodNo").addEventListener("touchstart", (event) => {
  event.preventDefault();
  dodgeMoodNo();
});
$("moodNo").addEventListener("click", dodgeMoodNo);
function dodgeMoodNo() {
  const button = $("moodNo");
  const maxX = Math.max(12, window.innerWidth - button.offsetWidth - 12);
  const maxY = Math.max(12, window.innerHeight - button.offsetHeight - 12);
  button.style.position = "fixed";
  button.style.zIndex = "10";
  button.style.left = `${12 + Math.random() * (maxX - 12)}px`;
  button.style.top = `${12 + Math.random() * (maxY - 12)}px`;
}

// Why do you like Shadman?
$("done6").addEventListener("click", () => {
  say("m6", "tau bhalo je bolo nai fah dih", true);
  react("r6", "happy.jpeg");
  $("n6").classList.remove("hidden");
});

// Ask out
function acceptProposal() {
  go(12);
  startCelebrationPopups();
  for (let i = 0; i < 40; i++) setTimeout(spawnHeart, i * 80);
}
$("mineHeck").addEventListener("click", acceptProposal);
$("mineAbsolutely").addEventListener("click", acceptProposal);

const celebrationImages = [
  "angry.jpg",
  "askout.jpeg",
  "celebrate.jpg",
  "finalpage.jpeg",
  "finalpage1.jpg",
  "finalpage2.jpg",
  "finalpage3.jpg",
  "finalpage4.jpg",
  "finalpage5.jpg",
  "finalpage6.jpg",
  "finalpage7.jpg",
  "finalpage8.jpg",
  "finalpage9.jpg",
  "finalpage10.jpg",
  "finalpage11.jpg",
  "finalpage12.jpeg",
  "finalpage13.jpg",
  "happy.jpeg",
  "happy2.jpg",
  "happy3.jpg",
  "happy4.jpg",
  "mock.gif",
  "sad.png",
  "sad2.jpg",
  "sad3.jpg",
  "sad4.jpg",
  "sus.jpg",
  "sus2.png",
  "trip.jpg",
];
let celebrationTimer;
let celebrationQueue = [];
function nextCelebrationImage() {
  if (celebrationQueue.length === 0) {
    celebrationQueue = [...celebrationImages].sort(() => Math.random() - 0.5);
  }
  return celebrationQueue.pop();
}
function popCelebrationImage() {
  if (!$("p12").classList.contains("active")) return;
  const image = document.createElement("img");
  image.className = "celebration-sticker";
  image.src = `images/memes/${nextCelebrationImage()}`;
  image.alt = "Celebration meme";
  const size = 90 + Math.random() * 70;
  image.style.width = `${size}px`;
  image.style.left = `${Math.random() * Math.max(0, window.innerWidth - size)}px`;
  image.style.top = `${Math.random() * Math.max(0, window.innerHeight - size)}px`;
  image.style.setProperty("--tilt", `${Math.random() * 30 - 15}deg`);
  image.addEventListener("animationend", () => image.remove(), { once: true });
  image.addEventListener("error", () => image.remove(), { once: true });
  $("celebrationPopups").appendChild(image);
}
function startCelebrationPopups() {
  clearInterval(celebrationTimer);
  $("celebrationPopups").classList.add("active");
  for (let i = 0; i < 8; i++) setTimeout(popCelebrationImage, i * 180);
  celebrationTimer = setInterval(popCelebrationImage, 420);
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
