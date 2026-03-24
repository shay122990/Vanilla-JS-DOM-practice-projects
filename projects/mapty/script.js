'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      // console.log(position); // GeolocationPositioncoords: GeolocationCoordinates {latitude: 42.81757509533469, longitude: 74.62445388754772, altitude: 0, accuracy: 45.75199890136719, altitudeAccuracy: null, …}accuracy: 45.75199890136719latitude: 42.81757509533469longitude: 74.62445388754772[[Prototype]]: GeolocationCoordinatestimestamp: 1774255167380[[Prototype]]: GeolocationPosition
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      // console.log(latitude, longitude); // 42.817645502282 74.6242023796162
      // console.log(`https://www.google.pt/maps/@${latitude},${longitude}`);

      const coords = [latitude, longitude];
      const map = L.map('map').setView(coords, 13);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker(coords)
        .addTo(map)
        .bindPopup('A pretty CSS popup.<br> Easily customizable.')
        .openPopup();
    },
    function () {
      alert('Could not get your position');
    },
  );
}
