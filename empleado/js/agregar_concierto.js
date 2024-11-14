import {guardarConcierto} from "./config.js";
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("conciertoForm")

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const artista = document.getElementById("artista").value.trim();
        const descripcion = document.getElementById("descripcion").value.trim();
        const fecha = document.getElementById("fecha").value;
        const lugar = document.getElementById("lugar_concierto").value.trim();
        const localidades = document.getElementById("localidades").value;
        const precio = document.getElementById("precio_boleto").value;
        const imagen = document.getElementById("url_imagen").value.trim();


        let isValid = true;

        // Validar artista (no vacío, solo letras y espacios)
        if (!/^[a-zA-Z\s]+$/.test(artista)) {
            alert("El nombre del artista solo debe contener letras y espacios.");
            isValid = false;
        }

        // Validar descripción (no vacío)
        if (descripcion === "") {
            alert("La descripción no puede estar vacía.");
            isValid = false;
        }

        // Validar fecha (no vacía y fecha futura)
        const fechaActual = new Date();
        const fechaConcierto = new Date(fecha);
        if (fecha === "" || fechaConcierto <= fechaActual) {
            alert("La fecha del concierto debe ser futura.");
            isValid = false;
        }

        // Validar lugar (no vacío, solo letras y espacios)
        if (!/^[a-zA-Z\s]+$/.test(lugar)) {
            alert("El lugar del concierto solo debe contener letras y espacios, sin números.");
            isValid = false;
        }

        // Validar localidades (mayor a 0)
        if (localidades <= 0 || isNaN(localidades)) {
            alert("El número de localidades debe ser mayor a 0.");
            isValid = false;
        }

        // Validar precio (mayor a 0, permite decimales)
        if (isNaN(precio) || parseFloat(precio) <= 0) {
            alert("El precio del boleto debe ser mayor a 0.");
            isValid = false;
        }

        // Validar URL de imagen (no vacía y debe parecer una URL)
        if (!/^https?:\/\/[^\s]+$/.test(imagen)) {
            alert("Por favor, ingresa una URL válida para la imagen.");
            isValid = false;
        }

        // Si todas las validaciones pasan, guardar el concierto
        if (isValid) {
            guardarConcierto(artista, descripcion, fecha, lugar, localidades, precio, imagen);
            form.reset(); 
        }
    });
});
