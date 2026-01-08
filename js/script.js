// Sample food menu
const menu = [
  { id: 1, name: "Burger", price: 5.99, img: "https://via.placeholder.com/200x150?text=Burger" },
  { id: 2, name: "Pizza", price: 8.99, img: "https://via.placeholder.com/200x150?text=Pizza" },
  { id: 3, name: "Pasta", price: 7.49, img: "https://via.placeholder.com/200x150?text=Pasta" },
  { id: 4, name: "Salad", price: 4.99, img: "https://via.placeholder.com/200x150?text=Salad" },
  { id: 5, name: "Sushi", price: 12.99, img: "https://via.placeholder.com/200x150?text=Sushi" }
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
    alert(`Thank you for your order! Total: $${cart.reduce((sum,item)=>sum+item.price,0).toFixed(2)}`);
    cart = [];
    updateCart();
  }
});
