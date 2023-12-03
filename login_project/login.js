// Wybieramy elementy do interkakcji po ID
const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

// Nasłuchjemy na zdarznie "click" na przycisku logowania
loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    // Sprawdzamy, czy nazwa użytkownika i hasło są poprawne
    if (username === "user" && password === "12345!Q") {
        alert("You have successfully logged in.");
        location.reload();
    } else {
        loginErrorMsg.style.opacity = 1;
    }
})
