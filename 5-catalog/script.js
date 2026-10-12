const products = [
  { id: 1, name: "iPhone 15", price: 999, category: "phone" },
  { id: 2, name: "Galaxy S24", price: 899, category: "phone" },
  { id: 3, name: "Pixel 8", price: 699, category: "phone" },
  { id: 4, name: "MacBook Air", price: 1199, category: "laptop" },
  { id: 5, name: "ThinkPad X1", price: 1399, category: "laptop" },
  { id: 6, name: "AirPods Pro", price: 249, category: "audio" },
  { id: 7, name: "Sony WH-1000", price: 349, category: "audio" },
  { id: 8, name: "JBL Flip", price: 129, category: "audio" },
];

const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");
const sortSelect = document.getElementById("sort");
const resetBtn = document.getElementById("reset");
const grid = document.getElementById("grid");
const countEl = document.getElementById("count");

function getFiltered() {
  let result = products.filter((product) => {
    const search = searchInput.value.trim().toLowerCase();
    const matchesSearch = product.name.toLowerCase().includes(search);
    const matchesCategory =
      categorySelect.value === "all" || product.category === categorySelect.value;
    return matchesSearch && matchesCategory;
  });

  if (sortSelect.value === "asc") {
    result.sort((a, b) => a.price - b.price);
  } else if (sortSelect.value === "desc") {
    result.sort((a, b) => b.price - a.price);
  }

  return result;
}

function render() {
  const items = getFiltered();
  grid.innerHTML = "";

  items.forEach((product) => {
    const card = document.createElement("div");
    card.className = "card";
    const title = document.createElement("h3");
    title.textContent = product.name;
    const category = document.createElement("p");
    category.className = "cat";
    category.textContent = product.category;
    const price = document.createElement("p");
    price.className = "price";
    price.textContent = `$${product.price}`;
    card.append(title, category, price);
    grid.appendChild(card);
  });

  countEl.textContent = items.length;
}

function resetFilters() {
  searchInput.value = "";
  categorySelect.value = "all";
  sortSelect.value = "default";
  render();
}

searchInput.addEventListener("input", render);
categorySelect.addEventListener("change", render);
sortSelect.addEventListener("change", render);
resetBtn.addEventListener("click", resetFilters);

render();
