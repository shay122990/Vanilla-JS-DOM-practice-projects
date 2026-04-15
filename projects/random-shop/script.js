const productsContainer = document.querySelector('.products-container');

const renderProducts = function (data) {
  data.forEach((el) => {
    const html = `
    <div class="card">
      <h2 class="title">${el.title}</h2>
      <img class="product-image" src="${el.images[0]}" />
      <p class="brand">${el.brand}</p>
      <span>${el.description}</span>
      <p class="price">$${el.price}</p>
    </div>  
    `;
    productsContainer.insertAdjacentHTML('beforeend', html);
  });
};

fetch('https://dummyjson.com/products')
  .then((res) => res.json())
  .then((data) => {
    console.log(data.products);
    renderProducts(data.products);
  });

// TO-DO
// 1. separate into categories
// 2. filter and search
// 3. different containers for each category
