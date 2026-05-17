function showToast(message) {

  const toast =
    document.createElement("div");

  toast.classList.add(
    "toast"
  );

  toast.textContent =
    message;

  document.body.appendChild(
    toast
  );

  setTimeout(function () {

    toast.classList.add(
      "show"
    );

  }, 100);

  setTimeout(function () {

    toast.classList.remove(
      "show"
    );

    setTimeout(function () {

      toast.remove();

    }, 300);

  }, 2500);
}