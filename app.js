const PRODUCTS = [
  {
    id: 1,
    name: "Lotus Bloom Silk Scarf",
    seller: "Meera Bai",
    price: 78,
    img: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Indigo Handloom Shawl",
    seller: "Sushila Rao",
    price: 92,
    img: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Terracotta Serve Bowl",
    seller: "Rahim Khan",
    price: 42,
    img: "https://images.unsplash.com/photo-1612197524382-70b7d3d9d7d8?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Brass Lamp Pair",
    seller: "Ayesha Shaikh",
    price: 66,
    img: "https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Palm Weave Basket",
    seller: "Lata More",
    price: 35,
    img: "https://images.unsplash.com/photo-1616627547584-bf28cee262db?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Block-Print Runner",
    seller: "Ravi Patil",
    price: 48,
    img: "https://images.unsplash.com/photo-1616047006789-b7af9f8c1d8e?auto=format&fit=crop&w=800&q=80",
  },
];

const body = document.body;
const cartKey = "karigar-cart-count";
let cartCount = Number(localStorage.getItem(cartKey) || 0);

const renderCart = () => {
  document.querySelectorAll("[data-cart-count]").forEach((el) => {
    el.textContent = String(cartCount);
  });
};

const showToast = (message) => {
  const host = document.querySelector("[data-toast-host]");
  if (!host) return;
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  host.appendChild(toast);
  setTimeout(() => toast.remove(), 2300);
};

const toggleMenu = () => body.classList.toggle("menu-open");
document.querySelectorAll("[data-menu-toggle]").forEach((btn) => {
  btn.addEventListener("click", toggleMenu);
});
document.querySelectorAll(".side-menu a").forEach((link) => {
  link.addEventListener("click", () => body.classList.remove("menu-open"));
});

const grid = document.querySelector("[data-product-grid]");
if (grid) {
  grid.innerHTML = PRODUCTS.map(
    (p) => `
      <article class="product-tile">
        <img src="${p.img}" alt="${p.name}"/>
        <h3>${p.name}</h3>
        <p class="seller">by ${p.seller}</p>
        <p class="price">$${p.price.toFixed(2)}</p>
        <button class="primary-btn full" data-add-id="${p.id}">Add to Cart</button>
      </article>
    `
  ).join("");
}

document.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;

  if (target.matches("[data-add-to-cart], [data-add-id]")) {
    cartCount += 1;
    localStorage.setItem(cartKey, String(cartCount));
    renderCart();
    showToast("Added to cart");
  }

  if (target.dataset.toast) {
    showToast(target.dataset.toast);
  }
});

document.querySelectorAll("form[data-form-toast]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = form.getAttribute("data-form-toast") || "Submitted";
    showToast(message);
    form.reset();
  });
});

renderCart();
