'use strict';
const searchInput = document.getElementById('searchInput');
const clearBtn = document.getElementById('clearBtn');
const cards = document.querySelectorAll('.card');
const resultCount = document.getElementById('resultCount');
const emptyState = document.getElementById('emptyState');

searchInput.addEventListener('input', function () {
  const query = searchInput.value.toLowerCase();
  let matches = 0;

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];

    const name = card.dataset.name.toLowerCase();
    const role = card.dataset.role.toLowerCase();
    const company = card.dataset.company.toLowerCase();

    if (
      name.includes(query) ||
      role.includes(query) ||
      company.includes(query)
    ) {
      card.style.display = 'grid';
      matches++;
    } else {
      card.style.display = 'none';
    }
  }

  resultCount.textContent = matches + ' results';

  if (matches === 0) {
    emptyState.hidden = false;
  } else {
    emptyState.hidden = true;
  }
});

clearBtn.addEventListener('click', function () {
  searchInput.value = '';

  for (let i = 0; i < cards.length; i++) {
    cards[i].style.display = 'grid';
  }

  resultCount.textContent = cards.length + ' results';
  emptyState.hidden = true;
});
