'use strict';

const projects = [
  {
    title: 'Guess My Number',
    img: 'guess-my-number.jpg',
    link: './guess-my-number/index.html',
  },
  {
    title: 'Modal Window',
    img: 'modal-window.jpg',
    link: './modal-window/index.html',
  },
  { title: 'Pig Game', img: 'pig-game.jpg', link: './pig-game/index.html' },
  // will add more projects here
];

const grid = document.getElementById('projects-grid');

projects.forEach((p) => {
  const card = document.createElement('div');
  card.className = 'card';

  card.innerHTML = `
    <img src="${p.img}" alt="${p.title}">
    <div class="card-title">${p.title}</div>
    <a class="card-link" href="${p.link}">View Project</a>
  `;

  grid.appendChild(card);
});
