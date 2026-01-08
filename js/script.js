// Food menu with actual images
const menu = [
  { id: 1, name: "Margherita Pizza", price: 8.99, img: "images/pizza1.jpg" },
  { id: 2, name: "Pepperoni Pizza", price: 9.99, img: "images/pizza2.jpg" },
  { id: 3, name: "Cheeseburger", price: 7.49, img: "images/burger1.jpg" },
  { id: 4, name: "Veggie Burger", price: 6.99, img: "images/burger2.jpg" },
  { id: 5, name: "Coke", price: 1.99, img: "images/drink1.jpg" },
  { id: 6, name: "Ice Cream", price: 3.99, img: "images/dessert1.jpg" },
  { id: 7, name: "Chocolate Cake", price: 4.99, img: "images/dessert2.jpg" }
];

let cart = [];

// Display menu
const menuGrid = document.getElementById('menuGrid');
menu.forEach(item => {
  const card = document.createElement('div');
  card.className = 'food-card';
  card.innerHTML = `
    <img src="${item.img}" alt="${item.name}">
    <h3>${item.name}</h3>
    <p>Price: $${item.price.toFixed(2)}</p>
    <button onclick="addToCart(${item.id})">Add to Cart</button>
  `;
  menuGrid.appendChild(card);
});

// Add to cart
function addToCart(id) {
  const item = menu.find(food => food.id === id);
  cart.push(item);
  updateCart();
}

// Update cart UI
function updateCart() {
  const cartDiv = document.getElementById('cartItems');
  const totalPrice = document.getElementById('totalPrice');
  
  if(cart.length === 0) {
    cartDiv.innerHTML = "No items added yet.";
    totalPrice.innerText = "Total: $0.00";
    return;
  }

  cartDiv.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    const div = document.createElement('div');
    div.innerHTML = `${item.name} - $${item.price.toFixed(2)} <button onclick="removeFromCart(${index})">Remove</button>`;
    cartDiv.appendChild(div);
  });
  totalPrice.innerText = `Total: $${total.toFixed(2)}`;
}

// Remove from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// Checkout
document.getElementById('checkoutBtn').addEventListener('click', () => {
  if(cart.length === 0) {
    alert("Your cart is empty!");
  } else {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    alert(`Thank you for your order! Total: $${total.toFixed(2)}`);
    cart = [];
    updateCart();
  }
});
