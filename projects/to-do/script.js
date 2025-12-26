'use strict';

const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

const STORAGE_KEY = 'todos_v1';

let todos = loadTodos();

function loadTodos() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function render() {
  list.innerHTML = '';

  for (const todo of todos) {
    const li = document.createElement('li');
    li.textContent = todo;
    list.appendChild(li);
  }
}

function addTodo(text) {
  const trimmed = text.trim();
  if (!trimmed) return;

  todos.push(trimmed);
  saveTodos();
  render();
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  addTodo(input.value);
  input.value = '';
  input.focus();
});

render();
