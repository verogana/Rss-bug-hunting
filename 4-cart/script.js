const products = [
  { id: 1, name: "Кофе", price: 300 },
  { id: 2, name: "Чай", price: 200 },
  { id: 3, name: "Круассан", price: 150 },
  { id: 4, name: "Маффин", price: 180 },
];

let cart = [];
let discount = 0;

const productsEl = document.getElementById("products");
const cartItemsEl = document.getElementById("cart-items");
const badgeEl = document.getElementById("badge");
const totalEl = document.getElementById("total");
const emptyMsg = document.getElementById("empty-msg");
const promoInput = document.getElementById("promo-input");
const promoBtn = document.getElementById("promo-btn");
const clearBtn = document.getElementById("clear-btn");

function renderProducts() {
  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product";
    const title = document.createElement("h3");
    title.textContent = product.name;
    const price = document.createElement("p");
    price.textContent = `${product.price} ₽`;
    const btn = document.createElement("button");
    btn.textContent = "В корзину";
    btn.addEventListener("click", () => addToCart(product.id));
    card.append(title, price, btn);
    productsEl.appendChild(card);
  });
}

function addToCart(id) {
  const product = products.find((p) => p.id === id);
  if (!product) return;

  const existingItem = cart.find((item) => item.id === id);
  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  renderCart();
}

function increaseQty(id) {
  const item = cart.find((i) => i.id === id);
  if (!item) return;
  item.qty += 1;
  renderCart();
}

function decreaseQty(id) {
  const item = cart.find((i) => i.id === id);
  if (!item) return;
  item.qty = Math.max(1, item.qty - 1);
  renderCart();
}

function removeItem(id) {
  cart = cart.filter((i) => i.id !== id);
  renderCart();
}

function applyPromo() {
  discount = promoInput.value.trim().toUpperCase() === "SALE10" ? 0.1 : 0;
  renderCart();
}

function clearCart() {
  cart = [];
  renderCart();
}

function renderCart() {
  cartItemsEl.innerHTML = "";
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const total = subtotal * (1 - discount);
  const quantity = cart.reduce((sum, item) => sum + item.qty, 0);

  cart.forEach((item) => {
    const lineTotal = item.price * item.qty;
    const li = document.createElement("li");
    li.className = "cart-item";
    li.innerHTML = `<span></span>
      <button class="qty-btn" data-act="dec" aria-label="Уменьшить количество">−</button>
      <span class="qty">${item.qty}</span>
      <button class="qty-btn" data-act="inc" aria-label="Увеличить количество">+</button>
      <span class="line">${lineTotal} ₽</span>
      <button class="remove" aria-label="Удалить товар">✕</button>`;
    li.querySelector("span").textContent = item.name;
    li.querySelector('[data-act="inc"]').addEventListener("click", () => increaseQty(item.id));
    li.querySelector('[data-act="dec"]').addEventListener("click", () => decreaseQty(item.id));
    li.querySelector(".remove").addEventListener("click", () => removeItem(item.id));
    cartItemsEl.appendChild(li);
  });

  badgeEl.textContent = quantity;
  totalEl.textContent = Number.isInteger(total) ? total : total.toFixed(2);
  emptyMsg.hidden = cart.length > 0;
}

promoBtn.addEventListener("click", applyPromo);
clearBtn.addEventListener("click", clearCart);

renderProducts();
renderCart();
