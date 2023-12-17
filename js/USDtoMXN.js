// Función para obtener la tasa de cambio de USD a MXN
export const obtenerCambioUSDaMXN = async () => {
    try {
        const respuesta = await fetch('https://api.fastforex.io/fetch-one?to=MXN&api_key=b190a5f9e2-4a28def28b-s5mov2');
        const datos = await respuesta.json();
        return {
            cambio: datos.result.MXN,
        };
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        return null;
    }
};

// Función para dividir la fecha y la hora de una cadena de texto
export const dividirFechaHora = (fechaHora) => {
    const partes = fechaHora.split(' ');
    return {
        fecha: partes[0],
        hora: partes[1]
    };
};