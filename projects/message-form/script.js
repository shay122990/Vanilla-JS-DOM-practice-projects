'use strict';
const messageForm = document.getElementById('messageForm');
const nameInput = document.getElementById('nameInput');
const messageInput = document.getElementById('messageInput');
const messagesList = document.getElementById('messagesList');

function createMessageElement(name, message) {
  const li = document.createElement('li');

  const text = document.createElement('span');
  text.textContent = `${name}: ${message}`;

  const deleteBtn = document.createElement('button');
  deleteBtn.type = 'button';
  deleteBtn.textContent = 'Delete';
  deleteBtn.classList.add('delete-btn');

  li.appendChild(text);
  li.appendChild(deleteBtn);

  return li;
}

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const getName = nameInput.value;
  const getMessage = messageInput.value;

  const li = createMessageElement(getName, getMessage);
  messagesList.appendChild(li);

  nameInput.value = '';
  messageInput.value = '';
});

messagesList.addEventListener('click', (e) => {
  if (e.target.matches('.delete-btn')) {
    const li = e.target.closest('li');
    if (li) li.remove();
  }
});
