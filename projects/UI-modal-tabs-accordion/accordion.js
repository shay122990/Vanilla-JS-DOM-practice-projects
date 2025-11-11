const accTriggers = document.querySelectorAll('.acc-trigger');
const accPanels = document.querySelectorAll('.acc-panel');

function showAccordion(activeTrigger) {
  accPanels.forEach((panel) => (panel.hidden = true));
  accTriggers.forEach((btn) => btn.setAttribute('aria-expanded', 'false'));

  activeTrigger.setAttribute('aria-expanded', 'true');

  const panelId = activeTrigger.getAttribute('aria-controls');
  const panel = document.getElementById(panelId);
  panel.hidden = false;
}

accTriggers.forEach((trigger) => {
  trigger.addEventListener('click', () => {
    showAccordion(trigger);
  });
});
