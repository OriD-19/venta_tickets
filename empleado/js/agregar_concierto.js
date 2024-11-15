import { guardarConcierto } from "./config.js";
import { validarFormulario } from "./validaciones.js";
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("conciertoForm");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Obtener valores de los campos
        const artista = document.getElementById("artista").value.trim();
        const descripcion = document.getElementById("descripcion").value.trim();
        const fecha = document.getElementById("fecha").value;
        const lugar = document.getElementById("lugar_evento").value;
        const precioPlatinum = parseFloat(document.getElementById("precio_platinum").value);
        const precioGeneral = parseFloat(document.getElementById("precio_general").value);
        const precioVIP = parseFloat(document.getElementById("precio_vip").value);
        const imagen = document.getElementById("url_imagen").value.trim();

        const fechaActual = new Date();
        const fechaConcierto = new Date(fecha);

        if (fecha === "" || fechaConcierto <= fechaActual) {
            alert("La fecha del concierto debe ser mayor a la actual.");
            isValid = false;
        }

        // Validar formulario
        if (artista && descripcion && fecha && lugar && !isNaN(precioPlatinum) && !isNaN(precioGeneral) && !isNaN(precioVIP) && imagen) {
            guardarConcierto(artista, descripcion, fecha, lugar, precioPlatinum, precioVIP, precioGeneral, imagen);
            form.reset();
        } else {
            alert("Por favor, complete todos los campos correctamente.");
        }
    });
});
