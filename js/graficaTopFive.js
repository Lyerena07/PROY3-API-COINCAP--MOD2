const myChart_Top5 = document.getElementById("myChart_Top5")

const topFiveGraph = () => {
  new Chart(myChart_Top5, {
        type: "line", // line, pie, bar, radar, doughnut
        data: {
          labels:["Bitcoin","Ethereum", "Tether","BNB", "Solana"],
          datasets: [
            {
              label: "",
              data:[41, 20, 14, 54, 67],
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
    

window.addEventListener("load", topFiveGraph);