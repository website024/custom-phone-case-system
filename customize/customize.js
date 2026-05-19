const deviceModel = document.getElementById("deviceModel");
const caseType = document.getElementById("caseType");
const imageUpload = document.getElementById("imageUpload");
const removeBgBtn = document.getElementById("removeBgBtn");
const addTextBtn = document.getElementById("addTextBtn");

const customText = document.getElementById("customText");
const fontSelect = document.getElementById("fontSelect");
const textColor = document.getElementById("textColor");

const caseWorkspace = document.getElementById("caseWorkspace");
const caseFrame = document.getElementById("caseFrame");
const designArea = document.getElementById("designArea");

const totalPrice = document.getElementById("totalPrice");
const saveDesignBtn = document.getElementById("saveDesignBtn");
const addToCartBtn = document.getElementById("addToCartBtn");
const cartCount = document.getElementById("cartCount");

const previewModal = document.getElementById("previewModal");
const savedPreview = document.getElementById("savedPreview");
const editAgainBtn = document.getElementById("editAgainBtn");
const confirmCartBtn = document.getElementById("confirmCartBtn");

let selectedSticker = "";
let selectedItem = null;
let lastSavedDesign = null;

const frameByModel = {
  "iphone-x": "ipX.png",
  "iphone-xr": "ipX.png",
  "iphone-xs": "ipX.png",
  "iphone-xs-max": "ipX.png",

  "iphone-11": "normal.png",
  "iphone-12": "normal.png",
  "iphone-12-max": "normal.png",
  "iphone-13-mini": "normal.png",
  "iphone-13": "normal.png",
  "iphone-14": "normal.png",
  "iphone-14-plus": "normal.png",
  "iphone-15": "normal.png",
  "iphone-15-plus": "normal.png",

  "iphone-11-pro": "pro.png",
  "iphone-11-promax": "pro.png",
  "iphone-12-pro": "pro.png",
  "iphone-12-promax": "pro.png",
  "iphone-13-pro": "pro.png",
  "iphone-13-promax": "pro.png",
  "iphone-14-pro": "pro.png",
  "iphone-14-promax": "pro.png",
  "iphone-15-pro": "pro.png",
  "iphone-15-promax": "pro.png",
  "iphone-16-pro": "pro.png",
  "iphone-16-promax": "pro.png",

  "iphone-16e": "16e.png",
  "iphone-16": "plus.png",
  "iphone-16-plus": "plus.png",
  "iphone-17": "plus.png",

  "iphone-17-pro": "17pro.png",
  "iphone-17-promax": "17pro.png",

  "ipad-mini-6": "ipad.png",
  "ipad-mini-7": "ipad.png",
  "ipad-air-5-m1": "ipad.png",
  "ipad-air-m2": "ipad.png",
  "ipad-air-m3": "ipad.png",

  "ipad-pro-m1": "ipad pro.png",
  "ipad-pro-m2": "ipad pro.png",
  "ipad-pro-m4": "ipad pro.png",
  "ipad-pro-m5": "ipad pro.png"
};

const layoutByFrame = {
  "ipX.png": {
    workspaceW: 300, workspaceH: 560,
    body: { top: 95, left: 62, width: 176, height: 350, radius: 30 },
    camera: { top: 95, left: 62, width: 58, height: 105, radius: 24 }
  },
  "normal.png": {
    workspaceW: 300, workspaceH: 560,
    body: { top: 98, left: 64, width: 172, height: 342, radius: 30 },
    camera: { top: 100, left: 65, width: 54, height: 75, radius: 20 }
  },
  "pro.png": {
    workspaceW: 300, workspaceH: 560,
    body: { top: 94, left: 60, width: 180, height: 350, radius: 32 },
    camera: { top: 95, left: 62, width: 88, height: 120, radius: 28 }
  },
  "16e.png": {
    workspaceW: 300, workspaceH: 560,
    body: { top: 96, left: 63, width: 174, height: 345, radius: 30 },
    camera: { top: 97, left: 64, width: 58, height: 82, radius: 22 }
  },
  "plus.png": {
    workspaceW: 300, workspaceH: 560,
    body: { top: 96, left: 62, width: 176, height: 348, radius: 31 },
    camera: { top: 97, left: 63, width: 62, height: 88, radius: 22 }
  },
  "17pro.png": {
    workspaceW: 300, workspaceH: 560,
    body: { top: 94, left: 60, width: 180, height: 350, radius: 32 },
    camera: { top: 95, left: 62, width: 92, height: 126, radius: 30 }
  },
  "ipad.png": {
    workspaceW: 380, workspaceH: 520,
    body: { top: 68, left: 70, width: 240, height: 360, radius: 26 },
    camera: { top: 78, left: 82, width: 42, height: 42, radius: 50 }
  },
  "ipad pro.png": {
    workspaceW: 380, workspaceH: 520,
    body: { top: 65, left: 68, width: 244, height: 365, radius: 28 },
    camera: { top: 76, left: 82, width: 44, height: 44, radius: 50 }
  }
};

