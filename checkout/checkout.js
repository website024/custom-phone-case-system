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
  return Number(price).toLocaleString("vi-VN") + "đ";
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
      <p>Quantity: ${item.quantity || 1}</p>
      <p>Price: ${formatPrice(Number(item.price || 0) * Number(item.quantity || 1))}</p>
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

  const selectedPayment = document.querySelector(
    "input[name='payment']:checked",
  );

  if (!selectedPayment) {
    alert("Please select a payment method.");
    return;
  }

  const paymentMethod = selectedPayment.value;

  if (!customerName || !customerPhone || !customerAddress) {
    alert("Please fill in full name, phone number, and delivery address.");
    return;
  }

  const orderData = {
    userId: 1,
    customerName: customerName,
    customerPhone: customerPhone,
    customerAddress: customerAddress,
    customerNote: customerNote,
    paymentMethod: paymentMethod,
    subtotal: order.subtotal,
    shippingFee: order.shippingFee,
    totalAmount: order.total,
    items: order.items,
  };

  fetch("http://localhost:5000/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.message === "Order created successfully") {
        localStorage.removeItem("cart");
        localStorage.removeItem("checkoutOrder");

        alert("Order placed successfully! Order code: " + data.orderCode);

        window.location.href = "../my-orders/my-orders.html";
      } else {
        alert("Order failed: " + data.message);
      }
    })
    .catch(function (error) {
      console.error("Checkout error:", error);
      alert("Cannot connect to server. Please try again.");
    });
});

renderCheckout();
