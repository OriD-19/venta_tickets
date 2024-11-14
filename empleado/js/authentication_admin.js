if (sessionStorage.getItem("user") === null) {
    alert('what');
    window.location.href = "index.html";
}

const user = JSON.parse(sessionStorage.getItem("user"));
if (user.role !== "admin") {
    window.location.href = "inicio_empleado.html";
}
