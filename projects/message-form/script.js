'use strict';
// 1. Get the elements

// form

// name input

// message input

// messages list

// 2. Listen for form submission

// prevent page reload (e.preventDefault())

// 3. Read input values
// 4. Create a new <li>

// set its text to: "Name: Message"

// 5. Append to the list
// 6. Clear inputs

const messageForm = document.getElementById('messageForm');
const nameInput = document.getElementById('nameInput');
const messageInput = document.getElementById('messageInput');
const messagesList = document.getElementById('messagesList');

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const getName = nameInput.value;
  const getMessage = messageInput.value;
  const list = document.createElement('li');
  list.textContent = `${getName} - ${getMessage}`;
  messagesList.appendChild(list);
});