function applyLayout(frameName) {
  const layout = layoutByFrame[frameName] || layoutByFrame["ipX.png"];

  caseWorkspace.style.setProperty("--workspace-w", layout.workspaceW + "px");
  caseWorkspace.style.setProperty("--workspace-h", layout.workspaceH + "px");

  caseWorkspace.style.setProperty("--body-top", layout.body.top + "px");
  caseWorkspace.style.setProperty("--body-left", layout.body.left + "px");
  caseWorkspace.style.setProperty("--body-w", layout.body.width + "px");
  caseWorkspace.style.setProperty("--body-h", layout.body.height + "px");
  caseWorkspace.style.setProperty("--body-radius", layout.body.radius + "px");

  caseWorkspace.style.setProperty("--camera-top", layout.camera.top + "px");
  caseWorkspace.style.setProperty("--camera-left", layout.camera.left + "px");
  caseWorkspace.style.setProperty("--camera-w", layout.camera.width + "px");
  caseWorkspace.style.setProperty("--camera-h", layout.camera.height + "px");
  caseWorkspace.style.setProperty("--camera-radius", layout.camera.radius + "px");
}

function formatPrice(price) {
  return price.toLocaleString("vi-VN") + "đ";
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartCount.textContent = cart.length;
}

function updateFrame() {
  const frameName = frameByModel[deviceModel.value] || "ipX.png";
  caseFrame.src = `./images/${frameName}`;
  applyLayout(frameName);
}

function updatePrice() {
  const casePrice = Number(caseType.selectedOptions[0].dataset.price);

  let accessoryPrice = 0;
  document.querySelectorAll(".accessory:checked").forEach((item) => {
    accessoryPrice += Number(item.dataset.price);
  });

  const stickerPrice = selectedSticker ? 10000 : 0;
  const total = casePrice + accessoryPrice + stickerPrice;

  totalPrice.textContent = formatPrice(total);
  return total;
}

function updatePreview() {
  updateFrame();
  updatePrice();
}

function selectItem(item) {
  document.querySelectorAll(".design-item").forEach((el) => {
    el.classList.remove("active");
  });

  selectedItem = item;
  item.classList.add("active");
}

function createDesignItem(type, content) {
  const item = document.createElement("div");
  item.className = "design-item";
  item.dataset.type = type;
  item.dataset.content = content;
  item.style.left = "60px";
  item.style.top = "120px";

  if (type === "text") {
    item.classList.add("design-text");
    item.textContent = content;
    item.style.color = textColor.value;
    item.style.fontFamily = fontSelect.value;
    item.style.fontSize = "24px";
  } else {
    item.style.width = "90px";
    item.style.height = "90px";

    const img = document.createElement("img");
    img.src = content;
    item.appendChild(img);
  }

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-item";
  deleteBtn.innerHTML = "×";

  deleteBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    item.remove();
  });

  item.appendChild(deleteBtn);

  item.addEventListener("mousedown", function () {
    selectItem(item);
  });

  makeEditable(item);
  designArea.appendChild(item);
  selectItem(item);
}

function makeEditable(item) {
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  item.addEventListener("mousedown", function (event) {
    if (event.target.classList.contains("delete-item")) return;

    isDragging = true;
    offsetX = event.clientX - item.offsetLeft;
    offsetY = event.clientY - item.offsetTop;
  });

  document.addEventListener("mousemove", function (event) {
    if (!isDragging) return;

    item.style.left = event.clientX - offsetX + "px";
    item.style.top = event.clientY - offsetY + "px";
  });

  document.addEventListener("mouseup", function () {
    isDragging = false;
  });

  item.addEventListener("wheel", function (event) {
    event.preventDefault();

    if (item.classList.contains("design-text")) {
      const currentSize = parseInt(window.getComputedStyle(item).fontSize);
      const change = event.deltaY < 0 ? 2 : -2;
      const newSize = Math.max(10, Math.min(currentSize + change, 70));
      item.style.fontSize = newSize + "px";
      return;
    }

    const currentWidth = item.offsetWidth;
    const change = event.deltaY < 0 ? 10 : -10;
    const newWidth = Math.max(25, Math.min(currentWidth + change, 260));

    item.style.width = newWidth + "px";
    item.style.height = newWidth + "px";
  });
}

