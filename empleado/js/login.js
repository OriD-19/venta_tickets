import { registerUser, loginUser } from "./firebase.js";

document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    alert("Datos capturados: " + email);
    await loginUser(email, password);
});

