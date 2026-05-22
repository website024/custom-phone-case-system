const cartItemsContainer = document.getElementById("cartItems");
const totalItems = document.getElementById("totalItems");
const subtotal = document.getElementById("subtotal");
const shippingFee = document.getElementById("shippingFee");
const grandTotal = document.getElementById("grandTotal");
const checkoutBtn = document.getElementById("checkoutBtn");
const cartCount = document.getElementById("cartCount");

const SHIPPING_FEE = 30000;

function formatPrice(price) {
  return Number(price).toLocaleString("vi-VN") + "đ";
}

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function renderSimplePreview(item) {
  const box = document.createElement("div");
  box.className = "simple-preview";

  const frame = document.createElement("img");
  frame.src = `../customize/images/${item.frame}`;
  frame.className = "simple-frame";

  box.appendChild(frame);

  const firstImage = (item.designItems || []).find(
    design => design.type !== "text"
  );

  const firstText = (item.designItems || []).find(
    design => design.type === "text"
  );

  if (firstImage) {
    const designImg = document.createElement("img");
    designImg.src = firstImage.content;
    designImg.className = "simple-design-img";
    box.appendChild(designImg);
  }

  if (firstText) {
    const text = document.createElement("div");
    text.className = "simple-design-text";
    text.textContent = firstText.content;
    text.style.color = firstText.color || "#1e1b4b";
    text.style.fontFamily = firstText.fontFamily || "Arial";
    box.appendChild(text);
  }

  return box;
}

function updateSummary() {
  const cart = getCart();

  const itemCount = cart.reduce((sum, item) => {
    return sum + Number(item.quantity || 1);
  }, 0);

  const subTotalValue = cart.reduce((sum, item) => {
    return sum + Number(item.price || 0) * Number(item.quantity || 1);
  }, 0);

  const shippingValue = cart.length > 0 ? SHIPPING_FEE : 0;
  const totalValue = subTotalValue + shippingValue;

  totalItems.textContent = itemCount;
  subtotal.textContent = formatPrice(subTotalValue);
  shippingFee.textContent = formatPrice(shippingValue);
  grandTotal.textContent = formatPrice(totalValue);

  if (cartCount) {
    cartCount.textContent = cart.length;
  }
}

function renderCart() {
  const cart = getCart();

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="empty-cart">
        <h2>Your cart is empty</h2>
        <p>You have not added any custom case yet.</p>
        <a href="../customize/customize.html">Start customizing now</a>
      </div>
    `;

    checkoutBtn.disabled = true;
    updateSummary();
    return;
  }

  checkoutBtn.disabled = false;
  cartItemsContainer.innerHTML = "";

  cart.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "cart-card";

    const previewBox = document.createElement("div");
    previewBox.className = "preview-box";
    previewBox.appendChild(renderSimplePreview(item));

    const accessories = item.accessories && item.accessories.length > 0
      ? item.accessories.map(acc => `<span class="accessory-tag">${acc.name}</span>`).join("")
      : `<span class="accessory-tag">No accessories</span>`;

    const info = document.createElement("div");
    info.className = "cart-info";

    info.innerHTML = `
      <h3>${item.deviceModel}</h3>

      <p><strong>Case Type:</strong> ${item.caseType}</p>

      <p><strong>Custom Elements:</strong> ${(item.designItems || []).length} item(s)</p>

      <div class="accessory-list">
        ${accessories}
      </div>

      <div class="cart-actions">
        <div class="quantity-control">
          <button onclick="decreaseQuantity(${index})">−</button>
          <strong>${item.quantity || 1}</strong>
          <button onclick="increaseQuantity(${index})">+</button>
        </div>

        <div class="item-price">
          ${formatPrice(Number(item.price || 0) * Number(item.quantity || 1))}
        </div>
      </div>

      <button class="remove-btn" onclick="removeItem(${index})">
        Remove item
      </button>
    `;

    card.appendChild(previewBox);
    card.appendChild(info);

    cartItemsContainer.appendChild(card);
  });

  updateSummary();
}

function increaseQuantity(index) {
  const cart = getCart();
  cart[index].quantity = Number(cart[index].quantity || 1) + 1;
  saveCart(cart);
  renderCart();
}

function decreaseQuantity(index) {
  const cart = getCart();

  if (Number(cart[index].quantity || 1) > 1) {
    cart[index].quantity = Number(cart[index].quantity || 1) - 1;
  }

  saveCart(cart);
  renderCart();
}

function removeItem(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCart();
}

checkoutBtn.addEventListener("click", function () {
  const cart = getCart();

  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  const subTotalValue = cart.reduce((sum, item) => {
    return sum + Number(item.price || 0) * Number(item.quantity || 1);
  }, 0);

  const checkoutOrder = {
    items: cart,
    subtotal: subTotalValue,
    shippingFee: SHIPPING_FEE,
    total: subTotalValue + SHIPPING_FEE
  };

  localStorage.setItem("checkoutOrder", JSON.stringify(checkoutOrder));

  window.location.href = "../checkout/checkout.html";
});

renderCart();