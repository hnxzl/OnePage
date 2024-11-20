const togglePasswordVisibility = (inputId, toggleButtonId) => {
  const passwordField = document.getElementById(inputId);
  const toggleButton = document.getElementById(toggleButtonId);

  toggleButton?.addEventListener("click", () => {
    const isPasswordVisible = passwordField.type === "text";
    passwordField.type = isPasswordVisible ? "password" : "text";
    toggleButton.textContent = isPasswordVisible ? "Show" : "Hide";
  });
};

const validateLoginForm = () => {
  const loginForm = document.getElementById("loginForm");

  loginForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      alert("Email and password are required.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      sessionStorage.setItem("isLoggedIn", true);
      sessionStorage.setItem("username", user.name);
      alert(`Welcome, ${user.name}!`);
      window.location.href = "dashboard.html";
    } else {
      alert("Invalid email or password.");
    }
  });
};

const validateRegisterForm = () => {
  const registerForm = document.getElementById("registerForm");

  registerForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document
      .getElementById("confirmPassword")
      .value.trim();

    if (!name || !email || !password || !confirmPassword) {
      alert("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const isEmailUsed = users.some((user) => user.email === email);

    if (isEmailUsed) {
      alert("Email is already registered. Please use a different email.");
      return;
    }

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful! Please login.");
    window.location.href = "login.html";
  });
};

const init = () => {
  togglePasswordVisibility("password", "togglePassword");
  togglePasswordVisibility("confirmPassword", "toggleConfirmPassword");
  validateLoginForm();
  validateRegisterForm();
  handleLogout();
};

document.addEventListener("DOMContentLoaded", init);
