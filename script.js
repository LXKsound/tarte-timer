const CONFIG = {
  tarteHour: 15,
  tarteMinute: 0,
  celebrationMinutes: 60
};

const els = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
  boardFooter: document.getElementById("boardFooter")
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

updateCountdown();
setInterval(updateCountdown, 1000);
