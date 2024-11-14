if (sessionStorage.getItem("user") === null) {
    window.location.href = "index.html";
}

if (user.role !== "admin" || user.role !== "authorized") {
    window.location.href = "inicio_empleado.html";
}
