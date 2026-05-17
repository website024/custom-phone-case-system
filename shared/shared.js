/* =========================
   NAVBAR AUTH
========================= */

const navAuth =
  document.querySelector(".nav-auth");

if (navAuth) {

  const isLoggedIn =
    localStorage.getItem(
      "isLoggedIn"
    );

  const savedUser =
    JSON.parse(
      localStorage.getItem(
        "cadeauUser"
      )
    );

  /* IF LOGIN */

  if (
    isLoggedIn === "true" &&
    savedUser
  ) {

    navAuth.innerHTML = `

      <span class="nav-user">
        Hi, ${savedUser.name}
      </span>

      <button class="logout-btn">
        Logout
      </button>

    `;

    /* LOGOUT */

    const logoutBtn =
      document.querySelector(
        ".logout-btn"
      );

    logoutBtn.addEventListener(
      "click",
      function () {

        localStorage.removeItem(
          "isLoggedIn"
        );

        alert("Logout successful");

        window.location.href =
          "../auth/login.html";
      }
    );
  }
}