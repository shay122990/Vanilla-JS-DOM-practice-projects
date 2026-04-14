'use strict';

import { projects } from './projects-list.js';

const grid = document.getElementById('projects-grid');
const searchInput = document.getElementById('search');

const renderProjects = function (projectsToRender) {
  grid.innerHTML = '';

  projectsToRender.forEach((p) => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <div class="card-title">${p.title}</div>
      <a class="card-link" href="${p.link}">View Project</a>
    `;

    grid.appendChild(card);
  });
};
searchInput.addEventListener('input', function () {
  const query = searchInput.value.toLowerCase().trim();

  const filtered = projects.filter((p) => {
    return p.title.toLowerCase().includes(query);
  });

  renderProjects(filtered);
});

renderProjects(projects);
// TO-DO
//1. add filter for projects
//2. either pagination or scrollable container
//3. more visible UI
