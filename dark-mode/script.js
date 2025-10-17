'use strict';

const toggleBtn = document.getElementById('toggleBtn');

const toggleMode = function () {
  document.body.classList.toggle('dark');
  console.log('hit');
};

toggleBtn.addEventListener('click', toggleMode);
