import { mostrarConciertos } from "./config.js";

document.addEventListener("DOMContentLoaded", () => {
    const contenedorCartas = document.getElementById("eventosContainer");

    const mostrarTarjetasConciertos = async () => {
        try {
            const arregloConcierto = await mostrarConciertos(); //SE GUARDAN LOS CONCIERTOS EN UN ARREGLO

            arregloConcierto.forEach(concierto => {
                const conciertoCard = document.createElement("div");
                conciertoCard.classList.add("card", "mb-3", "col-md-4");

                conciertoCard.innerHTML = `
                <div class="card-body">
                    <img src="${concierto.urlImagen}" alt="${concierto.artista}" class="card-img-top img-fluid" style="height: 200px; object-fit: cover;">
                    <h2 class="card-title">${concierto.artista}</h2>
                    <p class="card-text">${concierto.descripcion}</p>
                    <p class="card-text">Lugar: ${concierto.lugar}</p>
                    <p class="card-text">Localidades: ${concierto.localidades}</p>                    
                    <p class="card-text">Fecha: ${new Date(concierto.fecha).toLocaleDateString()}</p>
                    <p class="card-text">Precio: $ ${concierto.precio}</p>
                </div>
            `;
                contenedorCartas.appendChild(conciertoCard);

            });
        }
        catch (error) {
            alert("No se pueden mostrar los conciertos: ", error);
        }
    }

    mostrarTarjetasConciertos();
});
