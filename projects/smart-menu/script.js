'use strict';
const restaurant = {
  id: 'classico-italiano',
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],

  // ✅ one unified menu structure (easy to price + order + filter)
  menu: {
    starter: [
      {
        id: 'st-1',
        name: 'Focaccia',
        price: 18,
        currency: 'AED',
        tags: ['veg'],
      },
      {
        id: 'st-2',
        name: 'Bruschetta',
        price: 22,
        currency: 'AED',
        tags: ['veg'],
      },
      {
        id: 'st-3',
        name: 'Garlic Bread',
        price: 16,
        currency: 'AED',
        tags: ['veg'],
      },
      {
        id: 'st-4',
        name: 'Caprese Salad',
        price: 28,
        currency: 'AED',
        tags: ['veg', 'gluten-free'],
      },
    ],

    main: [
      {
        id: 'mn-1',
        name: 'Pizza',
        price: 45,
        currency: 'AED',
        tags: ['popular'],
      },
      {
        id: 'mn-2',
        name: 'Pasta',
        price: 42,
        currency: 'AED',
        tags: ['popular'],
      },
      { id: 'mn-3', name: 'Risotto', price: 48, currency: 'AED', tags: [] },
    ],

    dessert: [
      {
        id: 'ds-1',
        name: 'Panacotta',
        price: 26,
        currency: 'AED',
        tags: ['signature'],
      },
      {
        id: 'ds-2',
        name: 'Tiramissu',
        price: 28,
        currency: 'AED',
        tags: ['popular'],
      },
    ],
  },

  // ✅ optional: one flat list derived manually (helps if you want “all” without concat)
  // items: [
  //   { id:'st-1', name:'Focaccia', section:'starter', price:18, currency:'AED', tags:['veg'] },
  //   ...
  // ],
};
const menuBtns = document.querySelectorAll('.chip');
const menuList = document.getElementById('menuList');
const pillShownEl = document.getElementById('itemsShown');
const pillOrderEl = document.getElementById('itemsInOrder');
const orderList = document.getElementById('orderList');
const subtotalEl = document.getElementById('subtotal');
const vatEl = document.getElementById('vat');
const totalEl = document.getElementById('total');

let currentButton = 'all';
let itemsShow = 0;
let inOrder = 0;
let order = [];
let subtotal = 0;
let total = 0;
let vat = 0.5;
let promoCode = 'SAVE10';

const displayCategory = function (menuObj, key) {
  const items =
    key === 'all' ? Object.values(menuObj.menu).flat() : menuObj.menu[key];

  renderMenuItems(items);
};

const btnActions = {
  all: () => displayCategory(restaurant, 'all'),
  starter: () => displayCategory(restaurant, 'starter'),
  main: () => displayCategory(restaurant, 'main'),
  dessert: () => displayCategory(restaurant, 'dessert'),
};

const renderMenuItems = function (items) {
  // menuList.innerHTML = '';
  itemsShow = items.length;
  pillShownEl.textContent = itemsShow;
  items.forEach((item) => {
    const li = document.createElement('li');
    li.style.listStyleType = 'none';
    console.log(item);
    const span = document.createElement('span');
    span.textContent = `${item.name} - ${item.price} ${item.currency}`;

    const addBtn = document.createElement('button');
    addBtn.innerText = 'ADD +';

    li.appendChild(span);
    li.appendChild(addBtn);

    menuList.appendChild(li);
    addBtn.addEventListener('click', () => {
      inOrder++;
      pillOrderEl.textContent = inOrder;
      const orderLi = document.createElement('li');
      orderLi.textContent = `${item.name} - ${item.price} ${item.currency}`;
      orderList.appendChild(orderLi);
      order.push(item.price);
      const sub = order.reduce((acc, cur) => acc + cur);
      console.log(order, sub);
      subtotalEl.textContent = `AED ${sub}`;
      vatEl.textContent = `AED ${sub + vat}`;
    });
  });
};

// initial render
btnActions[currentButton]?.();

menuBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    menuList.innerHTML = '';
    menuBtns.forEach((b) => b.classList.remove('chip--active'));
    btn.classList.add('chip--active');

    currentButton = btn.dataset.filter; // 'all' | 'starter' | 'main' | 'dessert'

    btnActions[currentButton]?.();
  });
});

// const calculateOrder = function(){

// }
