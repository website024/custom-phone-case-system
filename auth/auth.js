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
        document.querySelector("#register-name").value;

      const email =
        document.querySelector("#register-email").value;

      const password =
        document.querySelector("#register-password").value;

      const confirmPassword =
        document.querySelector("#register-confirm").value;

      /* VALIDATION */

      if (
        !name ||
        !email ||
        !password ||
        !confirmPassword
      ) {

        alert("Please fill all fields");

        return;
      }

      if (password !== confirmPassword) {

        alert("Passwords do not match");

        return;
      }

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

      alert("Register successful");

      window.location.href =
        "login.html";
    }
  );
}

/* =========================
   LOGIN
========================= */

const loginBtn =
  document.querySelector(".login-btn");

if (loginBtn) {

  loginBtn.addEventListener(
    "click",
    function () {

      const email =
        document.querySelector("#login-email").value;

      const password =
        document.querySelector("#login-password").value;

      /* GET USER */

      const savedUser =
        JSON.parse(
          localStorage.getItem(
            "cadeauUser"
          )
        );

      if (!savedUser) {

        alert(
          "No account found"
        );

        return;
      }

      /* CHECK */

      if (
        email === savedUser.email &&
        password === savedUser.password
      ) {

        alert(
          "Login successful"
        );

        /* LOGIN STATUS */

        localStorage.setItem(
          "isLoggedIn",
          "true"
        );

        /* REDIRECT */

        window.location.href =
          "../home/index.html";

      } else {

        alert(
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
  document.querySelector(".admin-btn");

if (adminBtn) {

  adminBtn.addEventListener(
    "click",
    function () {

      const email =
        document.querySelector("#admin-email").value;

      const password =
        document.querySelector("#admin-password").value;

      /* DEMO ADMIN */

      if (
        email === "admin@cadeaucase.com" &&
        password === "admin123"
      ) {

        alert(
          "Admin login successful"
        );

        localStorage.setItem(
          "isAdmin",
          "true"
        );

        window.location.href =
          "../home/index.html";

      } else {

        alert(
          "Invalid admin account"
        );
      }
    }
  );
}