const CONFIG = {
  tarteHour: 15,
  tarteMinute: 0,
  celebrationMinutes: 60,
  locale: "en-GB",
  messages: [
    "Stay productive until the tarte portal opens.",
    "Steam pressure rising. Butter levels stable.",
    "Tiny forks are being polished by the automaton.",
    "Lemon tarte detected in the pastry timeline.",
    "Chocolate tarte has entered the negotiation phase.",
    "Berry tarte morale boost is almost ready.",
    "Please keep colleagues away from the countdown gears."
  ],
  bellMessages: [
    "Ding! The tarte bell has been officially notarized.",
    "The pastry zeppelin has received your signal.",
    "A tiny fork somewhere just saluted.",
    "Colleague happiness pressure is increasing.",
    "The tarte machine says: oui."
  ]
};

const els = {
  days: document.querySelector("#days"),
  hours: document.querySelector("#hours"),
  minutes: document.querySelector("#minutes"),
  seconds: document.querySelector("#seconds"),
  status: document.querySelector("#statusText"),
  bell: document.querySelector("#bell"),
  colleague: document.querySelector("#colleagueButton"),
  dailyTime: document.querySelector("#dailyTime")
};

const pad = value => String(value).padStart(2, "0");

function targetForNow(now = new Date()) {
  const today = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    CONFIG.tarteHour,
    CONFIG.tarteMinute,
    0,
    0
  );

  const celebrationEnd = new Date(today.getTime() + CONFIG.celebrationMinutes * 60_000);

  if (now > celebrationEnd) {
    return {
      target: new Date(today.getTime() + 24 * 60 * 60_000),
      isNow: false
    };
  }

  return {
    target: today,
    isNow: now >= today && now <= celebrationEnd
  };
}

function setWithTick(element, value) {
  if (element.textContent === value) return;

  element.textContent = value;
  element.classList.remove("tick");
  void element.offsetWidth;
  element.classList.add("tick");
}

function updateCountdown() {
  const now = new Date();
  const { target, isNow } = targetForNow(now);

  if (isNow) {
    document.body.classList.add("tarte-now");
    setWithTick(els.days, "00");
    setWithTick(els.hours, "00");
    setWithTick(els.minutes, "00");
    setWithTick(els.seconds, "00");
    els.status.textContent = "TARTE TIME! Please proceed elegantly to French Kiss.";
    return;
  }

  document.body.classList.remove("tarte-now");

  const diff = Math.max(0, target - now);
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  setWithTick(els.days, pad(days));
  setWithTick(els.hours, pad(hours));
  setWithTick(els.minutes, pad(minutes));
  setWithTick(els.seconds, pad(seconds));
}

function randomMessage(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function rotateMessage() {
  if (document.body.classList.contains("tarte-now")) return;
  els.status.textContent = randomMessage(CONFIG.messages);
}

function confetti(amount = 40) {
  const colors = ["#d55267", "#cf9a45", "#f4dfb4", "#a93b3b", "#a96236"];

  for (let i = 0; i < amount; i += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = `${Math.random() * 0.45}s`;
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    document.body.append(piece);

    window.setTimeout(() => piece.remove(), 2100);
  }
}

els.bell.addEventListener("click", () => {
  els.status.textContent = randomMessage(CONFIG.bellMessages);
  confetti();
});

els.colleague?.addEventListener("click", () => {
  els.status.textContent = "Colleague space unlocked: please bring a fork.";
  confetti(24);
});

els.dailyTime.textContent = `Daily tarte time: ${pad(CONFIG.tarteHour)}:${pad(CONFIG.tarteMinute)}`;

updateCountdown();
rotateMessage();
window.setInterval(updateCountdown, 1000);
window.setInterval(rotateMessage, 6500);
