'use strict';

const openButtons = document.querySelectorAll('[data-open-modal]');
const closeButtons = document.querySelectorAll('[data-close-modal]');
const confirmButtons = document.querySelectorAll('[data-confirm-modal]');
const backdrops = document.querySelectorAll('.modal-backdrop');

let lastFocusedElement = null;

function openModal(backdrop) {
  if (!backdrop) return;
  lastFocusedElement = document.activeElement;
  backdrop.setAttribute('aria-hidden', 'false');

  const firstFocusable = backdrop.querySelector(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  if (firstFocusable) firstFocusable.focus();
}

function closeModal(backdrop) {
  if (!backdrop) return;

  if (lastFocusedElement && document.body.contains(lastFocusedElement)) {
    lastFocusedElement.focus();
  } else {
    document.body.focus?.();
  }

  backdrop.setAttribute('aria-hidden', 'true');
}

openButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const selector = btn.getAttribute('data-open-modal');
    const backdrop = document.querySelector(selector);
    openModal(backdrop);
  });
});

// close via cancel / X
closeButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const backdrop = btn.closest('.modal-backdrop');
    closeModal(backdrop);
  });
});

// confirm acts like close (you can add action here)
confirmButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const backdrop = btn.closest('.modal-backdrop');
    // TODO:  confirm action here
    closeModal(backdrop);
  });
});

// click outside (backdrop) to close
backdrops.forEach((backdrop) => {
  backdrop.addEventListener('click', (e) => {
    const dialog = backdrop.querySelector('.modal');
    if (!dialog.contains(e.target)) closeModal(backdrop);
  });
});

// Esc to close whichever is open
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  const openBackdrop = document.querySelector(
    '.modal-backdrop[aria-hidden="false"]'
  );
  if (openBackdrop) closeModal(openBackdrop);
});
