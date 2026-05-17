const isLoggedIn =
  localStorage.getItem(
    "isLoggedIn"
  );

const isAdmin =
  localStorage.getItem(
    "isAdmin"
  );

/* CHECK */

if (
  isLoggedIn !== "true" &&
  isAdmin !== "true"
) {

  showToast(
    "Please login first"
  );

  setTimeout(function () {

    window.location.href =
      "../auth/login.html";

  }, 1200);
}