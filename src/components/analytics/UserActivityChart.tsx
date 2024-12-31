import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface UserActivityChartProps {
  data: Array<{ date: string; users: number }>;
}

const UserActivityChart: React.FC<UserActivityChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map(d => d.date),
    datasets: [
      {
        label: 'Active Users',
        data: data.map(d => d.users),
        borderColor: 'rgb(147, 51, 234)',
        backgroundColor: 'rgba(147, 51, 234, 0.5)',
        tension: 0.4,
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
        text: 'User Activity Over Time',
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
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default UserActivityChart;