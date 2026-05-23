const userOrdersMock = [
  {
    id: "CAD-2026-9041",
    date: "23/05/2026",
    phoneModel: "iPhone 15 Pro Max",
    caseType: "Ốp Silicon Trong Suốt",
    accessory: "Gương mini dán mặt sau",
    icon: "🌸",
    status: "Production",
    totalPrice: "285000"
  },
  {
    id: "CAD-2026-8712",
    date: "19/05/2026",
    phoneModel: "Samsung Galaxy S25 Ultra",
    caseType: "Ốp Chống Sốc Viền Màu",
    accessory: "Dây đeo hạt Charm ngọt ngào",
    icon: "💙",
    status: "Delivered",
    totalPrice: "340000"
  }
];

document.addEventListener("DOMContentLoaded", () => {
  renderUserOrders("all");
  setupFilterClicks();
});

function renderUserOrders(filterStatus) {
  const container = document.getElementById("orders-list");
  container.innerHTML = "";

  const filtered = filterStatus === "all" ? userOrdersMock : userOrdersMock.filter(o => o.status === filterStatus);

  if (filtered.length === 0) {
    container.innerHTML = `<div class="no-orders-msg"><p>Bạn chưa có đơn hàng nào ở trạng thái này.</p></div>`;
    return;
  }

  filtered.forEach(order => {
    let badgeText = "", badgeClass = "";
    if (order.status === "Pending") { badgeText = "Chờ duyệt đơn"; badgeClass = "status-pending"; }
    else if (order.status === "Production") { badgeText = "Đang in ảnh / Gia công"; badgeClass = "status-production"; }
    else if (order.status === "Shipping") { badgeText = "Đang vận chuyển tốc hành"; badgeClass = "status-shipping"; }
    else if (order.status === "Delivered") { badgeText = "Đã giao thành công"; badgeClass = "status-delivered"; }

    const card = document.createElement("div");
    card.className = "order-card";
    card.innerHTML = `
      <div class="order-card-header">
        <div>
          <span class="order-id">Mã đơn: ${order.id}</span>
          <span style="color: var(--text-soft); margin-left:12px; font-size:13px;">Ngày đặt: ${order.date}</span>
        </div>
        <span class="order-status-badge ${badgeClass}">${badgeText}</span>
      </div>
      <div class="order-card-body">
        <div class="case-preview-box">${order.icon}</div>
        <div class="order-details">
          <h4>Dòng máy: ${order.phoneModel}</h4>
          <p>Chất liệu: <strong>${order.caseType}</strong></p>
          <p>Phụ kiện đi kèm: <span>${order.accessory || 'Không kèm phụ kiện'}</span></p>
        </div>
      </div>
      <div class="order-card-footer">
        <div class="order-total">Tổng thanh toán: <strong>${Number(order.totalPrice).toLocaleString('vi-VN')} đ</strong></div>
        <div class="order-actions">
          <a href="../tracking/tracking.html?id=${order.id}" class="btn-action-primary">Theo dõi tiến độ</a>
          <a href="../feedback/feedback.html?id=${order.id}" class="btn-action-secondary">Đánh giá / Khiếu nại</a>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function setupFilterClicks() {
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      buttons.forEach(b => b.classList.remove("active"));
      e.target.classList.add("active");
      renderUserOrders(e.target.getAttribute("data-status"));
    });
  });
}
