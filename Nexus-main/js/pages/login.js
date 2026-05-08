import { AuthService } from "../services/AuthService.js";

document.addEventListener("DOMContentLoaded", () => {
  if (AuthService.isAuthenticated()) {
    window.location.href = "home.html";
  }

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      try {
        await AuthService.login(email, password);
        window.location.href = "index.html";
      } catch (error) {
        alert(error.message);
      }
    });
  }
});
