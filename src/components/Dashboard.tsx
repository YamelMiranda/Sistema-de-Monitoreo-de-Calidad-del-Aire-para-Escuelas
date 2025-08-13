import React, { useState, useEffect } from 'react';
import { 
  Cloud, 
  Sun, 
  MapPin, 
  Clock, 
  AlertTriangle, 
  Droplets,
  Wind,
  Eye,
  Thermometer,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Dashboard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedSchool, setSelectedSchool] = useState('Liceo Eugenio María De Hostos');

  // Simulated real-time data
  const [sensorData, setSensorData] = useState({
    temperature: 26,
    humidity: 68,
    co2: 850,
    pm25: 45,
    pm10: 62,
    uvIndex: 7,
    weatherCondition: 'Nublado',
    feelsLike: 28
  });

  // Generate realistic hourly CO2 data
  const co2HourlyData = [
    { time: '6:00', value: 420, status: 'Normal' },
    { time: '7:00', value: 580, status: 'Normal' },
    { time: '8:00', value: 750, status: 'Normal' },
    { time: '9:00', value: 920, status: 'Elevado' },
    { time: '10:00', value: 1050, status: 'Elevado' },
    { time: '11:00', value: 980, status: 'Elevado' },
    { time: '12:00', value: 650, status: 'Normal' },
    { time: '13:00', value: 890, status: 'Elevado' },
    { time: '14:00', value: 1200, status: 'Alto' },
    { time: '15:00', value: 1100, status: 'Alto' },
    { time: '16:00', value: 850, status: 'Elevado' },
    { time: '17:00', value: 620, status: 'Normal' },
    { time: '18:00', value: 480, status: 'Normal' },
    { time: '19:00', value: 420, status: 'Normal' }
  ];

  // Particulate matter trend data
  const pmTrendData = [
    { time: '00', pm25: 30, pm10: 45 },
    { time: '04', pm25: 25, pm10: 40 },
    { time: '08', pm25: 45, pm10: 62 },
    { time: '12', pm25: 55, pm10: 70 },
    { time: '16', pm25: 48, pm10: 65 },
    { time: '20', pm25: 35, pm10: 52 }
  ];

  // UV Index trend data
  const uvTrendData = [
    { time: '06', value: 1 },
    { time: '08', value: 3 },
    { time: '10', value: 6 },
    { time: '12', value: 8 },
    { time: '14', value: 7 },
    { time: '16', value: 5 },
    { time: '18', value: 2 },
    { time: '20', value: 0 }
  ];

  // Humidity trend data
  const humidityTrendData = [
    { time: '00', value: 75 },
    { time: '04', value: 80 },
    { time: '08', value: 68 },
    { time: '12', value: 65 },
    { time: '16', value: 70 },
    { time: '20', value: 72 }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      // Simulate real-time data updates
      setSensorData(prev => ({
        ...prev,
        co2: Math.floor(Math.random() * 200) + 750,
        pm25: Math.floor(Math.random() * 20) + 35,
        humidity: Math.floor(Math.random() * 10) + 65
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(timer);
  }, []);

  const getAQIStatus = (value: number, type: 'co2' | 'pm25' | 'uv') => {
    switch (type) {
      case 'co2':
        if (value < 800) return { status: 'Bueno', color: 'text-green-400', bgColor: 'bg-green-500/20' };
        if (value < 1000) return { status: 'Moderado', color: 'text-yellow-400', bgColor: 'bg-yellow-500/20' };
        return { status: 'Alto', color: 'text-red-400', bgColor: 'bg-red-500/20' };
      case 'pm25':
        if (value < 35) return { status: 'Bueno', color: 'text-green-400', bgColor: 'bg-green-500/20' };
        if (value < 55) return { status: 'Moderado', color: 'text-yellow-400', bgColor: 'bg-yellow-500/20' };
        return { status: 'Alto', color: 'text-red-400', bgColor: 'bg-red-500/20' };
      case 'uv':
        if (value < 3) return { status: 'Bajo', color: 'text-green-400', bgColor: 'bg-green-500/20' };
        if (value < 6) return { status: 'Moderado', color: 'text-yellow-400', bgColor: 'bg-yellow-500/20' };
        return { status: 'Alto', color: 'text-red-400', bgColor: 'bg-red-500/20' };
      default:
        return { status: 'Normal', color: 'text-blue-400', bgColor: 'bg-blue-500/20' };
    }
  };

  const recommendations = [
    {
      icon: <Wind className="w-5 h-5" />,
      title: 'CO₂ > 1000 ppm',
      description: 'Ventilar el aula — Los niveles de CO₂ son altos.',
      color: 'bg-yellow-500/20 border-yellow-500/50',
      iconColor: 'text-yellow-400'
    },
    {
      icon: <AlertTriangle className="w-5 h-5" />,
      title: 'PM2.5 / PM10 > 35 μg/m³',
      description: 'Evitar actividad física intensa. El aire contiene altas concentraciones de partículas.',
      color: 'bg-red-500/20 border-red-500/50',
      iconColor: 'text-red-400'
    },
    {
      icon: <Droplets className="w-5 h-5" />,
      title: 'Humedad > 70%',
      description: 'Mantener hidratación. Considerar usar ventiladores o sistemas de enfriamiento.',
      color: 'bg-blue-500/20 border-blue-500/50',
      iconColor: 'text-blue-400'
    },
    {
      icon: <Thermometer className="w-5 h-5" />,
      title: 'Temperatura > 30°C',
      description: 'Alta temperatura. Stay hydrated and ensure good classroom ventilation.',
      color: 'bg-orange-500/20 border-orange-500/50',
      iconColor: 'text-orange-400'
    }
  ];

  const formatDate = (date: Date) => {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    
    return {
      dayName: days[date.getDay()],
      day: date.getDate(),
      month: months[date.getMonth()],
      year: date.getFullYear()
    };
  };

  const dateInfo = formatDate(currentTime);

  return (
    <div className="text-white p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-2 rounded-full text-sm font-medium hover:from-purple-700 hover:to-blue-700 transition-colors">
            {selectedSchool}
          </button>
          
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <div className="flex items-center space-x-1">
              <span>F</span>
              <div className="w-8 h-4 bg-gray-600 rounded-full relative">
                <div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5"></div>
              </div>
              <span>C</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-sm text-gray-400">
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4" />
            <span>Ubicación del sensor</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>Última actualización: hace 2 min</span>
          </div>
        </div>
      </div>

      {/* Weather and Date Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Date and Weather */}
        <div className="lg:col-span-1">
          <div className="space-y-2">
            <h2 className="text-4xl font-bold">{dateInfo.dayName}</h2>
            <p className="text-gray-400">{dateInfo.day} {dateInfo.month}, {dateInfo.year}</p>
            
            <div className="flex items-center space-x-4 mt-6">
              <div className="text-6xl font-light">{sensorData.temperature}°C</div>
              <div className="text-center">
                <Cloud className="w-12 h-12 text-gray-400 mb-2" />
                <p className="text-lg">{sensorData.weatherCondition}</p>
                <p className="text-sm text-gray-400">Sensación {sensorData.feelsLike}°C</p>
              </div>
            </div>
          </div>
        </div>

        {/* Weather Info */}
        <div className="lg:col-span-1 flex items-center justify-center">
          <div className="relative">
            <Sun className="w-24 h-24 text-yellow-400" />
            <Cloud className="w-16 h-16 text-gray-400 absolute -bottom-2 -right-2" />
          </div>
        </div>

        {/* Today Highlights */}
        <div className="lg:col-span-1">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Today Highlight</h3>
            
            <div className="grid grid-cols-2 gap-4">
              {/* Particulate Matter */}
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <p className="text-sm text-gray-400 mb-2">Particulate Matter (PM2.5 / PM10)</p>
                <div className="flex items-center justify-between">
                  <div className="h-12 w-16">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={pmTrendData.slice(-4)}>
                        <Bar dataKey="pm25" fill="#8b5cf6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <TrendingUp className="w-4 h-4 text-green-400" />
                </div>
              </div>

              {/* UV Index */}
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <p className="text-sm text-gray-400 mb-2">UV Index</p>
                <div className="flex items-center justify-between">
                  <div className="relative w-12 h-12">
                    <div className="w-12 h-12 rounded-full border-4 border-gray-600 flex items-center justify-center">
                      <span className="text-lg font-bold text-yellow-400">UV</span>
                    </div>
                  </div>
                  <Sun className="w-4 h-4 text-yellow-400" />
                </div>
              </div>

              {/* CO2 Levels */}
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <p className="text-sm text-gray-400 mb-2">CO₂ Levels</p>
                <div className="flex items-center justify-between">
                  <div className="h-12 w-16">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={[
                        { name: '1', value: 800 },
                        { name: '2', value: 900 },
                        { name: '3', value: 850 }
                      ]}>
                        <Bar dataKey="value" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Humidity */}
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <p className="text-sm text-gray-400 mb-2">Humidity</p>
                <div className="flex items-center justify-between">
                  <Cloud className="w-8 h-8 text-blue-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Particulate Matter Card */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm text-gray-400">Particulate Matter<br />(PM2.5 / PM10)</h3>
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold">{sensorData.pm25} / {sensorData.pm10}</div>
            <div className="text-sm text-gray-400">μg/m³</div>
            <div className="h-16">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pmTrendData}>
                  <Bar dataKey="pm25" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* UV Index Card */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm text-gray-400">UV Index</h3>
            <Sun className="w-5 h-5 text-yellow-400" />
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold">{sensorData.uvIndex}</div>
            <div className="text-sm text-gray-400">—</div>
            <div className="h-16">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={uvTrendData}>
                  <Bar dataKey="value" fill="#eab308" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* CO2 Levels Card */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm text-gray-400">CO₂ Levels</h3>
            <TrendingDown className="w-5 h-5 text-red-400" />
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold">{sensorData.co2}</div>
            <div className="text-sm text-gray-400">ppm</div>
            <div className="h-16">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={co2HourlyData.slice(-6)}>
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Humidity Card */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm text-gray-400">Humidity</h3>
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold">{sensorData.humidity}</div>
            <div className="text-sm text-gray-400">%</div>
            <div className="h-16">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={humidityTrendData}>
                  <Bar dataKey="value" fill="#06b6d4" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Large Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CO2 Levels Chart */}
        <div className="lg:col-span-2 bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-xl font-semibold mb-4">CO₂ Levels</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={co2HourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Bar 
                  dataKey="value" 
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center space-x-6 mt-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Normal (&lt; 800 ppm)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Elevado (&gt; 800 ppm)</span>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Recomendaciones</h3>
            <button className="text-blue-400 text-sm hover:text-blue-300">Ver Todas</button>
          </div>
          
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div key={index} className={`p-4 rounded-lg border ${rec.color}`}>
                <div className="flex items-start space-x-3">
                  <div className={`${rec.iconColor} mt-1`}>
                    {rec.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm mb-1">{rec.title}</h4>
                    <p className="text-xs text-gray-400">{rec.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;