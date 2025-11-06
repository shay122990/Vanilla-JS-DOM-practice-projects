'use strict';

const combinedMenuEl = document.getElementById('combinedMenu');
const ingredients = document.querySelectorAll('.ing');
const pastaOut = document.getElementById('pastaOut');
const cookBtn = document.getElementById('cookPasta');
const guestName = document.getElementById('guestName');
const spellBtn = document.getElementById('spellBtn');
const spelledName = document.getElementById('spelled');

const restaurant = {
  name: 'Classico Italiano',
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  orderPasta(ing1, ing2, ing3) {
    return `Here is your pasta with ${ing1}, ${ing2}, ${ing3}`;
  },
};
const specials = ['Truffle Gnocchi', 'Margherita', 'Pesto Tagliatelle'];

function renderCombinedMenu(starters, mains) {
  while (combinedMenuEl.firstChild)
    combinedMenuEl.removeChild(combinedMenuEl.firstChild);
  const combined = [...starters, ...mains];
  for (let i = 0; i < combined.length; i++) {
    const li = document.createElement('li');
    li.textContent = combined[i];
    combinedMenuEl.appendChild(li);
  }
}
const { starterMenu, mainMenu } = restaurant;
renderCombinedMenu(starterMenu, mainMenu);

const cookPasta = function (e) {
  e.preventDefault();
  const inputOrders = [...ingredients].map((i) => i.value.trim());

  if (inputOrders.some((v) => v === '')) {
    alert('Please input all three ingredients');
    return;
  }

  pastaOut.textContent = restaurant.orderPasta(...inputOrders);
};

const spellGuestName = function () {
  const guestValue = guestName.value.trim();
  if (!guestValue) {
    alert('Please input your name!');
    return;
  }
  spelledName.innerHTML = '';
  const chars = [...guestValue];
  for (let i = 0; i < chars.length; i++) {
    const chip = document.createElement('span');
    chip.textContent = chars[i];
    chip.classList.add('chip');
    spelledName.appendChild(chip);
  }
};

spellBtn.addEventListener('click', spellGuestName);

cookBtn.addEventListener('click', cookPasta);
