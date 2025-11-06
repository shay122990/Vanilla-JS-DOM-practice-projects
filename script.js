'use strict';

import { projects } from './projects-list.js';

const grid = document.getElementById('projects-grid');

projects.forEach((p) => {
  const card = document.createElement('div');
  card.className = 'card';

  // <img src="${p.img}" alt="${p.title}"> add later to card
  card.innerHTML = `
    <div class="card-title">${p.title}</div>
    <a class="card-link" href="${p.link}">View Project</a>
  `;

  grid.appendChild(card);
});
