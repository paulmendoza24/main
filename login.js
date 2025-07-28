document.getElementById("loginForm").addEventListener("submit", function(e) {
      e.preventDefault();
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();

      if (username === "admin" && password === "falconwizard") {
        sessionStorage.setItem("loggedIn", "true");
        window.location.href = "downloads.html";
      } else {
        alert("Invalid username or password.");
      }
    });