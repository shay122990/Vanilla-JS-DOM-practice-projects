const style = document.createElement('style');

style.textContent = `
  #back-button {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 35px;
    padding: 8px 0;
    border: 0;
    border-bottom: 2px solid #ff4b2b;
    background: transparent;
    color: #ff4b2b;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: pointer;
    transition:
      color 0.2s ease,
      border-color 0.2s ease,
      transform 0.2s ease;
  }

  #back-button:hover {
    color: #ff9684;
    border-color: #ff9684;
    transform: translateX(-4px);
  }
`;

document.head.appendChild(style);

const backButton = document.createElement('button');

backButton.id = 'back-button';
backButton.textContent = '← Back to Projects';

backButton.addEventListener('click', () => {
  history.back();
});

document.body.prepend(backButton);
