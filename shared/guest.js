const isLoggedIn =
  localStorage.getItem(
    "isLoggedIn"
  );

const isAdmin =
  localStorage.getItem(
    "isAdmin"
  );

if (
  isLoggedIn === "true" ||
  isAdmin === "true"
) {

  window.location.href =
    "../home/index.html";
}