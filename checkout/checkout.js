const checkoutItems = document.getElementById("checkoutItems");
const checkoutSubtotal = document.getElementById("checkoutSubtotal");
const checkoutShipping = document.getElementById("checkoutShipping");
const checkoutTotal = document.getElementById("checkoutTotal");
const checkoutForm = document.getElementById("checkoutForm");

const fullName = document.getElementById("fullName");
const phoneNumber = document.getElementById("phoneNumber");
const address = document.getElementById("address");
const note = document.getElementById("note");

function formatPrice(price) {
  return price.toLocaleString("vi-VN") + "đ";
}

function getCheckoutOrder() {
  return JSON.parse(localStorage.getItem("checkoutOrder"));
}

function renderCheckout() {
  const order = getCheckoutOrder();

  if (!order || !order.items || order.items.length === 0) {
    checkoutItems.innerHTML = `
      <p>No order found. Please return to cart.</p>
    `;

    checkoutSubtotal.textContent = formatPrice(0);
    checkoutShipping.textContent = formatPrice(0);
    checkoutTotal.textContent = formatPrice(0);
    return;
  }

  checkoutItems.innerHTML = "";

  order.items.forEach(function (item) {
    const div = document.createElement("div");
    div.className = "checkout-item";

    div.innerHTML = `
      <h4>${item.deviceModel}</h4>
      <p>${item.caseType}</p>
      <p>Quantity: ${item.quantity}</p>
      <p>Price: ${formatPrice(item.price * item.quantity)}</p>
    `;

    checkoutItems.appendChild(div);
  });

  checkoutSubtotal.textContent = formatPrice(order.subtotal);
  checkoutShipping.textContent = formatPrice(order.shippingFee);
  checkoutTotal.textContent = formatPrice(order.total);
}

checkoutForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const order = getCheckoutOrder();

  if (!order || !order.items || order.items.length === 0) {
    alert("No order found.");
    return;
  }

  const customerName = fullName.value.trim();
  const customerPhone = phoneNumber.value.trim();
  const customerAddress = address.value.trim();
  const customerNote = note.value.trim();

  const paymentMethod = document.querySelector("input[name='payment']:checked").value;

  if (!customerName || !customerPhone || !customerAddress) {
    alert("Please fill in full name, phone number, and delivery address.");
    return;
  }

  const newOrder = {
    id: "OD" + Date.now(),
    date: new Date().toLocaleString("vi-VN"),
    customer: {
      name: customerName,
      phone: customerPhone,
      address: customerAddress,
      note: customerNote
    },
    paymentMethod: paymentMethod,
    paymentStatus: paymentMethod === "COD" ? "Unpaid" : "Pending",
    status: "Pending",
    items: order.items,
    subtotal: order.subtotal,
    shippingFee: order.shippingFee,
    total: order.total
  };

  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(newOrder);

  localStorage.setItem("orders", JSON.stringify(orders));

  localStorage.removeItem("cart");
  localStorage.removeItem("checkoutOrder");

  alert("Order placed successfully!");

  window.location.href = "../my-orders/my-orders.html";
});

renderCheckout();