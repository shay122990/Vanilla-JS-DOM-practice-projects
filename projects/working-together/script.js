const usersListEl = document.querySelector('.users-list');
const formEl = document.querySelector('.login');
const inputEl = document.querySelector('.email-input');
const introEl = document.querySelector('.intro');
const usersEl = document.querySelector('.users');
const containerEl = document.querySelector('.container');

const populateUserImages = async function () {
  if (!usersListEl) return;

  try {
    const res = await fetch('https://randomuser.me/api/?results=5');

    if (!res.ok) throw new Error('Failed to fetch users');

    const data = await res.json();

    usersListEl.innerHTML = '';

    data.results.forEach((user) => {
      const li = document.createElement('li');
      const img = document.createElement('img');

      img.src = user.picture.thumbnail;
      img.alt = `${user.name.first} profile picture`;

      li.appendChild(img);
      usersListEl.appendChild(li);
    });
  } catch (error) {
    console.error(error);
    usersListEl.innerHTML = '<li>Could not load users</li>';
  }
};

const login = function (e) {
  e.preventDefault();

  const email = inputEl.value.trim();

  if (!email) return alert('Please enter your email');

  if (!email.includes('@')) {
    return alert('Please enter a valid email');
  }

  inputEl.value = '';

  [introEl, formEl, usersEl].forEach((el) => el.classList.add('hidden'));

  const confirmDiv = document.createElement('div');
  const confirmEl = document.createElement('span');
  const proceedBtn = document.createElement('button');

  confirmDiv.classList.add('confirm-div');
  confirmEl.classList.add('confirm');
  proceedBtn.classList.add('proceed');

  confirmEl.textContent = 'You are now logged in';
  proceedBtn.textContent = `Proceed \u279D`;

  confirmDiv.append(confirmEl, proceedBtn);
  containerEl.append(confirmDiv);
};

populateUserImages();

formEl?.addEventListener('submit', login);
