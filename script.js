const CONFIG = {
  restaurantName: "French Kiss Bistro",
  eventName: "Tarte Time",
  tarteHour: 15,
  tarteMinute: 0,
  celebrationMinutes: 60,
  locale: "en-GB",
  messages: [
    "Steam pressure: pastry approved.",
    "Tiny forks are being synchronized.",
    "Lemon tarte morale is rising.",
    "Chocolate tarte negotiations are open.",
    "Berry tarte is entering the timeline.",
    "One more gear turn until happiness.",
    "Please keep elbows clear of the tarte portal."
  ],
  buttonMessages: [
    "Ding ding! Tarte protocol acknowledged.",
    "A small pastry bell echoes through time.",
    "Colleagues have been spiritually notified.",
    "Fork calibration complete.",
    "The Time Machine accepts your dessert request."
  ]
};

const timer = document.querySelector("#timer");
const statusLabel = document.querySelector("#statusLabel");
const targetText = document.querySelector("#targetText");
const microcopy = document.querySelector("#microcopy");
const footerTime = document.querySelector("#footerTime");
const tarteButton = document.querySelector("#tarteButton");

const pad = number => String(number).padStart(2, "0");

function getTodayTarget(now = new Date()) {
  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    CONFIG.tarteHour,
    CONFIG.tarteMinute,
    0,
    0
  );
}

function formatTargetDate(date) {
  const formatter = new Intl.DateTimeFormat(CONFIG.locale, {
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit"
  });

  return formatter.format(date);
}

function updateCountdown() {
  const now = new Date();
  const todayTarget = getTodayTarget(now);
  const celebrationEnd = new Date(todayTarget.getTime() + CONFIG.celebrationMinutes * 60_000);

  let target = todayTarget;

  if (now > celebrationEnd) {
    target = new Date(todayTarget.getTime() + 24 * 60 * 60_000);
  }

  const diff = target - now;
  const isTarteNow = now >= todayTarget && now <= celebrationEnd;

  if (isTarteNow) {
    document.body.classList.add("tarte-now");
    statusLabel.textContent = "It is officially";
    timer.textContent = "TARTE!";
    targetText.textContent = `${CONFIG.restaurantName} needs you now.`;
    microcopy.textContent = "Grab a slice before the pastry timeline collapses.";
    return;
  }

  document.body.classList.remove("tarte-now");

  const totalSeconds = Math.max(0, Math.floor(diff / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  statusLabel.textContent = "Next tarte call in";
  timer.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

  const targetDay = target.getDate() === now.getDate() ? "Today" : "Tomorrow";
  targetText.textContent = `${targetDay} at ${pad(CONFIG.tarteHour)}:${pad(CONFIG.tarteMinute)}`;
}

function rotateMicrocopy() {
  if (document.body.classList.contains("tarte-now")) return;
  const random = CONFIG.messages[Math.floor(Math.random() * CONFIG.messages.length)];
  microcopy.textContent = random;
}

function burstConfetti(amount = 34) {
  const colors = ["#ffd66b", "#ff6f8f", "#1d7774", "#fff4d8", "#b96e33"];

  for (let i = 0; i < amount; i += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = `${Math.random() * 0.45}s`;
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    document.body.append(piece);

    window.setTimeout(() => piece.remove(), 2200);
  }
}

tarteButton.addEventListener("click", () => {
  const random = CONFIG.buttonMessages[Math.floor(Math.random() * CONFIG.buttonMessages.length)];
  microcopy.textContent = random;
  burstConfetti();
});

footerTime.textContent = `Daily tarte time: ${pad(CONFIG.tarteHour)}:${pad(CONFIG.tarteMinute)}`;
document.title = `${CONFIG.eventName} · ${CONFIG.restaurantName}`;

updateCountdown();
rotateMicrocopy();

window.setInterval(updateCountdown, 1000);
window.setInterval(rotateMicrocopy, 7000);
