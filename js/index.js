const myChart_Top5 = document.getElementById("myChart_Top5")

const pintarGrafica = () => {
   new Chart(myChart_Top5, {
        type: "line", // line, pie, bar, radar, doughnut
        data: {
          labels:["Bitcoin","Ethereum", "Tether","BNB", "Solana"], // eje x
          datasets: [
            {
              label: "Grafica Top5",
              data:[41, 20, 14, 54, 67], // eje y
              borderWidth: 1,
              backgroundColor: ["#ff6384", "#36a2eb", "yellow", "green"],
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    };
    

window.addEventListener("load", pintarGrafica);