// Función para realizar una petición a la API y obtener los datos
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
        const eachCard = `
        <section class="col-12 mt-2">
            <div class="card">
                <div class="card-header">
                    ${coin.symbol}
                </div>
                <div class="card-body">
                    <blockquote class="blockquote mb-0">
                    <div class="row">
                        <div class="col-lg-6 col-xs-12">
                            <p>${coin.name}</p>
                            <p>El precio actual es: $ ${priceUsd}</p>
                            <p>Rank: ${coin.rank}</p>
                        </div>
                        <div class="col-lg-6 col-xs-12" id="graphByCoin">
                            GRÁFICA
                        </div>
                    </div>
                    <footer class="mt-1">
                            <cite title="Source Title"><a href=${coin.explorer} class="moreInfoCard">Mas Informacion</a></cite></footer>
                    </blockquote>
                </div>
            </div>
        </section>
        `

        containerCoinCards.insertAdjacentHTML('beforeend', eachCard);
    });
}

mostrarDatosCards();