'use strict';

// const balloons = document.querySelectorAll('.balloon');

// for (let i = 0; i < balloons.length; i++) {
//   const b = balloons[i];

//   b.addEventListener('mouseenter', function () {
//     b.style.animation = 'none';

//     b.offsetHeight;

//     b.style.transform = 'scale(1.3)';
//   });

//   b.addEventListener('mouseleave', function () {
//     b.style.transform = 'scale(1)';

//     b.style.animation = 'bounce 5s ease-in-out infinite';
//   });
// }

const balloons = document.querySelectorAll('.balloon');

for (const balloon of balloons) {
  balloon.addEventListener('mouseenter', function () {
    balloon.style.scale = 1.3;
  });

  balloon.addEventListener('mouseleave', function () {
    balloon.style.scale = 1;
  });
}
