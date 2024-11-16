import { loginUser } from "./config.js";

if (sessionStorage.getItem("user")) {
    window.location.href = "inicio_empleado.html";
}

document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const userData = await loginUser(email, password);
        // sessionStorage information setting
        sessionStorage.setItem("user", JSON.stringify(userData));
        window.location.href = "inicio_empleado.html";
    } catch (e) {
        alert('Credenciales invalidas de inicio de sesion');
    }

});

