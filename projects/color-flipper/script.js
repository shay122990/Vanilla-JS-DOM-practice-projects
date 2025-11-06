const flipBtn = document.getElementById('flip-btn');
const colorName = document.getElementById('color-name');
const copyBtn = document.getElementById('copy');

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

const copyColor = function () {
  const color = colorName.textContent;

  navigator.clipboard
    .writeText(color)
    .then(() => {
      const originalText = copyBtn.textContent;
      copyBtn.textContent = 'Copied';

      setTimeout(() => {
        copyBtn.textContent = originalText;
      }, 1500);
    })
    .catch((err) => {
      console.error('Failed to copy:', err);
    });
};

flipBtn.addEventListener('click', changeColor);
copyBtn.addEventListener('click', copyColor);
