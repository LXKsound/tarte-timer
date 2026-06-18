const CONFIG = {
  tarteHour: 15,
  tarteMinute: 0,
  celebrationMinutes: 60,
  messages: [
    "Stay productive… until tarte.",
    "Forks are being synchronized.",
    "Butter pressure is excellent.",
    "The pastry portal is warming up.",
    "Colleague morale is rising."
  ],
  headlines: [
    ["It’s time for", "Tarte!"],
    ["Prepare for", "Tarte!"],
    ["Next stop:", "Tarte!"],
    ["Operation", "Tarte!"]
  ],
  zeppelin: [
    "Tarte makes the timeline better ♥",
    "One slice can save the day ♥",
    "Powered by butter and steam ♥",
    "Colleagues deserve tarte ♥"
  ],
  menuSets: [
    ["Lemon Tarte 🍋", "Raspberry Tarte 🍓", "Chocolate Tarte 🍫"],
    ["Berry Tarte 🫐", "Apple Tarte 🍎", "Caramel Tarte ✨"],
    ["Lemon Dream 🍋", "Chocolate Kiss 🍫", "Pastry of the Day ♥"]
  ],
  rightMessages: [
    ["A happy colleague", "is a colleague", "who eats tarte"],
    ["Good mood", "is powered by", "one more slice"],
    ["Productivity", "rises sharply", "after dessert"]
  ],
  plaques: [
    "One tarte at a time, we change the world.",
    "Tiny forks, big feelings.",
    "Dessert is a team-building exercise.",
    "Keep calm and follow the pastry."
  ]
};

const els = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
  boardStatus: document.getElementById("boardStatus"),
  mainHeadline: document.getElementById("mainHeadline"),
  zeppelinText: document.getElementById("zeppelinText"),
  awningText: document.getElementById("awningText"),
  menuOne: document.getElementById("menuOne"),
  menuTwo: document.getElementById("menuTwo"),
  menuThree: document.getElementById("menuThree"),
  rightLineOne: document.getElementById("rightLineOne"),
  rightLineTwo: document.getElementById("rightLineTwo"),
  rightLineThree: document.getElementById("rightLineThree"),
  plaqueText: document.getElementById("plaqueText"),
  boardButton: document.getElementById("boardButton"),
  colleagueButton: document.getElementById("colleagueButton")
};

const pad = value => String(value).padStart(2, "0");

function getTarget(now = new Date()) {
  const today = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    CONFIG.tarteHour,
    CONFIG.tarteMinute,
    0,
    0
  );

  const celebrationEnd = new Date(today.getTime() + CONFIG.celebrationMinutes * 60 * 1000);

  if (now > celebrationEnd) {
    return { target: new Date(today.getTime() + 24 * 60 * 60 * 1000), isNow: false };
  }

  return { target: today, isNow: now >= today && now <= celebrationEnd };
}

function setDigit(el, value) {
  if (el.textContent === value) return;
  el.textContent = value;
  el.classList.remove("tick");
  void el.offsetWidth;
  el.classList.add("tick");
}

function updateCountdown() {
  const now = new Date();
  const { target, isNow } = getTarget(now);

  if (isNow) {
    setDigit(els.days, "00");
    setDigit(els.hours, "00");
    setDigit(els.minutes, "00");
    setDigit(els.seconds, "00");
    els.boardStatus.textContent = "It is officially tarte time.";
    return;
  }

  const diff = Math.max(0, target - now);
  const totalSeconds = Math.floor(diff / 1000);

  setDigit(els.days, pad(Math.floor(totalSeconds / 86400)));
  setDigit(els.hours, pad(Math.floor((totalSeconds % 86400) / 3600)));
  setDigit(els.minutes, pad(Math.floor((totalSeconds % 3600) / 60)));
  setDigit(els.seconds, pad(totalSeconds % 60));
}

let index = 0;

function rotateText() {
  index += 1;

  const headline = CONFIG.headlines[index % CONFIG.headlines.length];
  els.mainHeadline.innerHTML = `${headline[0]} <span>${headline[1]}</span>`;

  els.boardStatus.textContent = CONFIG.messages[index % CONFIG.messages.length];
  els.zeppelinText.textContent = CONFIG.zeppelin[index % CONFIG.zeppelin.length];
  els.plaqueText.textContent = CONFIG.plaques[index % CONFIG.plaques.length];

  const menu = CONFIG.menuSets[index % CONFIG.menuSets.length];
  els.menuOne.textContent = menu[0];
  els.menuTwo.textContent = menu[1];
  els.menuThree.textContent = menu[2];

  const right = CONFIG.rightMessages[index % CONFIG.rightMessages.length];
  els.rightLineOne.textContent = right[0];
  els.rightLineTwo.textContent = right[1];
  els.rightLineThree.textContent = right[2];

  document.querySelectorAll(".menu-line, .right-message").forEach(el => {
    el.classList.remove("visible");
    void el.offsetWidth;
    el.classList.add("visible");
  });
}

function confetti(amount = 34) {
  const colors = ["#e06a78", "#d29f4d", "#f2dfb1", "#a93b3b", "#7f4b2c"];

  for (let i = 0; i < amount; i += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = `${Math.random() * 0.4}s`;
    document.body.append(piece);
    setTimeout(() => piece.remove(), 2100);
  }
}

els.boardButton.addEventListener("click", () => {
  rotateText();
  confetti();
});

els.colleagueButton.addEventListener("click", () => {
  els.awningText.textContent = "♥ Colleague Space unlocked: bring a fork! ♥";
  rotateText();
  confetti(22);
});

updateCountdown();
setInterval(updateCountdown, 1000);
setInterval(rotateText, 6000);
