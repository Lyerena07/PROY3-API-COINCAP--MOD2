// Definición de la función obtenerCambioUSDaMXN
const obtenerCambioUSDaMXN = async () => {
    try {
        const respuesta = await fetch('https://api.fastforex.io/fetch-one?to=MXN&api_key=b190a5f9e2-4a28def28b-s5mov2');
        const datos = await respuesta.json();
        return {
            cambio: datos.result.MXN,
            actualizado: datos.updated
        };
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
    }
};

const dividirFechaHora = (fechaHora) => {
    const partes = fechaHora.split(' ');
    return {
        fecha: partes[0],
        hora: partes[1]
    };
};


// Función para mostrar los datos en el HTML
const mostrarCambioUSDaMXN = async () => {
    const resultado = await obtenerCambioUSDaMXN();
    if (resultado) {
        const { fecha, hora } = dividirFechaHora(resultado.actualizado);
        document.getElementById('precioDolar').innerText = resultado.cambio + " MXN";
    } else {
        document.getElementById('precioDolar').innerText = 'No se pudo obtener el precio del dólar';
    }
}; 

// Llamada a la función para actualizar los datos en la página
mostrarCambioUSDaMXN();
