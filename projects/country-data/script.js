'use strict';

const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const language = Object.values(data.languages || {})[0] || 'N/A';
  const currency = Object.values(data.currencies || {})[0]?.name || 'N/A';

  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flags?.svg || data.flags?.png}" alt="Flag of ${data.name?.common}" />
      <div class="country__data">
        <h3 class="country__name">${data.name?.common || 'Unknown'}</h3>
        <h4 class="country__region">${data.region || 'Unknown region'}</h4>
        <p class="country__row"><span>👫</span>${(
          (data.population || 0) / 1000000
        ).toFixed(1)} million people</p>
        <p class="country__row"><span>🗣️</span>${language}</p>
        <p class="country__row"><span>💰</span>${currency}</p>
      </div>
    </article>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
};

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

const getCountries = function () {
  getJSON(
    'https://restcountries.com/v3.1/all?fields=name,flags,region,population,languages,currencies',
    'Countries not found',
  )
    .then((data) => {
      countriesContainer.innerHTML = '';

      data.forEach((country) => {
        renderCountry(country);
      });

      countriesContainer.style.opacity = 1;
    })
    .catch((err) => {
      renderError(`Something went wrong: ${err.message}`);
      countriesContainer.style.opacity = 1;
    });
};

getCountries();
