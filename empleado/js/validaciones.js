// validaciones.js
export function validarFormulario(artista, descripcion, fecha, lugar, localidades, precio, imagen) {
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

    return isValid;
}
