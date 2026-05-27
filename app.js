const chart = document.querySelector("#projectionChart");
const scenarioSelect = document.querySelector("#scenarioSelect");
const positionsTable = document.querySelector("#positionsTable");
const signalList = document.querySelector("#signalList");
const alertList = document.querySelector("#alertList");
const journalList = document.querySelector("#journalList");
const addJournalEntry = document.querySelector("#addJournalEntry");

const scenarios = {
  conservative: {
    start: 50,
    values: [
      50, 50.1, 49.9, 50.25, 50.4, 50.2, 50.6, 50.7, 50.55, 50.8,
      51.0, 50.85, 51.15, 51.25, 51.1, 51.45, 51.6, 51.5, 51.75, 51.95,
      52.1, 52.0, 52.25, 52.45, 52.3, 52.55, 52.8, 52.7, 53.0, 53.35,
    ],
  },
  flat: {
    start: 50,
    values: [
      50, 49.9, 50.05, 49.95, 50.1, 50.0, 50.2, 50.05, 49.95, 50.15,
      50.1, 49.9, 50.05, 50.0, 50.2, 50.1, 49.95, 50.0, 50.15, 50.05,
      49.9, 50.0, 50.1, 49.95, 50.05, 50.15, 50.0, 49.9, 50.05, 50.1,
    ],
  },
  stress: {
    start: 50,
    values: [
      50, 49.7, 49.3, 49.5, 48.9, 48.4, 48.7, 48.2, 47.8, 48.0,
      47.5, 47.1, 47.4, 46.9, 46.5, 46.8, 46.3, 45.9, 46.1, 45.7,
      45.2, 45.5, 45.0, 44.7, 44.9, 44.5, 44.2, 43.9, 43.6, 43.4,
    ],
  },
};

const positions = [
  {
    bot: "Exness MT5",
    market: "EUR/USD",
    side: "Buy",
    size: "$12.00",
    entry: "1.08520",
    stop: "1.08390",
    pnl: 0.18,
  },
  {
    bot: "Exness MT5",
    market: "GBP/USD",
    side: "Watch",
    size: "$0.00",
    entry: "-",
    stop: "-",
    pnl: 0,
  },
  {
    bot: "Binance Spot",
    market: "BTC/USDT",
    side: "Buy",
    size: "$8.00",
    entry: "68,420",
    stop: "67,510",
    pnl: 0.42,
  },
  {
    bot: "Binance Spot",
    market: "ETH/USDT",
    side: "Watch",
    size: "$0.00",
    entry: "-",
    stop: "-",
    pnl: 0,
  },
];

const signals = [
  {
    market: "EUR/USD",
    bot: "Exness MT5",
    confidence: 68,
    note: "Trend filter is bullish, but position size stays small until London/New York overlap.",
  },
  {
    market: "BTC/USDT",
    bot: "Binance Spot",
    confidence: 61,
    note: "Momentum is positive, volatility is acceptable, spot-only entry remains capped at $8.",
  },
  {
    market: "GBP/USD",
    bot: "Exness MT5",
    confidence: 44,
    note: "Signal rejected because spread and recent candle range are too wide for this account size.",
  },
];

const alerts = [
  {
    title: "Live trading locked",
    body: "No connector can place real orders until testnet/demo mode is implemented.",
  },
  {
    title: "Small account sizing",
    body: "Forex position risk is capped at roughly 1% of the $30 allocation.",
  },
  {
    title: "Credential rule",
    body: "Binance keys must never include withdrawal permission.",
  },
];

let journal = [
  {
    time: "09:05",
    title: "Rejected GBP/USD entry",
    body: "Skipped because spread was too high relative to the planned stop distance.",
  },
  {
    time: "10:30",
    title: "Accepted BTC/USDT paper buy",
    body: "Signal passed trend and volatility filters. Size stayed under the $15 position limit.",
  },
];

