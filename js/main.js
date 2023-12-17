
// Imports de funciones
import { obtenerCambioUSDaMXN } from "./USDtoMXN.js";
import { createTopFiveGraph } from "./graficaTopFive.js";
import { getAllCoins, getCoinHistory, graficaByCoin } from "./coinsToCards.js"

// Función Para obtener el cambio de moneda
const mostrarCambioUSDaMXN = async () => {
    const resultado = await obtenerCambioUSDaMXN();
    if (resultado) {
        document.getElementById('precioDolar').innerText = resultado.cambio + " MXN";
    } else {
        document.getElementById('precioDolar').innerText = 'No se pudo obtener el precio del dólar';
    }
};

// Función Para los cards y gráfica por card
const displayGraph = async (coinId, coinName, canvasId) => {
    const coinHistory = await getCoinHistory(coinId);
    graficaByCoin(coinHistory, coinName, canvasId);
};

const mostrarDatosCards = async () => {
    const containerCoinCards = document.getElementById("containerCoinCards");
    const data = await getAllCoins();

    data.forEach(coin => {
        const priceUsd = parseFloat(coin.priceUsd).toFixed(2);
        const modalId = `exampleModal-${coin.id}`;
        const canvasId = `bitcoinPriceChart-${coin.id}`;
        const buttonId = `btn-${coin.id}`;

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
                                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${modalId}" id="${buttonId}">Ver gráfica</button>

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
        `;

        containerCoinCards.insertAdjacentHTML('beforeend', eachCard);

        // Asegurarse de que el DOM se haya actualizado antes de agregar el listener
        setTimeout(() => {
            const modalButton = document.getElementById(buttonId);
            modalButton.addEventListener('click', () => displayGraph(coin.id, coin.name, canvasId));
        }, 0);
    });
};

// Llamadas a las funciones para actualizar los datos en la página
mostrarCambioUSDaMXN();
mostrarDatosCards();

// Llamar para la gráfica de top 5
window.addEventListener("load", () => {
    createTopFiveGraph("myChart_Top5");
});
