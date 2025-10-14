const flipBtn = document.getElementById('flip-btn');
const colorName = document.getElementById('color-name');

let codes = '0123456789ABCDEF';

function generateRandomString(length) {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += codes.charAt(Math.floor(Math.random() * codes.length));
  }
  return '#' + result;
}

const changeColor = function () {
  const randomColor = generateRandomString(6);
  document.body.style.backgroundColor = randomColor;
  colorName.textContent = randomColor;
};

flipBtn.addEventListener('click', changeColor);
