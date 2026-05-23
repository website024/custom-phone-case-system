// Dữ liệu đơn hàng giả lập đồng bộ với quy trình hệ thống
const mockOrders = [
    {
        id: "ORD-2026-001",
        date: "22/05/2026",
        phoneModel: "iPhone 15 Pro Max",
        caseType: "Ốp Silicon chống sốc",
        accessories: "Dây đeo hạt charm",
        previewUrl: "../images/products/sample-case-1.jpg", 
        status: "Production", // Pending, Production, Shipping, Delivered
        totalPrice: "280000"
    },
    {
        id: "ORD-2026-002",
        date: "18/05/2026",
        phoneModel: "Samsung Galaxy S25 Ultra",
        caseType: "Ốp nhám mờ viền màu",
        accessories: "Gương mini dán mặt sau",
        previewUrl: "../images/products/sample-case-2.jpg",
        status: "Delivered",
        totalPrice: "310000"
    }
];

document.addEventListener("DOMContentLoaded", () => {
    renderOrders("all");
    initFilterEvents();
});

function renderOrders(statusFilter) {
    const ordersContainer = document.getElementById("orders-list");
    ordersContainer.innerHTML = "";

    const filteredOrders = statusFilter === "all" 
        ? mockOrders 
        : mockOrders.filter(o => o.status === statusFilter);

    if (filteredOrders.length === 0) {
        ordersContainer.innerHTML = `<div class="no-orders"><p>Không tìm thấy đơn hàng nào thuộc trạng thái này.</p></div>`;
        return;
    }

    filteredOrders.forEach(order => {
        let statusText = "";
        let statusClass = "";

        switch(order.status) {
            case "Pending": statusText = "Chờ xác nhận"; statusClass = "status-pending"; break;
            case "Production": statusText = "Đang sản xuất"; statusClass = "status-production"; break;
            case "Shipping": statusText = "Đang giao hàng"; statusClass = "status-shipping"; break;
            case "Delivered": statusText = "Đã giao hàng"; statusClass = "status-delivered"; break;
        }

        const card = document.createElement("div");
        card.className = "order-card";
        card.innerHTML = `
            <div class="order-card-header">
                <div>
                    <span class="order-id">Mã đơn: ${order.id}</span>
                    <span style="color: #888; margin-left: 15px;">Ngày đặt: ${order.date}</span>
                </div>
                <span class="order-status ${statusClass}">${statusText}</span>
            </div>
            <div class="order-card-body">
                <img src="${order.previewUrl}" alt="Preview" class="product-preview-img" onerror="this.src='https://via.placeholder.com/90x120?text=Custom+Case'">
                <div class="product-details">
                    <h4 class="product-title">${order.phoneModel}</h4>
                    <p class="product-meta">Loại ốp: <strong>${order.caseType}</strong></p>
                    <p class="product-meta">Phụ kiện: <span>${order.accessories || 'Không kèm phụ kiện'}</span></p>
                </div>
            </div>
            <div class="order-card-footer">
                <div class="order-total">Tổng số tiền: <span>${Number(order.totalPrice).toLocaleString('vi-VN')} đ</span></div>
                <div class="order-actions">
                    <a href="../tracking/tracking.html?id=${order.id}" class="btn-track">Theo dõi đơn</a>
                    <a href="../feedback/feedback.html?id=${order.id}" class="btn-feedback">Đánh giá / Khiếu nại</a>
                </div>
            </div>
        `;
        ordersContainer.appendChild(card);
    });
}

function initFilterEvents() {
    const buttons = document.querySelectorAll(".filter-btn");
    buttons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            buttons.forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");
            renderOrders(e.target.getAttribute("data-status"));
        });
    });
}
