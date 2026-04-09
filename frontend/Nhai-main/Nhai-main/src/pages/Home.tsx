import { AlertTriangle, Car, TrendingUp, Shield } from 'lucide-react';

const Home = () => {
  const stats = [
    {
      title: 'Accidents Detected Today',
      value: '12',
      change: '-15%',
      icon: AlertTriangle,
      color: 'bg-red-500',
      isPositive: true,
    },
    {
      title: 'Traffic Density',
      value: '68%',
      change: '+5%',
      icon: Car,
      color: 'bg-blue-500',
      isPositive: false,
    },
    {
      title: 'Alerts Generated',
      value: '347',
      change: '+12%',
      icon: TrendingUp,
      color: 'bg-orange-500',
      isPositive: false,
    },
    {
      title: 'Active Cameras',
      value: '1,248',
      change: '99.2%',
      icon: Shield,
      color: 'bg-green-500',
      isPositive: true,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-[#0b3d91] to-blue-700 rounded-lg p-8 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
            <span className="text-4xl font-bold text-[#0b3d91]">N</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold">National Highway AI Monitoring System</h1>
            <p className="text-blue-100 mt-1">Real-time monitoring of highways using Artificial Intelligence</p>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4 text-sm">
          <div className="px-3 py-1 bg-blue-600 rounded">Live</div>
          <span className="text-blue-200">Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Today's Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow border border-gray-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <span
                    className={`text-sm font-medium px-2 py-1 rounded ${
                      stat.isPositive
                        ? 'bg-green-100 text-green-700'
                        : 'bg-orange-100 text-orange-700'
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-gray-600 text-sm font-medium mb-2">{stat.title}</h3>
                <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4">System Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">AI Detection Engine</span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                Operational
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Camera Network</span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                Online
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Database Sync</span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                Active
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Alert System</span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                Running
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-800 font-medium">Accident detected on NH-48</p>
                <p className="text-xs text-gray-500">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-800 font-medium">High traffic density on NH-44</p>
                <p className="text-xs text-gray-500">15 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-800 font-medium">Vehicle breakdown on NH-1</p>
                <p className="text-xs text-gray-500">32 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-800 font-medium">Normal flow resumed on NH-8</p>
                <p className="text-xs text-gray-500">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
