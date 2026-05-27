const chart = document.querySelector("#projectionChart");
const scenarioSelect = document.querySelector("#scenarioSelect");

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

scenarioSelect.addEventListener("change", (event) => {
  renderChart(event.target.value);
});

renderChart(scenarioSelect.value);
