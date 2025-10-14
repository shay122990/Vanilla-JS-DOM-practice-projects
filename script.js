'use strict';

const projects = [
  {
    title: 'Guess My Number',
    // img: 'guess-my-number.jpg',
    link: './guess-my-number/index.html',
  },
  {
    title: 'Modal Window',
    // img: 'modal-window.jpg',
    link: './modal-window/index.html',
  },
  { title: 'Pig Game', img: 'pig-game.jpg', link: './pig-game/index.html' },
  {
    title: 'Color Flipper',
    // img: 'pig-game.jpg',
    link: './color-flipper/index.html',
  },
  {
    title: 'Counter App',
    link: './counter-app/index.html',
  },
  // will add more projects here
];

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
