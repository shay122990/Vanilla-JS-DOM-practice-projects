'use strict';

const searchInput = document.getElementById('searchInput');
const list = document.getElementById('list');

const items = [
  'Amsterdam',
  'Athens',
  'Bangkok',
  'Barcelona',
  'Beirut',
  'Berlin',
  'Cairo',
  'Copenhagen',
  'Dubai',
  'Dublin',
  'Helsinki',
  'Istanbul',
  'Jakarta',
  'Kuala Lumpur',
  'Kyoto',
  'Lisbon',
  'London',
  'Madrid',
  'Milan',
  'Moscow',
  'New York',
  'Oslo',
  'Paris',
  'Prague',
  'Rome',
  'Seoul',
  'Singapore',
  'Stockholm',
  'Sydney',
  'Tokyo',
  'Vienna',
  'Warsaw',
  'Zurich',
];

function renderList(data) {
  list.innerHTML = '';

  if (data.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'No results found';
    li.style.opacity = '0.6';
    list.appendChild(li);
    return;
  }

  data.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    list.appendChild(li);
  });
}

function handleSearch() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = items.filter((city) => city.toLowerCase().includes(query));
  renderList(filtered);
}

searchInput.addEventListener('input', handleSearch);

renderList(items);
