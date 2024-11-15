import { mostrarConciertos } from "../empleado/js/config.js";

document.addEventListener("DOMContentLoaded", () => {
    const contenedorCartas = document.getElementById("eventosContainer");
    const mostrarTarjetasConciertos = async () => {
        try {
            const arregloConcierto = await mostrarConciertos();
            arregloConcierto.forEach(concierto => {
                const conciertoCard = document.createElement("article");
                conciertoCard.innerHTML = `
            <img src="${concierto.urlImagen}" alt=""${concierto.artista}">
            <h3>${concierto.artista} </h3>
            <p>${concierto.descripcion}
            <span>Fecha: ${new Date(concierto.fecha).toLocaleDateString()}</span>
            </p>
            <a href="detallesCompra.html" class="button"> Comprar boleto</a>
            `;

                contenedorCartas.appendChild(conciertoCard);

            });
        }
        catch (error) {
            console.error("No se pueden mostrar los concietos: ", error)
        }
    }

    mostrarTarjetasConciertos();

});
