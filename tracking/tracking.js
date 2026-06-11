document.addEventListener("DOMContentLoaded", () => {
  const queryParams = new URLSearchParams(window.location.search);
  const orderCode = queryParams.get("id");

  if (!orderCode) {
    document.getElementById("lbl-order-id").innerText = "No order code";
    renderStepperNodes("Pending");
    renderLogTimeline([
      {
        time: new Date(),
        message: "No order code was provided.",
      },
    ]);
    return;
  }

  document.getElementById("lbl-order-id").innerText = orderCode;
  loadTracking(orderCode);
});

async function loadTracking(orderCode) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/orders/tracking/${orderCode}`,
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Order not found");
    }

    renderStepperNodes(data.status);
    renderLogTimeline(data.logs);
  } catch (error) {
    console.error("Load tracking error:", error);

    renderStepperNodes("Pending");
    renderLogTimeline([
      {
        time: new Date(),
        message: "Unable to load tracking information from server.",
      },
    ]);
  }
}

function renderStepperNodes(status) {
  const stepsOrder = ["Pending", "Production", "Shipping", "Delivered"];
  const targetIdx = stepsOrder.indexOf(status);

  stepsOrder.forEach((step, index) => {
    const element = document.getElementById(`node-${step}`);
    if (!element) return;

    element.classList.remove("completed", "active");

    if (
      element.nextElementSibling &&
      element.nextElementSibling.classList.contains("connector-line")
    ) {
      element.nextElementSibling.classList.remove("completed");
    }

    if (index < targetIdx) {
      element.classList.add("completed");

      if (
        element.nextElementSibling &&
        element.nextElementSibling.classList.contains("connector-line")
      ) {
        element.nextElementSibling.classList.add("completed");
      }
    } else if (index === targetIdx) {
      element.classList.add("active");
    }
  });
}

function formatDateTime(dateString) {
  return new Date(dateString).toLocaleString("en-US");
}

function renderLogTimeline(logs) {
  const loggerUl = document.getElementById("timeline-logger");
  loggerUl.innerHTML = "";

  if (!logs || logs.length === 0) {
    loggerUl.innerHTML = `
      <li class="newest-node">
        <span class="timestamp">${formatDateTime(new Date())}</span>
        <span>No tracking logs available.</span>
      </li>
    `;
    return;
  }

  logs.forEach((log, index) => {
    const li = document.createElement("li");

    if (index === 0) {
      li.className = "newest-node";
    }

    li.innerHTML = `
      <span class="timestamp">${formatDateTime(log.time)}</span>
      <span>${log.message}</span>
    `;

    loggerUl.appendChild(li);
  });
}
