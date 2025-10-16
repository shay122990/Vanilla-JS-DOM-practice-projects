'use strict';
const showBtn = document.getElementById('new-quote');
const quoteText = document.getElementById('quote');
const author = document.getElementById('author');

// const quotes = [
//   {
//     text: 'The best way to get started is to quit talking and begin doing.',
//     author: 'Walt Disney',
//   },
//   {
//     text: 'Don’t let yesterday take up too much of today.',
//     author: 'Will Rogers',
//   },
//   {
//     text: 'It’s not whether you get knocked down, it’s whether you get up.',
//     author: 'Vince Lombardi',
//   },
//   {
//     text: 'Your time is limited, don’t waste it living someone else’s life.',
//     author: 'Steve Jobs',
//   },
//   { text: 'If you can dream it, you can do it.', author: 'Walt Disney' },
// ];

// const showQuote = function () {
//   const randomIndex = Math.floor(Math.random() * quotes.length);
//   const quote = quotes[randomIndex];
//   quoteText.textContent = `"${quote.text}"`;
//   author.textContent = `– ${quote.author}`;
// };
// showBtn.addEventListener('click', showQuote);

async function getQuote() {
  const res = await fetch('http://localhost:3000/quotes');
  const data = await res.json();
  console.log(data);

  const randomIndex = Math.floor(Math.random() * data.length);
  const quote = data[randomIndex];

  quoteText.textContent = `"${quote.q}"`;
  author.textContent = `– ${quote.a || 'Unknown'}`;
}

showBtn.addEventListener('click', getQuote);
