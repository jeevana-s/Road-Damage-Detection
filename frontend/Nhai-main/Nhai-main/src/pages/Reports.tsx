import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Download } from 'lucide-react';
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// ✅ TYPE DEFINITION
type ReportsData = {
  traffic_trend: number[];
  accidents: number[];
};

const Reports = () => {
  // ✅ FIXED TYPE
  const [reports, setReports] = useState<ReportsData | null>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/reports")
      .then(res => res.json())
      .then((data: ReportsData) => setReports(data));
  }, []);

  if (!reports) return <div className="p-6">Loading reports...</div>;

  // ✅ SAFE CALCULATIONS
  const avgTraffic = Math.round(
    reports.traffic_trend.reduce((a: number, b: number) => a + b, 0) /
    reports.traffic_trend.length
  );

  const totalAccidents = reports.accidents.reduce(
    (a: number, b: number) => a + b,
    0
  );

  // ✅ CHART DATA
  const trafficData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Traffic Trend',
        data: reports.traffic_trend,
        borderColor: '#0b3d91',
        backgroundColor: 'rgba(11, 61, 145, 0.1)',
        tension: 0.4,
      }
    ],
  };

  const accidentData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Accidents',
        data: reports.accidents,
        backgroundColor: 'rgba(239, 68, 68, 0.7)',
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="space-y-6">

      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Analytics & Reports</h1>
        <button className="bg-[#0b3d91] text-white px-4 py-2 rounded flex gap-2">
          <Download size={18}/> Download
        </button>
      </div>

      {/* GRAPHS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="bg-white p-6 shadow">
          <h2 className="mb-4 font-bold">Traffic Trends</h2>
          <div style={{ height: '300px' }}>
            <Line data={trafficData} options={options} />
          </div>
        </div>

        <div className="bg-white p-6 shadow">
          <h2 className="mb-4 font-bold">Accidents</h2>
          <div style={{ height: '300px' }}>
            <Bar data={accidentData} options={options} />
          </div>
        </div>

      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-3 gap-6">

        <div className="bg-blue-500 text-white p-4">
          Traffic Avg
          <h2 className="text-2xl font-bold">{avgTraffic}</h2>
        </div>

        <div className="bg-red-500 text-white p-4">
          Total Accidents
          <h2 className="text-2xl font-bold">{totalAccidents}</h2>
        </div>

        <div className="bg-green-500 text-white p-4">
          System Status
          <h2 className="text-xl font-bold">Active</h2>
        </div>

      </div>

    </div>
  );
};

export default Reports;