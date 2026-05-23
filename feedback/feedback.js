document.addEventListener("DOMContentLoaded", () => {
  const urlQuery = new URLSearchParams(window.location.search);
  const targetId = urlQuery.get('id');

  if (targetId) {
    document.getElementById("target-order-id").value = targetId;
  } else {
    document.getElementById("target-order-id").value = "CAD-2026-9041";
  }

  handleFormSubmission();
});

function handleFormSubmission() {
  const formElement = document.getElementById("cadeauFeedbackForm");
  formElement.addEventListener("submit", (e) => {
    e.preventDefault();

    const payload = {
      feedbackId: "FB-" + Date.now(),
      orderId: document.getElementById("target-order-id").value,
      category: document.getElementById("feedback-category-select").value,
      details: document.getElementById("feedback-text-content").value,
      status: "Chờ xử lý"
    };

    console.log("Dữ liệu tự động lưu vào bảng feedbacks:", payload);

    alert(`Gửi phản hồi cho đơn hàng ${payload.orderId} thành công!\nBộ phận Chăm sóc khách hàng Cadeau Case đã tiếp nhận khiếu nại/đánh giá và sẽ xử lý sớm nhất trên hệ thống Dashboard Admin.`);
    
    window.location.href = "../my-orders/my-orders.html";
  });
}
