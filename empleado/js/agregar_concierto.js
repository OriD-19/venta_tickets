// conciertoForm.js
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
        const lugar = document.getElementById("lugar_concierto").value.trim();
        const localidades = document.getElementById("localidades").value;
        const precio = document.getElementById("precio_boleto").value;
        const imagen = document.getElementById("url_imagen").value.trim();

        // Validar formulario
        if (validarFormulario(artista, descripcion, fecha, lugar, localidades, precio, imagen)) {
            guardarConcierto(artista, descripcion, fecha, lugar, localidades, precio, imagen);
            form.reset();
        }
    });
});