let userOrders = [];

document.addEventListener("DOMContentLoaded", () => {
  loadOrders();
  setupFilterClicks();
});

async function loadOrders() {
  try {
    const response = await fetch("http://localhost:5000/api/orders");
    userOrders = await response.json();

    renderUserOrders("all");
  } catch (error) {
    console.error("Load orders error:", error);
    const container = document.getElementById("orders-list");
    container.innerHTML = `
      <div class="no-orders-msg">
        <p>Unable to load orders from server.</p>
      </div>
    `;
  }
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleString("en-US");
}

function formatPrice(price) {
  return Number(price || 0).toLocaleString("vi-VN") + " VND";
}

function getStatusInfo(status) {
  if (status === "Pending") {
    return {
      text: "Pending Approval",
      className: "status-pending",
    };
  }

  if (status === "Production") {
    return {
      text: "In Production",
      className: "status-production",
    };
  }

  if (status === "Shipping") {
    return {
      text: "Shipping",
      className: "status-shipping",
    };
  }

  if (status === "Delivered") {
    return {
      text: "Delivered",
      className: "status-delivered",
    };
  }

  return {
    text: status || "Unknown",
    className: "status-pending",
  };
}

function renderUserOrders(filterStatus) {
  const container = document.getElementById("orders-list");
  container.innerHTML = "";

  const filtered =
    filterStatus === "all"
      ? userOrders
      : userOrders.filter((order) => order.OrderStatus === filterStatus);

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="no-orders-msg">
        <p>No orders found for this status.</p>
      </div>
    `;
    return;
  }

  filtered.forEach((order) => {
    const statusInfo = getStatusInfo(order.OrderStatus);

    const card = document.createElement("div");
    card.className = "order-card";

    card.innerHTML = `
      <div class="order-card-header">
        <div>
          <span class="order-id">Order Code: ${order.OrderCode}</span>
          <span style="color: var(--text-soft); margin-left:12px; font-size:13px;">
            Order Date: ${formatDate(order.CreatedAt)}
          </span>
        </div>
        <span class="order-status-badge ${statusInfo.className}">
          ${statusInfo.text}
        </span>
      </div>

      <div class="order-card-body">
        <div class="case-preview-box">📱</div>

        <div class="order-details">
          <h4>Device: ${order.DeviceModel || "Unknown"}</h4>
          <p>Case Type: <strong>${order.CaseType || "Unknown"}</strong></p>
          <p>Customer: <span>${order.CustomerName || ""}</span></p>
        </div>
      </div>

      <div class="order-card-footer">
        <div class="order-total">
          Total: <strong>${formatPrice(order.TotalAmount)}</strong>
        </div>

        <div class="order-actions">
          <a href="../tracking/tracking.html?id=${order.OrderCode}" class="btn-action-primary">
            Track Order
          </a>

          <a href="../feedback/feedback.html?id=${order.OrderCode}" class="btn-action-secondary">
            Review / Complaint
          </a>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

function setupFilterClicks() {
  const buttons = document.querySelectorAll(".filter-btn");

  buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      buttons.forEach((b) => b.classList.remove("active"));
      e.target.classList.add("active");

      renderUserOrders(e.target.getAttribute("data-status"));
    });
  });
}
