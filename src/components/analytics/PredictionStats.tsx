import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface PredictionStatsProps {
  data: Array<{ correct: number; count: number }>;
}

const PredictionStats: React.FC<PredictionStatsProps> = ({ data }) => {
  const chartData = {
    labels: data.map(d => `${d.correct}/5 Correct`),
    datasets: [
      {
        label: 'Number of Predictions',
        data: data.map(d => d.count),
        backgroundColor: 'rgba(236, 72, 153, 0.5)',
        borderColor: 'rgb(236, 72, 153)',
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'rgb(226, 232, 240)'
        }
      },
      title: {
        display: true,
        text: 'Prediction Success Distribution',
        color: 'rgb(226, 232, 240)'
      }
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(226, 232, 240, 0.1)'
        },
        ticks: {
          color: 'rgb(226, 232, 240)'
        }
      },
      x: {
        grid: {
          color: 'rgba(226, 232, 240, 0.1)'
        },
        ticks: {
          color: 'rgb(226, 232, 240)'
        }
      }
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20">
      <div style={{ height: '400px' }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default PredictionStats;