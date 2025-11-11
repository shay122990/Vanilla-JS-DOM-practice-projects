'use strict';

const openButtons = document.querySelectorAll('[data-open-modal]');
const closeButtons = document.querySelectorAll('[data-close-modal]');
const confirmButtons = document.querySelectorAll('[data-confirm-modal]');

let lastFocusedElement = null;

function openModal(backdrop) {
  if (backdrop) backdrop.setAttribute('aria-hidden', 'false');
}
function closeModal(backdrop) {
  if (backdrop) backdrop.setAttribute('aria-hidden', 'true');
}

openButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const selector = btn.getAttribute('data-open-modal');
    const backdrop = document.querySelector(selector);

    lastFocusedElement = document.activeElement;

    backdrop.setAttribute('aria-hidden', 'false');

    const focusable = backdrop.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable) focusable.focus();
  });
});

function closeModal(backdrop) {
  if (!backdrop) return;

  if (lastFocusedElement) lastFocusedElement.focus();

  backdrop.setAttribute('aria-hidden', 'true');
}

confirmButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const backdrop = btn.closest('.modal-backdrop');
    closeModal(backdrop);
  });
});

document.querySelectorAll('.modal-backdrop').forEach((backdrop) => {
  backdrop.addEventListener('click', (e) => {
    const dialog = backdrop.querySelector('.modal');
    if (!dialog.contains(e.target)) closeModal(backdrop);
  });
});
