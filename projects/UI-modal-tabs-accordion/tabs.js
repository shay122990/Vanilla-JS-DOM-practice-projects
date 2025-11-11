'use strict';

const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.tabpanel');

function showTab(clickedTab) {
  panels.forEach((panel) => (panel.hidden = true));

  tabs.forEach((tab) => {
    tab.setAttribute('aria-selected', 'false');
  });

  clickedTab.setAttribute('aria-selected', 'true');

  const panelId = clickedTab.getAttribute('aria-controls');
  const panel = document.getElementById(panelId);
  panel.hidden = false;
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    showTab(tab);
  });
});
