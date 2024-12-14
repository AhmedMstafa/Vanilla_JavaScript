const products = [
  {
    name: 'Sony Playstation 5',
    url: 'images/playstation_5.png',
    type: 'games',
    price: 499.99,
  },
  {
    name: 'Samsung Galaxy',
    url: 'images/samsung_galaxy.png',
    type: 'smartphones',
    price: 399.99,
  },
  {
    name: 'Cannon EOS Camera',
    url: 'images/cannon_eos_camera.png',
    type: 'cameras',
    price: 749.99,
  },
  {
    name: 'Sony A7 Camera',
    url: 'images/sony_a7_camera.png',
    type: 'cameras',
    price: 1999.99,
  },
  {
    name: 'LG TV',
    url: 'images/lg_tv.png',
    type: 'televisions',
    price: 799.99,
  },
  {
    name: 'Nintendo Switch',
    url: 'images/nintendo_switch.png',
    type: 'games',
    price: 299.99,
  },
  {
    name: 'Xbox Series X',
    url: 'images/xbox_series_x.png',
    type: 'games',
    price: 499.99,
  },
  {
    name: 'Samsung TV',
    url: 'images/samsung_tv.png',
    type: 'televisions',
    price: 1099.99,
  },
  {
    name: 'Google Pixel',
    url: 'images/google_pixel.png',
    type: 'smartphones',
    price: 499.99,
  },
  {
    name: 'Sony ZV1F Camera',
    url: 'images/sony_zv1f_camera.png',
    type: 'cameras',
    price: 799.99,
  },
  {
    name: 'Toshiba TV',
    url: 'images/toshiba_tv.png',
    type: 'televisions',
    price: 499.99,
  },
  {
    name: 'iPhone 14',
    url: 'images/iphone_14.png',
    type: 'smartphones',
    price: 999.99,
  },
];

// Get DOM Eelemnts
const proudcstWrapperEl = document.getElementById('products-wrapper');
const checkEls = document.querySelectorAll('.check');
const filtersContainer = document.getElementById('filters-container');
const searchInput = document.getElementById('search');
const cartButton = document.getElementById('cartButton');
const cartCount = document.getElementById('cartCount');

// Initialize Cart Item Count
let cartItemCount = 0;

// Initialze products
const productsEls = [];

// Toggle Add/Remove From Cart
const addToCart = function (e) {
  const statusEl = e.target;

  if (statusEl.classList.contains('added')) {
    // Remove From Cart
    statusEl.classList.remove('added');
    statusEl.innerText = 'Add To Card';
    statusEl.classList.add('bg-gray-800');
    statusEl.classList.remove('bg-red-600');
    cartItemCount--;
  } else {
    // Add To Cart
    statusEl.classList.add('added');
    statusEl.innerText = 'Remove From Card';
    statusEl.classList.remove('bg-gray-800');
    statusEl.classList.add('bg-red-600');
    cartItemCount++;
  }
  cartCount.innerText = cartItemCount.toString();
};

// Create Product Element
const createProductElement = function (product) {
  const productEl = document.createElement('div');
  productEl.className = 'item space-y-2';

  productEl.innerHTML = `
  <div class="bg-gray-100 flex-justify-center relative overflow-hidden group cursore-pointer border">
    <img src="${product.url}" alt="${
    product.name
  }" class="w-full h-full object-cover">
    <span
    class="status bg-black text-white absolute bottom-0 left-0 right-0 text-center py-2 translate-y-full transition group-hover:translate-y-0">Add
    To Cart</span>
  </div>
  <p class="text-xl">${product.type}</p>
  <strong>${product.price.toLocaleString()}</strong>
  `;

  productEl.querySelector('.status').addEventListener('click', addToCart);

  return productEl;
};

// Filter Products By Search Or Checkbox
const filterProducts = function () {
  // Get Sear term
  const searchTerm = searchInput.value.trim().toLocaleLowerCase();
  // Get Checked Categories
  const checkedCategories = Array.from(checkEls)
    .filter((check) => check.checked)
    .map((check) => check.id);

  // Loop Over Products And Check For Matches
  productsEls.forEach((productEl, index) => {
    const product = products[index];
    const matchesSearchTerm = product.name
      .toLocaleLowerCase()
      .includes(searchTerm);
    const isInCheckedCategory =
      checkedCategories.length === 0 ||
      checkedCategories.includes(product.type);

    // Show Or Hide Product Based On Matches
    if (matchesSearchTerm && isInCheckedCategory) {
      productEl.classList.remove('hidden');
    } else {
      productEl.classList.add('hidden');
    }
  });
};

// Add Filter Event Listenrs
filtersContainer.addEventListener('change', filterProducts);
searchInput.addEventListener('input', filterProducts);

// Loop over The Proucuts And Create The Product Elemnts
products.forEach((product) => {
  const productsEl = createProductElement(product);
  productsEls.push(productsEl);
  proudcstWrapperEl.appendChild(productsEl);
});
