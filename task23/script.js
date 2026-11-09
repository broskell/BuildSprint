const UNITS = [
  { value: "C", label: "Celsius (°C)" },
  { value: "F", label: "Fahrenheit (°F)" },
  { value: "K", label: "Kelvin (K)" },
];

const temperatureInput = document.getElementById("temperature-input");
const fromSelect = document.getElementById("from-unit");
const toSelect = document.getElementById("to-unit");
const convertBtn = document.getElementById("convert-btn");
const resultOutput = document.getElementById("result-output");

const symbols = { C: "°C", F: "°F", K: "K" };

const fillSelect = (select) => {
  const options = UNITS.slice();
  options.splice(0, 0, { value: "", label: "Select unit" });

  for (const item of options) {
    const opt = document.createElement("option");
    opt.value = item.value;
    opt.textContent = item.label;
    select.appendChild(opt);
  }
};

const getSymbol = (unit) => {
  for (const key in symbols) {
    if (key === unit) {
      return symbols[key];
    }
  }
  return unit;
};

const toCelsius = (num, unit) => {
  if (unit === "C") {
    return num;
  }
  if (unit === "F") {
    return (num - 32) * (5 / 9);
  }
  return num - 273.15;
};

const fromCelsius = (celsius, unit) => {
  if (unit === "C") {
    return celsius;
  }
  if (unit === "F") {
    return celsius * (9 / 5) + 32;
  }
  return celsius + 273.15;
};

const convert = (num, from, to) => {
  if (from === to) {
    return num;
  }
  const celsius = toCelsius(num, from);
  return fromCelsius(celsius, to);
};

const isFormReady = () => {
  const text = temperatureInput.value.trim();

  if (text === "") {
    return false;
  }
  if (isNaN(text)) {
    return false;
  }
  if (fromSelect.value === "") {
    return false;
  }
  if (toSelect.value === "") {
    return false;
  }

  return true;
};

const refreshButton = () => {
  convertBtn.disabled = isFormReady() ? false : true;
  resultOutput.hidden = true;
};

fillSelect(fromSelect);
fillSelect(toSelect);
refreshButton();

temperatureInput.addEventListener("input", refreshButton);
fromSelect.addEventListener("change", refreshButton);
toSelect.addEventListener("change", refreshButton);

convertBtn.addEventListener("click", () => {
  if (!isFormReady()) {
    return;
  }

  const num = Number(temperatureInput.value);
  const from = fromSelect.value;
  const to = toSelect.value;
  const answer = convert(num, from, to);

  const answerText = String(answer).includes(".") ? answer.toFixed(2) : answer;

  resultOutput.textContent =
    num +
    " " +
    getSymbol(from) +
    " = " +
    answerText +
    " " +
    getSymbol(to);
  resultOutput.hidden = false;
});