function getDesignData() {
  const items = [];

  document.querySelectorAll(".design-item").forEach((item) => {
    const img = item.querySelector("img");

    items.push({
      type: item.dataset.type,
      content: item.dataset.type === "text" ? item.childNodes[0].textContent : img.src,
      left: item.style.left,
      top: item.style.top,
      width: item.style.width,
      height: item.style.height,
      color: item.style.color,
      fontFamily: item.style.fontFamily,
      fontSize: item.style.fontSize
    });
  });

  return items;
}

function buildDesignObject() {
  const selectedAccessories = [];

  document.querySelectorAll(".accessory:checked").forEach((item) => {
    selectedAccessories.push({
      name: item.value,
      price: Number(item.dataset.price)
    });
  });

  return {
    id: Date.now(),
    deviceModel: deviceModel.options[deviceModel.selectedIndex].text,
    caseType: caseType.options[caseType.selectedIndex].text,
    frame: frameByModel[deviceModel.value],
    layout: layoutByFrame[frameByModel[deviceModel.value]],
    designItems: getDesignData(),
    accessories: selectedAccessories,
    price: updatePrice(),
    quantity: 1
  };
}

function renderSavedPreview(design) {
  savedPreview.innerHTML = "";

  const preview = caseWorkspace.cloneNode(true);
  preview.querySelectorAll(".delete-item").forEach((btn) => btn.remove());
  preview.querySelectorAll(".design-item").forEach((item) => item.classList.remove("active"));

  savedPreview.appendChild(preview);
}

function addDesignToCart(design) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(design);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  window.location.href = "../cart/cart.html";
}

imageUpload.addEventListener("change", function () {
  const file = imageUpload.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (event) {
    createDesignItem("image", event.target.result);
  };

  reader.readAsDataURL(file);
});

addTextBtn.addEventListener("click", function () {
  const text = customText.value.trim();

  if (!text) {
    alert("Bạn cần nhập chữ trước.");
    return;
  }

  createDesignItem("text", text);
  customText.value = "";
});

document.querySelectorAll(".sticker-btn").forEach((button) => {
  button.addEventListener("click", function () {
    selectedSticker = button.dataset.sticker;
    createDesignItem("sticker", selectedSticker);
    updatePrice();
  });
});

document.querySelectorAll(".accessory").forEach((item) => {
  item.addEventListener("change", updatePrice);
});

deviceModel.addEventListener("change", updatePreview);
caseType.addEventListener("change", updatePreview);

textColor.addEventListener("input", function () {
  if (selectedItem && selectedItem.classList.contains("design-text")) {
    selectedItem.style.color = textColor.value;
  }
});

fontSelect.addEventListener("change", function () {
  if (selectedItem && selectedItem.classList.contains("design-text")) {
    selectedItem.style.fontFamily = fontSelect.value;
  }
});

removeBgBtn.addEventListener("click", function () {
  alert("Tách nền thật cần API. Bản demo này nên dùng ảnh PNG nền trong suốt.");
});

saveDesignBtn.addEventListener("click", function () {
  lastSavedDesign = buildDesignObject();
  localStorage.setItem("savedDesign", JSON.stringify(lastSavedDesign));
  renderSavedPreview(lastSavedDesign);
  previewModal.classList.add("show");
});

editAgainBtn.addEventListener("click", function () {
  previewModal.classList.remove("show");
});

confirmCartBtn.addEventListener("click", function () {
  if (!lastSavedDesign) {
    lastSavedDesign = buildDesignObject();
  }

  addDesignToCart(lastSavedDesign);
});

addToCartBtn.addEventListener("click", function () {
  const design = buildDesignObject();
  addDesignToCart(design);
});

document.addEventListener("click", function (event) {
  if (!event.target.closest(".design-item")) {
    document.querySelectorAll(".design-item").forEach((el) => {
      el.classList.remove("active");
    });
    selectedItem = null;
  }
});

updatePreview();
updateCartCount();