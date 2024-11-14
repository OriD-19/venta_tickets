import { mostrarConciertos } from "./config.js";

    document.addEventListener("DOMContentLoaded", () => {
        const contenedorCartas = document.getElementById("eventosContainer");

        const mostrarTarjetasConciertos = async () => {
            try {
                const arregloConcierto = await mostrarConciertos(); //SE GUARDAN LOS CONCIERTOS EN UN ARREGLO
                const colores = ["bg-blue", "bg-orange", "bg-red", "bg-green", "bg-purple"];
                let colorIndex = 0;

                arregloConcierto.forEach(concierto => {
                    const conciertoCard = document.createElement("div");
                    conciertoCard.classList.add("col-md-4");

                    // Alternar colores
                    const colorClass = colores[colorIndex % colores.length];
                    colorIndex++;

                    conciertoCard.innerHTML = `
                        <div class="card card-custom ${colorClass}">
                            <div class="card-body">
                                <img src="${concierto.urlImagen}" alt="${concierto.artista}" class="card-img-top img-fluid" style="height: 200px; object-fit: cover;">
                                <h2 class="card-title">${concierto.artista}</h2>
                                <p class="card-text">${concierto.descripcion}</p>
                                <p class="card-text">Lugar: ${concierto.lugar}</p>
                                <p class="card-text">Localidades: ${concierto.localidades}</p>                    
                                <p class="card-text">Fecha: ${new Date(concierto.fecha).toLocaleDateString()}</p>
                                <p class="card-text">Precio: $${concierto.precio}</p>
                                <a href="detallesCompra.html" class="btn btn-light mt-2">Más info</a>
                                <button class="btn btn-danger mt-2 eliminar-btn">Eliminar</button>
                                <button class="btn btn-warning mt-2 editar-btn">Editar</button>
                            </div>
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