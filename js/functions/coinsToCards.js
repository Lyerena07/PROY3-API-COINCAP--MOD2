// Función para obtener el historial de precios de una moneda específica
const getCoinHistory = async (coinID) => {
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
}

// Función para mostrar la gráfica cuando se hace clic en el botón de una moneda
const displayGraph = async (coinId, coinName, canvasId) => {
    const coinHistory = await getCoinHistory(coinId);
    graficaByCoin(coinHistory, coinName, canvasId);
}

// Función para dibujar la gráfica de precios de una moneda
const graficaByCoin = (data, coinName, canvasId) => {
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
}

// Función para obtener y mostrar todos los coins
const getAllCoins = async () => {
    try {
        const response = await fetch('https://api.coincap.io/v2/assets');
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error al obtener los datos de la API", error);
        return [];
    }
};

const mostrarDatosCards = async () => {
    const containerCoinCards = document.getElementById("containerCoinCards");
    const data = await getAllCoins();
    data.forEach(coin => {
        const priceUsd = parseFloat(coin.priceUsd).toFixed(2);
        const modalId = `exampleModal-${coin.id}`;
        const canvasId = `bitcoinPriceChart-${coin.id}`;
        const eachCard = `
        <section class="col-12 mt-2">
            <div class="card">
                <div class="card-header">
                    ${coin.symbol}
                </div>
                <div class="card-body">
                    <blockquote class="blockquote mb-0">
                        <div class="row">
                            <div class="col-12">
                                <p>${coin.name}</p>
                                <p>El precio actual es: $ ${priceUsd}</p>
                                <p>Rank: ${coin.rank}</p>
                                <!-- Button trigger modal -->
                                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${modalId}" onclick="displayGraph('${coin.id}', '${coin.name}', '${canvasId}')">Ver gráfica</button>

                                <!-- Modal -->
                                <div class="modal fade" id="${modalId}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5" id="exampleModalLabel">Histórico ${coin.name}</h1>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <canvas id="${canvasId}"></canvas>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </blockquote>
                </div>
            </div>
        </section>
        `

        containerCoinCards.insertAdjacentHTML('beforeend', eachCard);
    });
}

mostrarDatosCards();