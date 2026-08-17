const menuItems = document.querySelectorAll('.actions li');
const btnAddBranch = document.querySelector('.branch-btn');
const btnClose = document.getElementById('close-btn');
const menu = document.querySelector('.menu');

menuItems.forEach((item) => {
  item.addEventListener('click', () => {
    menuItems.forEach((item) => {
      item.classList.remove('active');
    });

    item.classList.add('active');
  });
});

btnAddBranch.addEventListener('click', () => {
  alert('branch added');
});

btnClose.addEventListener('click', () => {
  menu.classList.toggle('collapsed');

  if (menu.classList.contains('collapsed')) {
    btnClose.textContent = '→';
  } else {
    btnClose.textContent = '×';
  }
});
