'use strict';

const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.tabpanel');

function showTab(activeTab) {
  panels.forEach((panel) => (panel.hidden = true));
  tabs.forEach((tab) => tab.setAttribute('aria-selected', 'false'));

  activeTab.setAttribute('aria-selected', 'true');

  const panelId = activeTab.getAttribute('aria-controls');
  const panel = document.getElementById(panelId);

  panel.hidden = false;
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => showTab(tab));
});
