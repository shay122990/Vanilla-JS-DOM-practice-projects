'use strict';

const messageForm = document.getElementById('messageForm');
const nameInput = document.getElementById('nameInput');
const messageInput = document.getElementById('messageInput');
const messagesList = document.getElementById('messagesList');

const formError = document.createElement('p');
formError.id = 'formError';
formError.className = 'error-message';
formError.setAttribute('aria-live', 'polite');
messageForm.appendChild(formError);

function clearErrors() {
  formError.textContent = '';
  nameInput.classList.remove('field-error');
  messageInput.classList.remove('field-error');
}

function showErrors({ nameEmpty, messageEmpty }) {
  const messages = [];

  if (nameEmpty) {
    nameInput.classList.add('field-error');
    messages.push('Name is required');
  }

  if (messageEmpty) {
    messageInput.classList.add('field-error');
    messages.push('Message is required');
  }

  if (messages.length > 0) {
    formError.textContent = messages.join('. ') + '.';
  }
}

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
  clearErrors();

  const getName = nameInput.value.trim();
  const getMessage = messageInput.value.trim();

  const nameEmpty = getName === '';
  const messageEmpty = getMessage === '';

  if (nameEmpty || messageEmpty) {
    showErrors({ nameEmpty, messageEmpty });
    return;
  }

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

TODO;
// date/time for each message
// save to localstorage
