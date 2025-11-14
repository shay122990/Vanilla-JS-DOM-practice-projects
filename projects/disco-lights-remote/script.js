const powerToggle = document.getElementById('powerToggle');

// solid colors buttons
const multiBtn = document.getElementById('mode-multi');
const bluesBtn = document.getElementById('mode-blues');
const redsBtn = document.getElementById('mode-reds');
const neutralsBtn = document.getElementById('mode-neutrals');

const multiColors = [
  '#FF0000',
  '#FF7F00',
  '#FFFF00',
  '#00FF00',
  '#00FFFF',
  '#0000FF',
  '#8B00FF',
  '#FF00FF',
  '#00FFAA',
  '#FF1493',
  '#FFD700',
  '#7FFF00',
  '#40E0D0',
  '#1E90FF',
  '#FF4500',
];
const bluesColors = [
  '#001F3F',
  '#003566',
  '#004E89',
  '#0074D9',
  '#1E90FF',
  '#00A8E8',
  '#00BFFF',
  '#5BC0EB',
  '#72EDF2',
  '#CFFAFE',
];
const redsColors = [
  '#FF0000',
  '#FF3B30',
  '#FF4500',
  '#FF5E57',
  '#CC0000',
  '#B30000',
  '#990000',
  '#FF1744',
  '#FF4C4C',
  '#FFD1D1',
];
const neutralColors = [
  '#FFFFFF',
  '#F2F2F2',
  '#E6E6E6',
  '#CCCCCC',
  '#B3B3B3',
  '#999999',
  '#808080',
  '#666666',
  '#4D4D4D',
  '#333333',
];

let powerOn = false;
let currentInterval = null;

function changeMode(colorArray) {
  if (!powerOn) return;

  if (currentInterval !== null) {
    clearInterval(currentInterval);
    currentInterval = null;
  }

  let i = 0;

  currentInterval = setInterval(() => {
    document.body.style.backgroundColor = colorArray[i];
    i++;
    if (i >= colorArray.length) i = 0;
  }, 500);
}

powerToggle.addEventListener('click', function () {
  powerOn = !powerOn;

  if (!powerOn) {
    if (currentInterval !== null) {
      clearInterval(currentInterval);
      currentInterval = null;
    }

    document.body.style.backgroundColor = '#111';

    powerToggle.textContent = 'Power Off';
  } else {
    powerToggle.textContent = 'Power On';
  }
});

multiBtn.addEventListener('click', () => changeMode(multiColors));
bluesBtn.addEventListener('click', () => changeMode(bluesColors));
redsBtn.addEventListener('click', () => changeMode(redsColors));
neutralsBtn.addEventListener('click', () => changeMode(neutralColors));
