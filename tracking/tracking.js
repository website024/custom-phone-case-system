const orderLogData = {
  "CAD-2026-9041": {
    status: "Production",
    logs: [
      { time: "23/05/2026 09:30", message: "Bản thiết kế đã qua kiểm tra vùng in an toàn đạt chuẩn và chuyển xuống máy in chuyên dụng." },
      { time: "23/05/2026 08:15", message: "Nhân viên kho xác nhận đủ phôi ốp và phụ kiện Gương Mini dán kèm." },
      { time: "23/05/2026 07:00", message: "Hệ thống tự động ghi nhận đơn hàng thành công từ giỏ hàng." }
    ]
  },
  "CAD-2026-8712": {
    status: "Delivered",
    logs: [
      { time: "22/05/2026 15:00", message: "Đơn hàng đã được giao thành công tới tay khách hàng." },
      { time: "20/05/2026 10:20", message: "Đơn vị vận chuyển lấy hàng và bắt đầu lộ trình giao hàng tốc hành." },
      { time: "19/05/2026 16:15", message: "Bộ phận kiểm tra chất lượng (QC) hoàn tất đóng gói sản phẩm chống sốc." },
      { time: "19/05/2026 11:00", message: "Đơn hàng hoàn tất in phun UV 3D bề mặt nổi." }
    ]
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const queryParams = new URLSearchParams(window.location.search);
  let orderId = queryParams.get('id') || "CAD-2026-9041";

  document.getElementById("lbl-order-id").innerText = orderId;

  const currentOrder = orderLogData[orderId] || orderLogData["CAD-2026-9041"];
  renderStepperNodes(currentOrder.status);
  renderLogTimeline(currentOrder.logs);
});

function renderStepperNodes(status) {
  const stepsOrder = ["Pending", "Production", "Shipping", "Delivered"];
  const targetIdx = stepsOrder.indexOf(status);

  stepsOrder.forEach((step, index) => {
    const element = document.getElementById(`node-${step}`);
    if (!element) return;

    if (index < targetIdx) {
      element.classList.add("completed");
      if (element.nextElementSibling && element.nextElementSibling.classList.contains("connector-line")) {
        element.nextElementSibling.classList.add("completed");
      }
    } else if (index === targetIdx) {
      element.classList.add("active");
    }
  });
}

function renderLogTimeline(logs) {
  const loggerUl = document.getElementById("timeline-logger");
  loggerUl.innerHTML = "";

  logs.forEach((log, index) => {
    const li = document.createElement("li");
    if (index === 0) li.className = "newest-node";
    li.innerHTML = `<span class="timestamp">${log.time}</span> <span>${log.message}</span>`;
    loggerUl.appendChild(li);
  });
}
