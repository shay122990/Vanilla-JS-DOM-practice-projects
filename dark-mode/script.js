'use strict';

const toggleBtn = document.getElementById('toggleBtn');

const toggleMode = function () {
  document.body.classList.toggle('dark');
};

toggleBtn.addEventListener('click', toggleMode);
