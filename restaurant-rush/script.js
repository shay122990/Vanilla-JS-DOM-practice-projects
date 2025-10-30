'use strict';

const combinedMenuEl = document.getElementById('combinedMenu');
const ingredients = document.querySelectorAll('.ing');
const pastaOut = document.getElementById('pastaOut');
const cookBtn = document.getElementById('cookPasta');

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
cookBtn.addEventListener('click', cookPasta);

// next
// click spell →
//   read value →
//   trim →
//   if empty: show error →
//   clear #spelled children →
//   [...string] to array of characters →
//   for each char:
//     create chip element
//     set textContent
//     append to spelled container
