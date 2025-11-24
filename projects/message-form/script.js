'use strict';

const messageForm = document.getElementById('messageForm');
const nameInput = document.getElementById('nameInput');
const messageInput = document.getElementById('messageInput');
const messagesList = document.getElementById('messagesList');

let messages = JSON.parse(localStorage.getItem('messages')) || [];

function saveToStorage() {
  localStorage.setItem('messages', JSON.stringify(messages));
}

function renderMessages() {
  messagesList.innerHTML = '';
  messages.forEach((text) => {
    const li = createMessageElement(text);
    messagesList.appendChild(li);
  });
}

const formError = document.createElement('p');
formError.className = 'error-message';
messageForm.appendChild(formError);

function clearErrors() {
  formError.textContent = '';
  nameInput.classList.remove('field-error');
  messageInput.classList.remove('field-error');
}

function showErrors(nameEmpty, messageEmpty) {
  const errors = [];

  if (nameEmpty) {
    nameInput.classList.add('field-error');
    errors.push('Name is required');
  }
  if (messageEmpty) {
    messageInput.classList.add('field-error');
    errors.push('Message is required');
  }

  formError.textContent = errors.join('. ') + '.';
}

function createMessageElement(text) {
  const li = document.createElement('li');

  const span = document.createElement('span');
  span.textContent = text;

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.textContent = 'Delete';
  btn.classList.add('delete-btn');

  li.appendChild(span);
  li.appendChild(btn);

  return li;
}

renderMessages();

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  clearErrors();

  const name = nameInput.value.trim();
  const msg = messageInput.value.trim();

  const nameEmpty = name === '';
  const msgEmpty = msg === '';

  if (nameEmpty || msgEmpty) {
    showErrors(nameEmpty, msgEmpty);
    return;
  }

  const fullText = `${name}: ${msg}`;

  messages.push(fullText);
  saveToStorage();

  const li = createMessageElement(fullText);
  messagesList.appendChild(li);

  nameInput.value = '';
  messageInput.value = '';
});

messagesList.addEventListener('click', (e) => {
  if (!e.target.matches('.delete-btn')) return;

  const li = e.target.closest('li');
  const text = li.querySelector('span').textContent;

  messages = messages.filter((m) => m !== text);
  saveToStorage();

  li.remove();
});
