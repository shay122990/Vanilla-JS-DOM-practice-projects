'use strict';
//// EVENT -> ACTION (mutate state) -> DERIVE (pure calc) -> RENDER (DOM)
const restaurant = {
  id: 'classico-italiano',
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
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
};

const menuBtns = document.querySelectorAll('.chip');
const menuList = document.getElementById('menuList');
const pillShownEl = document.getElementById('itemsShown');
const pillOrderEl = document.getElementById('itemsInOrder');
const orderList = document.getElementById('orderList');
const subtotalEl = document.getElementById('subtotal');
const vatEl = document.getElementById('vat');
const totalEl = document.getElementById('total');
const promoInput = document.getElementById('promoInput');
const promoApplyBtn = document.getElementById('applyPromo');
const clearBtn = document.getElementById('clearOrder');
const checkoutBtn = document.getElementById('checkout');
const promoMsgEl = document.getElementById('promoMsg');

const VAT_RATE = 0.05; // 5%
const DISCOUNT_RATE = 0.1; // 10%
const PROMO_CODE = 'SAVE10';

const state = {
  filter: 'all',
  orderItems: [],
  promoApplied: false,
};

const getFilteredItems = (menuObj, key) => {
  if (key === 'all') return Object.values(menuObj.menu).flat();
  return menuObj.menu[key] ?? [];
};

const money = (n) => `AED ${n}`;

const renderMenu = (items) => {
  menuList.innerHTML = '';
  pillShownEl.textContent = items.length;

  items.forEach((item) => {
    const li = document.createElement('li');
    li.style.listStyleType = 'none';

    const span = document.createElement('span');
    span.textContent = `${item.name} - ${item.price} ${item.currency}`;

    const addBtn = document.createElement('button');
    addBtn.type = 'button';
    addBtn.innerText = 'ADD +';

    addBtn.addEventListener('click', () => addToOrder(item));

    li.appendChild(span);
    li.appendChild(addBtn);
    menuList.appendChild(li);
  });
};

const renderOrder = () => {
  orderList.innerHTML = '';

  state.orderItems.forEach((item) => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    li.textContent = `${item.name}`;
    span.textContent = `${item.price} ${item.currency}`;
    orderList.appendChild(li);
    li.appendChild(span);
  });
};

const renderPills = () => {
  pillOrderEl.textContent = state.orderItems.length;
};

const computeSubtotal = () =>
  state.orderItems.reduce((sum, item) => sum + item.price, 0);

const computeTotals = () => {
  const subtotal = state.orderItems.reduce((sum, item) => sum + item.price, 0);

  const discountAmount = state.promoApplied ? subtotal * DISCOUNT_RATE : 0;
  const discountedSubtotal = subtotal - discountAmount;

  const vatAmount = discountedSubtotal * VAT_RATE;
  const total = discountedSubtotal + vatAmount;

  return { subtotal, discountAmount, vatAmount, total };
};

const renderTotals = () => {
  const { subtotal, vatAmount, total } = computeTotals();

  subtotalEl.textContent = `AED ${subtotal.toFixed(2)}`;
  vatEl.textContent = `AED ${vatAmount.toFixed(2)}`;
  totalEl.textContent = `AED ${total.toFixed(2)}`;
};

const updateUI = () => {
  renderOrder();
  renderPills();
  renderTotals();
};

const setFilter = (key) => {
  state.filter = key;
  const items = getFilteredItems(restaurant, key);
  renderMenu(items);
};

const addToOrder = (item) => {
  state.orderItems.push(item);
  updateUI();
};

const applyPromo = () => {
  state.promoApplied = promoInput.value.trim() === PROMO_CODE;
  updateUI();
};

setFilter(state.filter);

menuBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    menuBtns.forEach((b) => b.classList.remove('chip--active'));
    btn.classList.add('chip--active');
    setFilter(btn.dataset.filter);
  });
});

if (promoApplyBtn) {
  promoApplyBtn.addEventListener('click', applyPromo);
}

promoInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') applyPromo();
});

const clearOrder = () => {
  state.orderItems = [];
  state.promoApplied = false;
  promoInput.value = '';
  promoMsgEl.textContent = '';
  updateUI();
};
clearBtn.addEventListener('click', clearOrder);

const checkout = () => {
  if (state.orderItems.length === 0) {
    promoMsgEl.textContent = 'Your order is empty.';
    return;
  }

  const { total } = computeTotals();

  promoMsgEl.textContent = `Order placed ✅ Total: AED ${total.toFixed(2)}`;

  // reset everything
  state.orderItems = [];
  state.promoApplied = false;
  promoInput.value = '';

  updateUI();
};

checkoutBtn.addEventListener('click', checkout);
