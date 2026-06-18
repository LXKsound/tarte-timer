const CONFIG = {
  tarteHour: 15,
  tarteMinute: 0,
  celebrationMinutes: 60
};

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const statusText = document.getElementById("statusText");
const bellButton = document.getElementById("bellButton");

const pad = (value) => String(value).padStart(2, "0");

function getTarteTarget(now = new Date()) {
  const todayTarget = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    CONFIG.tarteHour,
    CONFIG.tarteMinute,
    0,
    0
  );

  const celebrationEnd = new Date(todayTarget.getTime() + CONFIG.celebrationMinutes * 60 * 1000);

  if (now > celebrationEnd) {
    return {
      target: new Date(todayTarget.getTime() + 24 * 60 * 60 * 1000),
      isNow: false
    };
  }

  return {
    target: todayTarget,
    isNow: now >= todayTarget && now <= celebrationEnd
  };
}

function updateCountdown() {
  const now = new Date();
  const { target, isNow } = getTarteTarget(now);

  if (isNow) {
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    statusText.textContent = "It is tarte time right now.";
    return;
  }

  const diff = Math.max(0, target - now);
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  daysEl.textContent = pad(days);
  hoursEl.textContent = pad(hours);
  minutesEl.textContent = pad(minutes);
  secondsEl.textContent = pad(seconds);
  statusText.textContent = `Next tarte time is at ${pad(CONFIG.tarteHour)}:${pad(CONFIG.tarteMinute)}.`;
}

bellButton.addEventListener("click", () => {
  statusText.textContent = "The tarte bell has been rung.";
});

updateCountdown();
setInterval(updateCountdown, 1000);
