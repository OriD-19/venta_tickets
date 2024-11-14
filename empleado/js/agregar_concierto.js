import { guardarConcierto} from "./config.js";
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("conciertoForm")

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const artista = document.getElementById("artista").value;
        const descripcion = document.getElementById("descripcion").value;
        const fecha = document.getElementById("fecha").value;
        const lugar = document.getElementById("lugar_concierto").value;
        const localidades = document.getElementById("localidades").value;
        const precio = document.getElementById("precio_boleto").value;
        const imagen = document.getElementById("url_imagen").value;
        guardarConcierto(artista, descripcion, fecha, lugar, localidades, precio, imagen);
        form.reset();
    });
});
