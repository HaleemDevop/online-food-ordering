const menu = [
  { id:1, name:"Margherita Pizza", category:"Pizza", price:8.99, img:"images/pizza1.jpg", rating:4 },
  { id:2, name:"Pepperoni Pizza", category:"Pizza", price:9.99, img:"images/pizza2.jpg", rating:5 },
  { id:3, name:"Cheeseburger", category:"Burger", price:7.99, img:"images/burger1.jpg", rating:4 },
  { id:4, name:"Veggie Burger", category:"Burger", price:6.99, img:"images/burger2.jpg", rating:4 },
  { id:5, name:"Coke", category:"Drinks", price:1.99, img:"images/drink1.jpg", rating:5 },
  { id:6, name:"Ice Cream", category:"Dessert", price:3.99, img:"images/dessert1.jpg", rating:5 },
  { id:7, name:"Chocolate Cake", category:"Dessert", price:4.99, img:"images/dessert2.jpg", rating:5 }
];

let cart = [];
let selectedCategory = "All";

function displayMenu() {
  const menuGrid = document.getElementById('menuGrid');
  menuGrid.innerHTML = "";
  menu.filter(item => selectedCategory==="All" || item.category===selectedCategory)
      .forEach(item=>{
    const card = document.createElement('div');
    card.className='food-card';
    card.innerHTML=`
      <img src="${item.img}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>Price: $${item.price.toFixed(2)}</p>
      <div class="rating">${'★'.repeat(item.rating)}${'☆'.repeat(5-item.rating)}</div>
      <input type="number" min="1" value="1" id="qty-${item.id}">
      <button onclick="addToCart(${item.id})">Add to Cart</button>
    `;
    menuGrid.appendChild(card);
  });
}

function filterCategory(category){
  selectedCategory=category;
  displayMenu();
}

function addToCart(id){
  const qty = parseInt(document.getElementById(`qty-${id}`).value);
  const item = menu.find(food=>food.id===id);
  const cartItem={...item, quantity:qty};
  const existing = cart.find(c=>c.id===id);
  if(existing){ existing.quantity+=qty; } 
  else { cart.push(cartItem); }
  updateCart();
}

function updateCart(){
  const cartDiv=document.getElementById('cartItems');
  const totalPrice=document.getElementById('totalPrice');
  cartDiv.innerHTML="";
  if(cart.length===0){ cartDiv.innerHTML="No items in cart yet."; totalPrice.innerText="Total: $0.00"; return; }
  let total=0;
  cart.forEach((item,index)=>{
    total+=item.price*item.quantity;
    const div=document.createElement('div');
    div.innerHTML=`${item.name} x ${item.quantity} - $${(item.price*item.quantity).toFixed(2)} <button onclick="removeFromCart(${index})">Remove</button>`;
    cartDiv.appendChild(div);
  });
  totalPrice.innerText=`Total: $${total.toFixed(2)}`;
}

function removeFromCart(index){ cart.splice(index,1); updateCart(); }

const modal=document.getElementById('checkoutModal');
document.getElementById('checkoutBtn').addEventListener('click',()=>{
  if(cart.length===0) return alert("Your cart is empty!");
  const summary=document.getElementById('orderSummary');
  summary.innerHTML="";
  let total=0;
  cart.forEach(item=>{ total+=item.price*item.quantity; 
    const div=document.createElement('div'); 
    div.innerText=`${item.name} x ${item.quantity} - $${(item.price*item.quantity).toFixed(2)}`;
    summary.appendChild(div);
  });
  document.getElementById('finalTotal').innerText=`Total: $${total.toFixed(2)}`;
  modal.style.display="block";
});

function closeModal(){ modal.style.display="none"; }

function payNow(){
  alert("Payment Successful! 🎉 Thank you for your order.");
  cart=[];
  updateCart();
  closeModal();
}

window.onclick=function(event){ if(event.target==modal) closeModal(); }

displayMenu();
