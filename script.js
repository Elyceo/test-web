// Menu data
const menuItems = [
  // Burgers
  {
    id: 1,
    name: "Hambúrguer c/ Ovo",
    price: 100,
    category: "burger",
    popular: true,
    icon: "hamburger",
  },
  {
    id: 2,
    name: "Hambúrguer de Frango",
    price: 165,
    category: "burger",
    popular: false,
    icon: "drumstick-bite",
  },
  {
    id: 3,
    name: "Hambúrguer completo c/ Batata",
    price: 150,
    category: "burger",
    popular: true,
    icon: "hamburger",
  },

  // Sandwiches
  {
    id: 4,
    name: "O Rei Ovo",
    price: 50,
    category: "sandwich",
    popular: false,
    icon: "bread-slice",
  },
  {
    id: 5,
    name: "Sande de Palony de Frango",
    price: 50,
    category: "sandwich",
    popular: false,
    icon: "bread-slice",
  },
  {
    id: 6,
    name: "Rainha Rachel",
    price: 60,
    category: "sandwich",
    popular: true,
    icon: "bread-slice",
  },
  {
    id: 7,
    name: "Rainha Rachel c/ Ovo",
    price: 85,
    category: "sandwich",
    popular: false,
    icon: "bread-slice",
  },
  {
    id: 8,
    name: "Sandes de Carne Assada",
    price: 100,
    category: "sandwich",
    popular: false,
    icon: "bread-slice",
  },
  {
    id: 9,
    name: "Club Sanduíche",
    price: 150,
    category: "sandwich",
    popular: true,
    icon: "bread-slice",
  },

  // Toasts
  {
    id: 10,
    name: "Tosta de Frango",
    price: 70,
    category: "toast",
    popular: false,
    icon: "cheese",
  },
  {
    id: 11,
    name: "Tosta de Queijo",
    price: 70,
    category: "toast",
    popular: true,
    icon: "cheese",
  },
  {
    id: 12,
    name: "Tosta de Mista",
    price: 150,
    category: "toast",
    popular: false,
    icon: "cheese",
  },

  // Drinks
  {
    id: 13,
    name: "Sumo Natural",
    price: 150,
    category: "drink",
    popular: true,
    icon: "glass-whiskey",
  },
  {
    id: 14,
    name: "Água",
    price: 25,
    category: "drink",
    popular: true,
    icon: "tint",
  },
  {
    id: 15,
    name: "Fizz",
    price: 15,
    category: "drink",
    popular: false,
    icon: "wine-bottle",
  },
  {
    id: 16,
    name: "Refresco a garrafa",
    price: 25,
    category: "drink",
    popular: false,
    icon: "wine-bottle",
  },
  {
    id: 17,
    name: "Refresco a Lata",
    price: 50,
    category: "drink",
    popular: true,
    icon: "beer",
  },
  {
    id: 18,
    name: "Chá",
    price: 35,
    category: "drink",
    popular: false,
    icon: "mug-hot",
  },
  {
    id: 19,
    name: "Café",
    price: 35,
    category: "drink",
    popular: true,
    icon: "coffee",
  },
];

// Cart data
let cart = [];
let cartCount = 0;
let cartTotal = 0;

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  filterItems("all");
});

// Filter items by category
function filterItems(category) {
  const menuContainer = document.getElementById("menu-items");
  menuContainer.innerHTML = "";

  let filteredItems = [];

  if (category === "all") {
    filteredItems = menuItems.filter((item) => item.popular);
  } else {
    filteredItems = menuItems.filter((item) => item.category === category);
  }

  if (filteredItems.length === 0) {
    menuContainer.innerHTML =
      '<p class="text-gray-500 col-span-3 text-center py-8">No items found in this category</p>';
    return;
  }

  filteredItems.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.className =
      "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition";
    itemElement.innerHTML = `
          <div class="p-4">
              <div class="flex justify-between items-start mb-2">
                  <div class="flex items-center gap-2">
                      <i class="fas fa-${item.icon} text-amber-600"></i>
                      <h3 class="font-semibold text-lg">${item.name}</h3>
                  </div>
                  <span class="font-bold text-amber-800">${item.price.toFixed(
                    2
                  )} Mts</span>
              </div>
              <div class="flex items-center justify-between mt-4">
                  <div class="flex items-center border rounded-lg overflow-hidden">
                      <button onclick="updateQuantity(${
                        item.id
                      }, -1)" class="px-3 py-1 bg-gray-100 hover:bg-gray-200">-</button>
                      <span id="quantity-${item.id}" class="px-3 py-1">1</span>
                      <button onclick="updateQuantity(${
                        item.id
                      }, 1)" class="px-3 py-1 bg-gray-100 hover:bg-gray-200">+</button>
                  </div>
                  <button onclick="addToCart(${
                    item.id
                  })" class="bg-amber-600 text-white px-4 py-1 rounded-lg hover:bg-amber-700 transition">
                      Add
                  </button>
              </div>
          </div>
      `;
    menuContainer.appendChild(itemElement);
  });
}

