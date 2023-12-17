// Función para realizar una petición a la API y obtener los datos
const fetchTopCryptoByPrice = async () => {
  try {
    const response = await fetch('https://api.coincap.io/v2/assets');
    const data = await response.json();
    // Ordenamos los resultados por precio de mayor a menor
    const sortedByPrice = data.data.sort((a, b) => parseFloat(b.priceUsd) - parseFloat(a.priceUsd));
    return sortedByPrice.slice(0, 5); // Obtenemos solo el top 5 por precio
  } catch (error) {
    console.error("Error al obtener los datos de la API", error);
    return [];
  }
};

// Función para crear y mostrar la gráfica del top 5
export const createTopFiveGraph = async (elementId) => {
  const topFiveData = await fetchTopCryptoByPrice();

  const myChart_Top5 = document.getElementById(elementId);

  // Procesamos los datos para la gráfica
  const labels = topFiveData.map(coin => coin.id); // Usamos el ID como etiqueta
  const priceData = topFiveData.map(coin => parseFloat(coin.priceUsd)); // Obtenemos el precio

  new Chart(myChart_Top5, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Precio (USD)",
          data: priceData,
          borderWidth: 1,
          backgroundColor: ["#ff6384", "#36a2eb", "yellow", "green", "#551a8b"],
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: false,
        },
      },
      tooltips: {
        callbacks: {
          label: function(tooltipItem, data) {
            return `${data.datasets[tooltipItem.datasetIndex].label}: $${tooltipItem.yLabel.toLocaleString()}`;
          }
        }
      }
    },
  });
};
