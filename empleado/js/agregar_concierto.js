document.addEventListener("DOMContentLoaded", () => {
    const conciertoForm = document.getElementById("conciertoForm");
    const eventosContainer = document.getElementById("eventosContainer"); // Sección donde agregaremos las tarjetas

    // Almacenar datos al enviar el formulario
    if (conciertoForm) {
        conciertoForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const artista = document.getElementById("artista").value;
            const descripcion = document.getElementById("descripcion").value;
            const fecha = document.getElementById("fecha").value;
            const lugar = document.getElementById("lugar_concierto").value;
            const localidades = document.getElementById("localidades").value;
            const precio = document.getElementById("precio_boleto").value;

            const conciertoData = { artista, descripcion, fecha, lugar, localidades, precio };
            let conciertos = JSON.parse(localStorage.getItem("conciertos")) || [];
            conciertos.push(conciertoData);
            localStorage.setItem("conciertos", JSON.stringify(conciertos));
            alert("Concierto guardado exitosamente.");
            conciertoForm.reset();
        });
    }

    // Cargar conciertos al inicio de la página
    if (eventosContainer) {
        const conciertos = JSON.parse(localStorage.getItem("conciertos")) || [];
        conciertos.forEach(concierto => {
            const conciertoCard = document.createElement("article");
            conciertoCard.innerHTML = `
                    <img src="${concierto.imagen}" alt="${concierto.artista}">
                    <h3>${concierto.artista}</h3>
                    <p>
                        ${concierto.descripcion}
                        <span>Fecha: ${new Date(concierto.fecha).toLocaleDateString()}</span>
                    </p>
                    <a href="detallesCompra.html" class="button">Comprar boleto</a>
            `;
            eventosContainer.appendChild(conciertoCard); // Agregar la tarjeta a la sección
        });
    }
});
