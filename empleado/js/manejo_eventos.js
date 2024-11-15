import { mostrarConciertos, eliminarConcierto, modificarConcierto } from "./config.js";

/*Define el modal para mandarlo a llamar*/
const modal = new bootstrap.Modal(document.getElementById("editConciertoModal"), {});

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
                                <button class="btn btn-danger mt-2 eliminar-btn" data-id="${concierto.id}">Eliminar</button>
                                <button class="btn btn-warning mt-2 editar-btn" data-id="${concierto.id}">Editar</button>
                            </div>
                        </div>
                    `;
                    const eliminarBtn = conciertoCard.querySelector(".eliminar-btn");
                    eliminarBtn.addEventListener("click", async () => {
                        const confirmación = confirm("¿Quieres eliminar el concierto?");
                        if (confirmación) {
                            await eliminarConcierto(concierto.id);
                            window.location.reload();
                        }
                    })

                    const modificarBtn = conciertoCard.querySelector(".editar-btn")
                    modificarBtn.addEventListener("click", async () => {
                        //para mostrar en el modal los datos actuales del concierto
                        document.getElementById("editArtista").value = concierto.artista;
                        document.getElementById("editDescripcion").value = concierto.descripcion;
                        document.getElementById("editFecha").value = concierto.fecha;
                        document.getElementById("editLugar").value = concierto.lugar;
                        document.getElementById("editLocalidades").value = concierto.localidades;
                        document.getElementById("editPrecio").value = concierto.precio;
                        document.getElementById("editUrlImagen").value = concierto.urlImagen;
                        modal.show();

                        const guardarEdit = document.getElementById("saveChangesBtn");
                        guardarEdit.onclick = async () => {
                            const artista = document.getElementById("editArtista").value.trim();
                            const descripcion = document.getElementById("editDescripcion").value.trim();
                            const fecha = document.getElementById("editFecha").value;
                            const lugar = document.getElementById("editLugar").value.trim();
                            const localidades = document.getElementById("editLocalidades").value;
                            const precio = document.getElementById("editPrecio").value;
                            const imagen = document.getElementById("editUrlImagen").value.trim();
                            await modificarConcierto(concierto.id, artista, descripcion, fecha, lugar, localidades, precio, imagen);
                            modal.hide();
                        }
                    })

                    contenedorCartas.appendChild(conciertoCard);
                });
            }
            catch (error) {
                console.log(error);
            }
        }

        mostrarTarjetasConciertos();
    });