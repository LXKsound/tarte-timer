const CONFIG = {
  tarteHour: 15,
  tarteMinute: 0,
  celebrationMinutes: 60,
  rightMessages: [
    ["A HAPPY", "COLLEAGUE", "=", "A COLLEAGUE", "WHO EATS", "TARTE"],
    ["TEAM JOY", "=", "A SLICE", "OF TARTE", "AND A", "SMILE"],
    ["GOOD MOOD", "COMES WITH", "BUTTER", "SUGAR", "AND A", "FORK"]
  ],
  plaqueMessages: [
    "ONE TARTE AT A TIME,<br>WE CHANGE THE WORLD.",
    "A SMALL SLICE,<br>A GREAT DAY.",
    "TEAM SPIRIT RISES<br>WITH EVERY TARTE."
  ]
};

const els = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
  boardFooter: document.getElementById("boardFooter"),
  plaque: document.querySelector(".plaque"),
  plaqueText: document.getElementById("plaqueText"),
  rightQuote: document.querySelector(".right-quote"),
  right: [
    document.getElementById("right1"),
    document.getElementById("right2"),
    document.getElementById("right3"),
    document.getElementById("right4"),
    document.getElementById("right5"),
    document.getElementById("right6")
  ]
};

const pad = (n) => String(n).padStart(2, "0");

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
  if (!el) return;
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
    els.boardFooter.textContent = "C’EST L’HEURE DE LA TARTE.";
    return;
  }

  const diff = Math.max(0, target - now);
  const totalSeconds = Math.floor(diff / 1000);

  setDigit(els.days, pad(Math.floor(totalSeconds / 86400)));
  setDigit(els.hours, pad(Math.floor((totalSeconds % 86400) / 3600)));
  setDigit(els.minutes, pad(Math.floor((totalSeconds % 3600) / 60)));
  setDigit(els.seconds, pad(totalSeconds % 60));
  els.boardFooter.textContent = "LET’S STAY PRODUCTIVE… UNTIL TARTE.";
}

let msgIndex = 0;
function rotateDynamicSigns() {
  els.rightQuote.classList.add("fade");
  els.plaque.classList.add("fade");

  setTimeout(() => {
    const right = CONFIG.rightMessages[msgIndex % CONFIG.rightMessages.length];
    els.right.forEach((el, i) => { el.textContent = right[i] || ""; });
    els.plaqueText.innerHTML = CONFIG.plaqueMessages[msgIndex % CONFIG.plaqueMessages.length];
    els.rightQuote.classList.remove("fade");
    els.plaque.classList.remove("fade");
    msgIndex += 1;
  }, 220);
}

updateCountdown();
rotateDynamicSigns();
setInterval(updateCountdown, 1000);
setInterval(rotateDynamicSigns, 5000);


/* Mobile timer and dynamic text support */
const mobileEls = {
  days: document.getElementById("mDays"),
  hours: document.getElementById("mHours"),
  minutes: document.getElementById("mMinutes"),
  seconds: document.getElementById("mSeconds"),
  footer: document.getElementById("mobileBoardFooter"),
  quote: document.getElementById("mobileQuote"),
  plaque: document.getElementById("mobilePlaqueText")
};

function updateMobileCountdown() {
  const now = new Date();
  const { target, isNow } = getTarget(now);
  if (isNow) {
    setDigit(mobileEls.days, "00");
    setDigit(mobileEls.hours, "00");
    setDigit(mobileEls.minutes, "00");
    setDigit(mobileEls.seconds, "00");
    if (mobileEls.footer) mobileEls.footer.textContent = "It is officially tarte time.";
    return;
  }
  const diff = Math.max(0, target - now);
  const totalSeconds = Math.floor(diff / 1000);
  setDigit(mobileEls.days, pad(Math.floor(totalSeconds / 86400)));
  setDigit(mobileEls.hours, pad(Math.floor((totalSeconds % 86400) / 3600)));
  setDigit(mobileEls.minutes, pad(Math.floor((totalSeconds % 3600) / 60)));
  setDigit(mobileEls.seconds, pad(totalSeconds % 60));
  if (mobileEls.footer) mobileEls.footer.textContent = "Let’s stay productive… until tarte.";
}

function updateMobileMessages() {
  if (mobileEls.plaque && typeof CONFIG !== "undefined" && CONFIG.plaqueMessages) {
    mobileEls.plaque.innerHTML = CONFIG.plaqueMessages[(msgIndex - 1 + CONFIG.plaqueMessages.length) % CONFIG.plaqueMessages.length];
  }
  if (mobileEls.quote && typeof CONFIG !== "undefined" && CONFIG.rightMessages) {
    const right = CONFIG.rightMessages[(msgIndex - 1 + CONFIG.rightMessages.length) % CONFIG.rightMessages.length];
    mobileEls.quote.textContent = right.join(" ").replace(" =", " is");
  }
}

updateMobileCountdown();
updateMobileMessages();
setInterval(updateMobileCountdown, 1000);
setInterval(updateMobileMessages, 5000);
