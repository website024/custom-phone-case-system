/* IMAGE PREVIEW */

const imageInput =
  document.querySelector(
    "#imageInput"
  );

const previewImage =
  document.querySelector(
    "#previewImage"
  );

imageInput.addEventListener(
  "change",
  function () {

    const file =
      this.files[0];

    if (file) {

      const reader =
        new FileReader();

      reader.onload =
        function (e) {

          previewImage.src =
            e.target.result;
        };

      reader.readAsDataURL(file);
    }
  }
);

/* CUSTOM TEXT */

const customText =
  document.querySelector(
    "#customText"
  );

const previewText =
  document.querySelector(
    "#previewText"
  );

customText.addEventListener(
  "input",
  function () {

    previewText.textContent =
      this.value;
  }
);

/* COLOR PICKER */

const colorPicker =
  document.querySelector(
    "#caseColorPicker"
  );

const phoneCase =
  document.querySelector(
    "#phoneCase"
  );

colorPicker.addEventListener(
  "input",
  function () {

    phoneCase.style.background =
      this.value;
  }
);

/* DRAG IMAGE */

let isDragging = false;

let offsetX = 0;
let offsetY = 0;

previewImage.addEventListener(
  "mousedown",
  function (e) {

    isDragging = true;

    offsetX =
      e.clientX - previewImage.offsetLeft;

    offsetY =
      e.clientY - previewImage.offsetTop;

    previewImage.style.position =
      "absolute";

    previewImage.style.cursor =
      "grabbing";
  }
);

document.addEventListener(
  "mousemove",
  function (e) {

    if (!isDragging) return;

    previewImage.style.left =
      e.clientX - offsetX + "px";

    previewImage.style.top =
      e.clientY - offsetY + "px";
  }
);

document.addEventListener(
  "mouseup",
  function () {

    isDragging = false;

    previewImage.style.cursor =
      "grab";
  }
);