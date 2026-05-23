document.addEventListener("DOMContentLoaded", function () {
    // Dữ liệu mô phỏng lấy từ hệ thống đặt hàng của Cadeau Case
    const mockOrders = [
        {
            id: "CAD-98234",
            date: "23/05/2026",
            phoneModel: "iPhone 15 Pro Max",
            caseType: "Ốp Chống Sốc Trong Suốt (Custom Name)",
            image: "../images/products/phone-case-demo.jpg", 
            price: "185.000đ",
            status: "production",
            statusText: "Đang sản xuất"
        },
        {
            id: "CAD-97112",
            date: "18/05/2026",
            phoneModel: "Samsung S25 Ultra",
            caseType: "Ốp Nhám Mờ Pastel + Sticker",
            image: "../images/products/phone-case-demo2.jpg",
            price: "210.000đ",
            status: "delivered",
            statusText: "Đã giao hàng"
        }
    ];

    const listContainer = document.getElementById("orders-list");

    listContainer.innerHTML = mockOrders.map(order => `
        <div class="order-cadeau-card">
            <div class="card-top-bar">
                <span class="order-code">Đơn hàng #${order.id}</span>
                <span class="cadeau-status st-${order.status}">${order.statusText}</span>
            </div>
            <div class="card-main-content">
                <img src="${order.image}" class="product-preview-img" onerror="this.src='https://via.placeholder.com/90x120?text=Cadeau'">
                <div class="product-info-details">
                    <h3>${order.phoneModel}</h3>
                    <p class="order-meta-text"><strong>Phân loại:</strong> ${order.caseType}</p>
                    <p class="order-meta-text"><strong>Ngày đặt hàng:</strong> ${order.date}</p>
                    <div class="price-tag-total">${order.price}</div>
                </div>
            </div>
            <div class="card-action-group">
                <button class="btn-cadeau-primary" onclick="window.location.href='../tracking/tracking.html?orderId=${order.id}'">Track Order</button>
                ${order.status === 'delivered' ? `<button class="btn-cadeau-secondary" onclick="window.location.href='../feedback/feedback.html?orderId=${order.id}'">Feedback / Complaint</button>` : ''}
            </div>
        </div>
    `).join('');
});
