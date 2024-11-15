import { mostrarConciertos } from '../empleado/js/config.js';

// Función para filtrar los conciertos con base en el lugar y la fecha del concierto

export const buscarConciertos = async (lugar, fechaInicial, fechaFinal) => {
    try {
        // buscar conciertos entre fechaInicial y fechaFinal
        const conciertos = await mostrarConciertos();
        const conciertosFiltrados = conciertos.filter(concierto => {
            console.log(concierto);
            const fechaConcierto = new Date(concierto.fecha);
            console.log("Fechas:", fechaConcierto, fechaInicial, fechaFinal);
            console.log("lugar check:", concierto.lugar === lugar);
            console.log("fecha inicio check:", fechaConcierto >= fechaInicial);
            console.log("fecha final check:", fechaConcierto <= fechaFinal);

            return (concierto.lugar === lugar && fechaConcierto >= fechaInicial && fechaConcierto <= fechaFinal);
        });
        return conciertosFiltrados;
    } catch (error) {
        console.log(error);
    }
}

document.getElementById('buscarConciertos').addEventListener('submit', async (e) => {
    e.preventDefault();

    const lugar = document.getElementById('lugar_evento').value;
    const fechaInicial = new Date(document.getElementById('fechaDesde').value);
    const fechaFinal = new Date(document.getElementById('fechaHasta').value);

    const conciertos = await buscarConciertos(lugar, fechaInicial, fechaFinal);
    console.log(conciertos);

    const conciertosDiv = document.querySelector('.card_container');
    conciertosDiv.innerHTML = '';

/*
 * modelo de una tarjeta
 *                     <div class="card">
                        <div class="image">
                        </div>

                        <div class="card_content">
                            <h4>Ximena Sariñana</h4>
                            <p>Lugar: Estadio Cuscatlán</p>
                            <p>Hora: 7:00 PM</p>
                            <p>Fecha: 18 de octubre</p>
                            <a href="detallesCompra.html">
                                Comprar
                            </a>
                        </div>
                    </div>

*/

    conciertos.forEach(concierto => {
        const card = document.createElement('div');
        card.classList.add('card');

        const image = document.createElement('div');
        image.classList.add('image');
        image.style.backgroundImage = `url(${concierto.urlImagen})`;
        card.appendChild(image);

        const cardContent = document.createElement('div');
        cardContent.classList.add('card_content');
        card.appendChild(cardContent);

        const h4 = document.createElement('h4');
        h4.textContent = concierto.artista;
        cardContent.appendChild(h4);

        const p1 = document.createElement('p');
        p1.textContent = `Lugar: ${concierto.lugar}`;
        cardContent.appendChild(p1);

        // meses en minuscula
        const arregloMeses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
            'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
        const fecha = new Date(concierto.fecha);
        const arregloDias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

        const p3 = document.createElement('p');
        p3.textContent = `Fecha: ${arregloDias[fecha.getDay()]}, ${fecha.getDate()+1} de ${arregloMeses[fecha.getMonth()]} ${fecha.getFullYear()}`;
        cardContent.appendChild(p3);

        const a = document.createElement('a');
        a.id = concierto.id;
        a.addEventListener("click", (e) => {
            e.preventDefault();
            const params = new URLSearchParams();
            params.append("id", concierto.id);
            window.location.href = `detallesCompra.html?${params.toString()}`;
        });
        a.textContent = 'Comprar';
        cardContent.appendChild(a);

        conciertosDiv.appendChild(card);
    });


});

async function mostrarConciertosInicio() {
    const conciertos = await mostrarConciertos();
    const conciertosDiv = document.querySelector('.card_container');
    conciertosDiv.innerHTML = '';

    conciertos.forEach(concierto => {
        const card = document.createElement('div');
        card.classList.add('card');

        const image = document.createElement('div');
        image.classList.add('image');
        image.style.backgroundImage = `url(${concierto.urlImagen})`;
        card.appendChild(image);

        const cardContent = document.createElement('div');
        cardContent.classList.add('card_content');
        card.appendChild(cardContent);

        const h4 = document.createElement('h4');
        h4.textContent = concierto.artista;
        cardContent.appendChild(h4);

        const p1 = document.createElement('p');
        p1.textContent = `Lugar: ${concierto.lugar}`;
        cardContent.appendChild(p1);

        // meses en minuscula
        const arregloMeses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
            'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
        const fecha = new Date(concierto.fecha);
        const arregloDias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

        const p3 = document.createElement('p');
        p3.textContent = `Fecha: ${arregloDias[fecha.getDay()]}, ${fecha.getDate()+1} de ${arregloMeses[fecha.getMonth()]} de ${fecha.getFullYear()}`;
        cardContent.appendChild(p3);

        const a = document.createElement('a');
        a.id = concierto.id;
        a.addEventListener("click", (e) => {
            e.preventDefault();
            const params = new URLSearchParams();
            params.append("id", concierto.id);
            window.location.href = `detallesCompra.html?${params.toString()}`;
        });
        a.textContent = 'Comprar';
        cardContent.appendChild(a);

        conciertosDiv.appendChild(card);
    });   
}

mostrarConciertosInicio();
