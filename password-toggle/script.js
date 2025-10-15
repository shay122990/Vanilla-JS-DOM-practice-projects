'use strict';
const toggleBtn = document.getElementById('toggle-btn');
const passwordInput = document.getElementById('password');
toggleBtn.addEventListener('click', function () {
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    toggleBtn.textContent = '🙈';
  } else {
    passwordInput.type = 'password';
    toggleBtn.textContent = '👁️';
  }
});
