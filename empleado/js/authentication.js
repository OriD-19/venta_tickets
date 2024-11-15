if (sessionStorage.getItem("user") === null) {
    window.location.href = "login.html";
}

const user = JSON.parse(sessionStorage.getItem("user"));
if (user.role !== "admin" && user.role !== "authorized") {
    window.location.href = "inicio_empleado.html";
}