function renderChart(name) {
  const scenario = scenarios[name];
  const min = Math.min(...scenario.values);
  const max = Math.max(...scenario.values);
  const range = Math.max(max - min, 1);

  chart.innerHTML = "";

  scenario.values.forEach((value, index) => {
    const bar = document.createElement("div");
    const height = 18 + ((value - min) / range) * 190;
    const isLoss = value < scenario.start * 0.92;

    bar.className = "bar";
    if (index % 2) bar.classList.add("crypto");
    if (isLoss) bar.classList.add("loss");
    bar.style.height = `${height}px`;
    bar.title = `Day ${index + 1}: $${value.toFixed(2)}`;
    chart.appendChild(bar);
  });
}

function renderPositions() {
  positionsTable.innerHTML = positions
    .map((position) => {
      const pnlClass =
        position.pnl > 0 ? "positive" : position.pnl < 0 ? "negative" : "";
      const pnlText =
        position.pnl === 0 ? "$0.00" : `${position.pnl > 0 ? "+" : ""}$${position.pnl.toFixed(2)}`;

      return `
        <tr>
          <td><strong>${position.bot}</strong></td>
          <td>${position.market}</td>
          <td>${position.side}</td>
          <td>${position.size}</td>
          <td>${position.entry}</td>
          <td>${position.stop}</td>
          <td class="${pnlClass}">${pnlText}</td>
        </tr>
      `;
    })
    .join("");
}

function renderSignals() {
  signalList.innerHTML = signals
    .map(
      (signal) => `
        <article class="signal-card">
          <header>
            <strong>${signal.market}</strong>
            <span class="confidence">${signal.confidence}%</span>
          </header>
          <p>${signal.bot}: ${signal.note}</p>
        </article>
      `,
    )
    .join("");
}

function renderAlerts() {
  alertList.innerHTML = alerts
    .map(
      (alert) => `
        <li>
          <strong>${alert.title}</strong>
          ${alert.body}
        </li>
      `,
    )
    .join("");
}

function renderJournal() {
  journalList.innerHTML = journal
    .map(
      (entry) => `
        <article class="journal-entry">
          <header>
            <strong>${entry.title}</strong>
            <small>${entry.time}</small>
          </header>
          <p>${entry.body}</p>
        </article>
      `,
    )
    .join("");
}

function updateRangeLabel(inputId, labelId, formatter) {
  const input = document.querySelector(inputId);
  const label = document.querySelector(labelId);

  input.addEventListener("input", () => {
    label.textContent = formatter(input.value);
  });
}

scenarioSelect.addEventListener("change", (event) => {
  renderChart(event.target.value);
});

document.querySelectorAll("[data-action]").forEach((button) => {
  button.addEventListener("click", () => {
    const botName = button.dataset.bot === "forex" ? "Exness MT5" : "Binance Spot";
    const action = button.dataset.action === "pause" ? "Paused" : "Paper run";
    const now = new Date();

    journal = [
      {
        time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        title: `${action}: ${botName}`,
        body:
          action === "Paused"
            ? "Manual pause recorded. This would block new entries while allowing risk review."
            : "Paper mode recorded. This keeps the bot active without sending live orders.",
      },
      ...journal,
    ];

    renderJournal();
  });
});

addJournalEntry.addEventListener("click", () => {
  const now = new Date();
  const samples = [
    ["Risk check passed", "Daily drawdown is inside limits and no shutdown rule is active."],
    ["Signal skipped", "Market conditions did not justify using capital at the current spread."],
    ["Stop-loss audit", "Every simulated open trade has a stop-loss before entry is allowed."],
  ];
  const sample = samples[Math.floor(Math.random() * samples.length)];

  journal = [
    {
      time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      title: sample[0],
      body: sample[1],
    },
    ...journal,
  ];
  renderJournal();
});

updateRangeLabel("#dailyStop", "#dailyStopValue", (value) => `$${Number(value).toFixed(2)}`);
updateRangeLabel("#positionSize", "#positionSizeValue", (value) => `$${value}`);
updateRangeLabel("#lossPause", "#lossPauseValue", (value) => `${value} losses`);

renderChart(scenarioSelect.value);
renderPositions();
renderSignals();
renderAlerts();
renderJournal();
