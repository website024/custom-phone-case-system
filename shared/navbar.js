const navLinks =
  document.querySelector(
    ".nav-links"
  );

/* USER */

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

/* ADMIN */

const isAdmin =
  localStorage.getItem(
    "isAdmin"
  );

/* =========================
   USER LOGIN
========================= */

if (
  isLoggedIn === "true" &&
  savedUser
) {

  navLinks.innerHTML = `

    <a href="../home/index.html">
      Home
    </a>

    <a href="../customize/customize.html">
      Customize
    </a>

    <span class="nav-user">
      Hi, ${savedUser.name}
    </span>

    <button class="logout-btn">
      Sign out
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

      showToast(
        "Logged out"
      );

      setTimeout(function () {

        window.location.href =
          "../home/index.html";

      }, 1500);
    }
  );
}

/* =========================
   ADMIN LOGIN
========================= */

if (isAdmin === "true") {

  navLinks.innerHTML = `

    <a href="../home/index.html">
      Home
    </a>

    <a href="../customize/customize.html">
      Customize
    </a>

    <span class="nav-user">
      Admin
    </span>

    <button class="logout-btn">
      Sign out
    </button>

  `;

  /* ADMIN LOGOUT */

  const logoutBtn =
    document.querySelector(
      ".logout-btn"
    );

  logoutBtn.addEventListener(
    "click",
    function () {

      localStorage.removeItem(
        "isAdmin"
      );

      showToast(
        "Admin logged out"
      );

      setTimeout(function () {

        window.location.href =
          "../home/index.html";

      }, 1500);
    }
  );
}