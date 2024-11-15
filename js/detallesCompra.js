import { getConcierto, comprarBoletos } from "../empleado/js/config.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (id === "") {
    alert("Selecciona un concierto para ver su informacion de compra");
    window.location.href = "destacados.html";
}

const errores = {
    errorNombre: "",
    errorDui: "",
    errorCorreo: "",
    errorExpiracion: "",
    errorCvv: "",
    errorTarjeta: "",
    errorCantidad: "",
}

async function renderConcierto() {
    const concierto = await getConcierto(id);
    console.log(concierto);

    document.querySelector(".encabezado").style.backgroundImage = `linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url("${concierto.urlImagen}")`
    document.querySelector(".encabezado h1").appendChild(document.createTextNode(concierto.artista));

    // poblar las opciones de ubicacion en el select

    document.querySelector("#total").innerText = "Total: $" + (concierto.localidades[0].precio);

    const select = document.querySelector("#ubicacion");
    concierto.localidades.forEach(ubicacion => {
        const option = document.createElement("option");

        option.value = ubicacion.precio;
        option.appendChild(document.createTextNode(ubicacion.tipoBoleto + " $" + ubicacion.precio + " | Disponibles: " + ubicacion.disponibles));

        select.appendChild(option);
    });

    const validaciones = [validarNombre, validarDui, validarCorreo, validarTarjetaDeCredito, validarFechaExpiracion, validarCvv];

    const verificarNumerico = (ee) => {
        return String.fromCharCode(ee.keyCode).match(/[0-9]/) !== null;
    };

    // calculo inicial del total
    const precioInicial = select.value;
    const cantidadInicial = document.querySelector("#cantidad").value;
    const paqueteInicial = document.querySelector("#paquete").value;
    document.querySelector("#total").innerText = "Total: $" + (parseInt(paqueteInicial) + precioInicial * cantidadInicial);


    select.addEventListener('change', (e) => {
        const precio = e.target.value;
        const cantidad = document.querySelector("#cantidad").value;
        const paquete = document.querySelector("#paquete").value;
        document.querySelector("#total").innerText = "Total: $" + (parseInt(paquete) + precio * cantidad);
    });

    document.querySelector("#cantidad").addEventListener('change', (e) => {
        const precio = select.value;
        const cantidad = e.target.value;
        const paquete = document.querySelector("#paquete").value;
        document.querySelector("#total").innerText = "Total: $" + (parseInt(paquete) + precio * cantidad);
    });

    // tambien cambia cuando se selecciona un paquete diferente
    document.querySelector("#paquete").addEventListener('change', (e) => {
        const precio = select.value;
        const cantidad = document.querySelector("#cantidad").value;
        const paquete = e.target.value;
        document.querySelector("#total").innerText = "Total: $" + (parseInt(paquete) + precio * cantidad);
    });


    // validar y enviar la compra
    function ayudaDui(e) {
        const currDuiLength = document.getElementById('dui').value.length;

        if (e.key === 'Backspace') {
            // quitar el guion si el usuario borra un caracter
            if (currDuiLength === 10) {
                document.getElementById('dui').value = document.getElementById('dui').value.slice(0, currDuiLength - 2);
            } else {
                return;
            }
        }

        if (currDuiLength === 10 || !verificarNumerico(e)) {
            // el input no permite introducir mas de 10 caracteres (contando el guion)
            e.preventDefault();
            return;
        }

        // agregar un guion cuando el usuario haya ingresado 8 caracteres

        if (currDuiLength === 8) {
            document.getElementById('dui').value += '-';
        }
    }
    document.getElementById('dui').addEventListener('keydown', ayudaDui);

    function ayudaTarjeta(e) {
        const currTarjetaLength = document.getElementById('num_tarjeta').value.length;

        if (e.key === 'Backspace') {
            // quitar el guion si el usuario borra un caracter
            if (currTarjetaLength === 5 || currTarjetaLength === 10 || currTarjetaLength === 15) {
                document.getElementById('num_tarjeta').value = document.getElementById('num_tarjeta').value.slice(0, currTarjetaLength - 2);
            } else {
                return;
            }
        }

        if (currTarjetaLength >= 19 || !verificarNumerico(e)) {
            // el input no permite introducir mas de 10 caracteres (contando el guion)
            e.preventDefault();
            return;
        }

        // agregar un guion cuando el usuario haya ingresado 8 caracteres

        if (currTarjetaLength === 4 || currTarjetaLength === 9 || currTarjetaLength === 14 || currTarjetaLength === 19) {
            document.getElementById('num_tarjeta').value += ' ';
        }
    }
    document.getElementById('num_tarjeta').addEventListener('keydown', ayudaTarjeta);

    function ayudaExpiracion(e) {
        const currNacimientoLength = document.getElementById('fecha_exp').value.length;

        if (e.key === 'Backspace') {
            // quitar las barras si el usuario borra caracteres
            // Solamente se aceptan meses y años (con dos números cada uno)

            if (currNacimientoLength === 3) {
                document.getElementById('fecha_exp').value = document.getElementById('fecha_exp').value.slice(0, currNacimientoLength - 2);
            } else {
                return;
            }
        }

        if (currNacimientoLength === 5 || !verificarNumerico(e)) {
            // el input no permite introducir mas de 10 caracteres (contando las barras)
            e.preventDefault();
            return;
        }


        // agregar una barra cuando el usuario haya ingresado 2 o 5 caracteres

        if (currNacimientoLength === 2) {
            document.getElementById('fecha_exp').value += '/';
        }
    }
    document.getElementById('fecha_exp').addEventListener('keydown', ayudaExpiracion);

    function ayudaCvv(e) {
        const currCvvLength = document.getElementById('cvv').value.length;

        if (e.key === 'Backspace') {
            // quitar las barras si el usuario borra caracteres
            // Solamente se aceptan meses y años (con dos números cada uno)
            document.getElementById('cvv').value = document.getElementById('cvv').value.slice(0, currCvvLength);
            return;
        }


        if (currCvvLength === 3 || !verificarNumerico(e)) {
            // el input no permite introducir mas de 10 caracteres (contando las barras)
            e.preventDefault();
            return;
        }

    }
    document.getElementById('cvv').addEventListener('keydown', ayudaCvv);

    function validarNombre() {
        const fmt = /^[A-Za-z]{2,}$/
        const nombre = document.getElementById('nombre').value;

        if (!fmt.test(nombre)) {
            errores.errorNombre = "Ingresa un nombre válido";
            return false;
        }

        return true
    }

    function validarDui() {
        const fmt = /\d{8}-\d/
        const dui = document.getElementById('dui').value;

        if (!fmt.test(dui)) {
            errores.errorDui = "Ingresa un DUI válido";
            return false;
        }

        return true;
    }

    function validarCorreo() {
        const fmt = /\w+@\w+\.\w+/
        const correo = document.getElementById('correo').value;

        if (!fmt.test(correo)) {
            errores.errorCorreo = "Ingresa un correo válido";
            return false;
        }

        return true;
    }

    function validarTarjetaDeCredito() {
        const fmt = /\d{4} \d{4} \d{4} \d{4}/
        const tarjeta = document.getElementById('num_tarjeta').value;

        if (!fmt.test(tarjeta)) {
            errores.errorTarjeta = "Ingresa un número de tarjeta válido";
            return false;
        }

        return true;
    }

    function validarFechaExpiracion() {
        const fmt = /\d{2}\/\d{2}/
        const fecha = document.getElementById('fecha_exp').value;

        if (!fmt.test(fecha)) {
            errores.errorExpiracion = "Ingresa una fecha de expiración válida";
            return false;
        }

        // validar que la tarjeta no este vencida
        const [mes, anio] = fecha.split('/');
        const fechaActual = new Date();
        const anioActual = fechaActual.getFullYear().toString().slice(2);
        const mesActual = fechaActual.getMonth() + 1;

        if (parseInt(anio) < parseInt(anioActual) || (parseInt(anio) === parseInt(anioActual) && parseInt(mes) < mesActual)) {
            return false;
        }

        return true;
    }

    function validarCvv() {
        const fmt = /\d{3}/
        const cvv = document.getElementById('cvv').value;

        if (!fmt.test(cvv)) {
            errores.errorCvv = "Ingresa un CVV válido";
            return false;
        }

        return true;
    }

    document.querySelector("#finalizarCompra").addEventListener('click', async (e) => {

        e.preventDefault();
        const ubicacion = concierto.localidades.filter(localidad => localidad.precio === parseInt(select.value))[0].tipoBoleto;
        console.log(ubicacion);
        const cantidad = document.querySelector("#cantidad").value;

        // resetear los mensajes de error
        Object.keys(errores).forEach(key => {
            errores[key] = "";
        });

        let valido = true;

        if (cantidad === "" || cantidad <= 0) {
            errores.errorCantidad = "Ingresa una cantidad válida";
            valido = false;
        }


        // al tener un arreglo de validaciones, es más fácil añadir y tener un solo registro de qué validaciones se realizan
        validaciones.forEach(validacion => {
            // operador and (&&), en caso de que alguna validacion falle, se considera un fomulario incompleto
            valido = validacion() && valido;
        });

        if (!valido) {
            e.preventDefault();
        }

        // mostrar mensajes de error en el navegador
        Object.keys(errores).forEach(key => {
            const error = errores[key];
            if (error) {
                document.querySelector(`#${key}`).innerText = error;
            } else {
                // tambien para reiniciar los mensajes de error en la interfaz
                document.querySelector(`#${key}`).innerText = "";
            }
        });

        if (valido) {
            await comprarBoletos(id, ubicacion, cantidad);
            // TODO: redirigir a la página de confirmación de compra
        }
    });
}

renderConcierto();