// Update quantity for an item
function updateQuantity(itemId, change) {
  const quantityElement = document.getElementById(`quantity-${itemId}`);
  let quantity = parseInt(quantityElement.textContent) + change;
  if (quantity < 1) quantity = 1;
  quantityElement.textContent = quantity;
}

// Add item to cart
function addToCart(itemId) {
  const quantity = parseInt(
    document.getElementById(`quantity-${itemId}`).textContent
  );
  const item = menuItems.find((item) => item.id === itemId);

  const existingItem = cart.find((cartItem) => cartItem.id === itemId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: quantity,
    });
  }

  updateCart();
  showCartNotification();
}

// Update cart UI
function updateCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartCountElement = document.getElementById("cart-count");
  const cartTotalElement = document.getElementById("cart-total");

  // Update count
  cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  cartCountElement.textContent = cartCount;

  // Update total
  cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  cartTotalElement.textContent = cartTotal.toFixed(2) + " Mts";

  // Update items list
  if (cart.length === 0) {
    cartItemsContainer.innerHTML =
      '<p class="text-gray-500 text-center py-4">Your cart is empty</p>';
    return;
  }

  cartItemsContainer.innerHTML = "";
  cart.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.className = "flex justify-between items-center py-3 border-b";
    itemElement.innerHTML = `
          <div>
              <h4 class="font-medium">${item.name}</h4>
              <div class="flex items-center gap-2 mt-1">
                  <button onclick="updateCartItem(${
                    item.id
                  }, -1)" class="text-xs text-gray-500 hover:text-amber-600">
                      <i class="fas fa-minus"></i>
                  </button>
                  <span class="text-sm">${item.quantity}</span>
                  <button onclick="updateCartItem(${
                    item.id
                  }, 1)" class="text-xs text-gray-500 hover:text-amber-600">
                      <i class="fas fa-plus"></i>
                  </button>
                  <button onclick="removeFromCart(${
                    item.id
                  })" class="text-xs text-red-500 hover:text-red-700 ml-2">
                      <i class="fas fa-trash"></i>
                  </button>
              </div>
          </div>
          <span class="font-medium">${(item.price * item.quantity).toFixed(
            2
          )} Mts</span>
      `;
    cartItemsContainer.appendChild(itemElement);
  });
}

// Update item quantity in cart
function updateCartItem(itemId, change) {
  const item = cart.find((item) => item.id === itemId);

  if (item) {
    item.quantity += change;

    if (item.quantity < 1) {
      cart = cart.filter((cartItem) => cartItem.id !== itemId);
    }

    updateCart();
  }
}

// Remove item from cart
function removeFromCart(itemId) {
  cart = cart.filter((item) => item.id !== itemId);
  updateCart();
}

// Toggle cart visibility
function toggleCart() {
  const cartModal = document.getElementById("cart-modal");
  cartModal.classList.toggle("hidden");
  cartModal.classList.toggle("flex");
}

// Show notification when item is added to cart
function showCartNotification() {
  const notification = document.createElement("div");
  notification.className =
    "fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in-out";
  notification.textContent = "Item added to cart!";
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add(
      "opacity-0",
      "transition-opacity",
      "duration-300"
    );
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}

// Checkout function
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const orderDetails = cart
    .map(
      (item) =>
        `${item.name} x${item.quantity} - ${(
          item.price * item.quantity
        ).toFixed(2)} Mts`
    )
    .join("\n");

  alert(
    `Order placed!\n\n${orderDetails}\n\nTotal: ${cartTotal.toFixed(
      2
    )} Mts\n\nThank you for your order!`
  );

  // Clear cart
  cart = [];
  updateCart();
  toggleCart();
}
