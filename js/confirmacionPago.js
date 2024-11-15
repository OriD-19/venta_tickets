const infoPago = sessionStorage.getItem('infoPago');

if (!infoPago) {
    window.location.href = 'index.html';
}

if (infoPago) {
    const infoPagoObj = JSON.parse(infoPago);
    sessionStorage.removeItem('infoPago');

    // poner todos los valores en la tabla de confirmacion
    console.log(infoPagoObj)
    document.getElementById('usuario-nombre').innerHTML = infoPagoObj.nombre
    document.getElementById('usuario-correo').innerHTML = infoPagoObj.correo
    document.getElementById('producto-nombre').innerHTML = infoPagoObj.boletoSeleccionado
    document.getElementById('producto-paquete').innerHTML = infoPagoObj.paquete;
    document.getElementById('producto-cantidad').innerHTML = infoPagoObj.cantidad;
    document.getElementById('producto-precio').innerHTML = infoPagoObj.precioUnitario;
    document.getElementById('producto-total').innerHTML = infoPagoObj.total;
} 
