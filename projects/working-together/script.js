const populateUserImages = async function () {
  const users = document.querySelector('.users-list');

  if (!users) {
    console.error("Could not find element with ID 'users-list'");
    return;
  }

  try {
    const res = await fetch('https://randomuser.me/api/?results=5');

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();

    users.innerHTML = '';

    data.results.forEach((user) => {
      const listItem = document.createElement('li');
      const imageEl = document.createElement('img');

      imageEl.src = user.picture.thumbnail;
      imageEl.alt = 'Random User Profile Picture';

      listItem.appendChild(imageEl);
      users.appendChild(listItem);
    });
  } catch (error) {
    console.error('Populate list failed:', error);
  }
};

// Run the function
populateUserImages();
