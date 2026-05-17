/* =========================
   REGISTER
========================= */

const registerBtn =
  document.querySelector(".register-btn");

if (registerBtn) {

  registerBtn.addEventListener(
    "click",
    function () {

      const name =
        document.querySelector(
          "#register-name"
        ).value;

      const email =
        document.querySelector(
          "#register-email"
        ).value;

      const password =
        document.querySelector(
          "#register-password"
        ).value;

      const confirmPassword =
        document.querySelector(
          "#register-confirm"
        ).value;

      /* VALIDATION */

      if (
        !name ||
        !email ||
        !password ||
        !confirmPassword
      ) {

        showToast(
          "Please fill all fields"
        );

        return;
      }

      if (
        password !== confirmPassword
      ) {

        showToast(
          "Passwords do not match"
        );

        return;
      }

      /* LOADING */

      registerBtn.innerHTML =
        "Loading...";

      registerBtn.disabled = true;

      /* USER OBJECT */

      const user = {

        name: name,

        email: email,

        password: password
      };

      /* SAVE */

      localStorage.setItem(
        "cadeauUser",
        JSON.stringify(user)
      );

      /* TOAST */

      showToast(
        "Register successful"
      );

      /* REDIRECT */

      setTimeout(function () {

        window.location.href =
          "login.html";

      }, 1500);
    }
  );
}

/* =========================
   LOGIN
========================= */

const loginBtn =
  document.querySelector(
    ".login-btn"
  );

if (loginBtn) {

  loginBtn.addEventListener(
    "click",
    function () {

      const email =
        document.querySelector(
          "#login-email"
        ).value;

      const password =
        document.querySelector(
          "#login-password"
        ).value;

      /* GET USER */

      const savedUser =
        JSON.parse(
          localStorage.getItem(
            "cadeauUser"
          )
        );

      if (!savedUser) {

        showToast(
          "No account found"
        );

        return;
      }

      /* CHECK */

      if (
        email === savedUser.email &&
        password === savedUser.password
      ) {

        /* LOADING */

        loginBtn.innerHTML =
          "Loading...";

        loginBtn.disabled = true;

        /* LOGIN STATUS */

        localStorage.setItem(
          "isLoggedIn",
          "true"
        );

        /* TOAST */

        showToast(
          "Login successful"
        );

        /* REDIRECT */

        setTimeout(function () {

          window.location.href =
            "../home/index.html";

        }, 1500);

      } else {

        showToast(
          "Invalid email or password"
        );
      }
    }
  );
}

/* =========================
   ADMIN LOGIN
========================= */

const adminBtn =
  document.querySelector(
    ".admin-btn"
  );

if (adminBtn) {

  adminBtn.addEventListener(
    "click",
    function () {

      const email =
        document.querySelector(
          "#admin-email"
        ).value;

      const password =
        document.querySelector(
          "#admin-password"
        ).value;

      /* ADMIN CHECK */

      if (
        email ===
          "admin@cadeaucase.com" &&
        password === "admin123"
      ) {

        /* LOADING */

        adminBtn.innerHTML =
          "Loading...";

        adminBtn.disabled = true;

        /* ADMIN STATUS */

        localStorage.setItem(
          "isAdmin",
          "true"
        );

        /* TOAST */

        showToast(
          "Admin login successful"
        );

        /* REDIRECT */

        setTimeout(function () {

          window.location.href =
            "../home/index.html";

        }, 1500);

      } else {

        showToast(
          "Invalid admin account"
        );
      }
    }
  );
}