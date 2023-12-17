// Función para obtener el historial de precios de una moneda específica
export const getCoinHistory = async (coinID) => {
    try {
        const resp = await fetch(`https://api.coincap.io/v2/assets/${coinID}/history?interval=d1`);
        const data = await resp.json();
        return data.data.map(entry => ({
            priceUsd: parseFloat(entry.priceUsd).toFixed(2),
            date: entry.date.substring(0, 10)
        }));
    } catch (error) {
        console.error("Error al obtener el historial del coin", error);
    }
};

// Función para obtener y mostrar todos los coins
export const getAllCoins = async () => {
    try {
        const response = await fetch('https://api.coincap.io/v2/assets');
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error al obtener los datos de la API", error);
        return [];
    }
};

// Función para dibujar la gráfica de precios de una moneda
export const graficaByCoin = (data, coinName, canvasId) => {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map(entry => entry.date),
            datasets: [{
                label: `Precio de ${coinName} (USD)`,
                data: data.map(entry => entry.priceUsd),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
};
