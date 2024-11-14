import { registerUser, loginUser } from "./config.js";

//registerUser("fernandocastillo.8@hotmail.com", "123456", "Fernando", "Fuentes", "admin");

document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    alert("Datos capturados: " + email);
    await loginUser(email, password);
});

