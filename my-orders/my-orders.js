document.addEventListener("DOMContentLoaded", function () {
    // Dữ liệu giả lập lấy từ data.js hoặc đơn hàng bạn đã đặt ở bước trước
    const sampleOrders = [
        {
            id: "ORD98234",
            date: "22/05/2026",
            productName: "Ốp iPhone 15 Pro Max - Thiết kế hình cá nhân [cite: 19, 21]",
            image: "../images/products/phone-case-demo.jpg",
            totalPrice: "185.000đ [cite: 24]",
            statusCode: "production", // Khớp với bước Production của hệ thống [cite: 56]
            statusText: "Đang sản xuất [cite: 56]"
        },
        {
            id: "ORD97112",
            date: "15/05/2026",
            productName: "Ốp Samsung S25 Ultra - Ốp silicon chống sốc [cite: 20]",
            image: "../images/products/phone-case-demo2.jpg",
            totalPrice: "210.000đ [cite: 24]",
            statusCode: "delivered", // Trạng thái đã giao [cite: 58]
            statusText: "Đã giao hàng [cite: 58]"
        }
    ];

    const ordersList = document.getElementById("orders-list");

    ordersList.innerHTML = sampleOrders.map(order => `
        <div class="order-card">
            <div class="order-header">
                <span><strong>Mã đơn: #${order.id}</strong></span>
                <span class="status-${order.statusCode}">${order.statusText}</span>
            </div>
            <div class="order-body">
                <img src="${order.image}" class="order-img" onerror="this.src='https://via.placeholder.com/80x100?text=Ốp+Điện+Thoại'">
                <div class="order-details">
                    <h4>${order.productName}</h4>
                    <p>Ngày đặt: ${order.date}</p>
                    <p class="order-total">Tổng tiền: <span>${order.totalPrice}</span></p>
                </div>
            </div>
            <div class="order-actions">
                <button class="btn-track" onclick="window.location.href='../tracking/tracking.html?orderId=${order.id}'">Theo dõi [cite: 50]</button>
                ${order.statusCode === 'delivered' ? `<button class="btn-feedback" onclick="window.location.href='../feedback/feedback.html?orderId=${order.id}'">Đánh giá/Khiếu nại [cite: 51]</button>` : ''}
            </div>
        </div>
    `).join('');
});
