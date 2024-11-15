if (sessionStorage.getItem("user") === null) {
    alert("No has iniciado sesión");
    window.location.href = "login.html";
}

const user = JSON.parse(sessionStorage.getItem("user"));
if (user.role !== "admin") {
    alert("No tienes permisos para acceder a esta página");
    window.location.href = "inicio_empleado.html";
}
