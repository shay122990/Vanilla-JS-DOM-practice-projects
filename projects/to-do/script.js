'use strict';

const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

const STORAGE_KEY = 'todos_v1';

let todos = loadTodos();

function loadTodos() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];

  const data = JSON.parse(stored);
  if (!Array.isArray(data)) return [];

  if (data.length > 0 && typeof data[0] === 'string') {
    const migrated = data.map((text) => ({
      id: Date.now() + Math.floor(Math.random() * 100000),
      text,
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
    return migrated;
  }

  return data;
}

function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function render() {
  list.innerHTML = '';

  for (const todo of todos) {
    const li = document.createElement('li');
    li.dataset.id = todo.id;

    const text = document.createElement('span');
    text.textContent = todo.text;

    const btn = document.createElement('button');
    btn.textContent = 'Delete';
    btn.dataset.action = 'delete';

    li.appendChild(text);
    li.appendChild(btn);
    list.appendChild(li);
  }
}

function addTodo(text) {
  const trimmed = text.trim();
  if (!trimmed) return;

  todos.push({
    id: Date.now(),
    text: trimmed,
  });

  saveTodos();
  render();
}

function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  saveTodos();
  render();
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  addTodo(input.value);
  input.value = '';
  input.focus();
});

list.addEventListener('click', function (e) {
  if (e.target.dataset.action !== 'delete') return;

  const li = e.target.closest('li');
  const id = Number(li.dataset.id);
  deleteTodo(id);
});

render();
