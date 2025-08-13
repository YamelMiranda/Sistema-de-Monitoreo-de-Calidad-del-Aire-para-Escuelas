import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  Clock,
  Zap,
  Wind,
  Droplets,
  Thermometer,
  Brain,
  Target,
  Bell
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend, Area, AreaChart } from 'recharts';

const Predictions: React.FC = () => {
  const [selectedPredictionType, setSelectedPredictionType] = useState('co2');
  const [alertsEnabled, setAlertsEnabled] = useState(true);

  // Prediction data for the next 24 hours
  const co2Predictions = [
    { time: '00:00', current: 420, predicted: 430, confidence: 95 },
    { time: '02:00', current: 380, predicted: 385, confidence: 92 },
    { time: '04:00', current: 350, predicted: 360, confidence: 94 },
    { time: '06:00', current: 400, predicted: 420, confidence: 88 },
    { time: '08:00', current: 750, predicted: 780, confidence: 85 },
    { time: '10:00', current: 950, predicted: 1020, confidence: 82 },
    { time: '12:00', current: 1100, predicted: 1150, confidence: 78 },
    { time: '14:00', current: 1200, predicted: 1280, confidence: 75 },
    { time: '16:00', current: 1050, predicted: 1100, confidence: 80 },
    { time: '18:00', current: 800, predicted: 820, confidence: 87 },
    { time: '20:00', current: 650, predicted: 680, confidence: 90 },
    { time: '22:00', current: 480, predicted: 500, confidence: 93 }
  ];

  const pm25Predictions = [
    { time: '00:00', current: 25, predicted: 28, confidence: 88 },
    { time: '02:00', current: 22, predicted: 24, confidence: 90 },
    { time: '04:00', current: 20, predicted: 22, confidence: 92 },
    { time: '06:00', current: 35, predicted: 38, confidence: 85 },
    { time: '08:00', current: 45, predicted: 48, confidence: 82 },
    { time: '10:00', current: 52, predicted: 55, confidence: 78 },
    { time: '12:00', current: 48, predicted: 50, confidence: 80 },
    { time: '14:00', current: 55, predicted: 58, confidence: 76 },
    { time: '16:00', current: 50, predicted: 52, confidence: 83 },
    { time: '18:00', current: 42, predicted: 45, confidence: 86 },
    { time: '20:00', current: 35, predicted: 37, confidence: 89 },
    { time: '22:00', current: 30, predicted: 32, confidence: 91 }
  ];

  const humidityPredictions = [
    { time: '00:00', current: 75, predicted: 77, confidence: 94 },
    { time: '02:00', current: 78, predicted: 80, confidence: 95 },
    { time: '04:00', current: 80, predicted: 82, confidence: 96 },
    { time: '06:00', current: 75, predicted: 76, confidence: 93 },
    { time: '08:00', current: 68, predicted: 70, confidence: 90 },
    { time: '10:00', current: 65, predicted: 66, confidence: 88 },
    { time: '12:00', current: 62, predicted: 64, confidence: 85 },
    { time: '14:00', current: 58, predicted: 60, confidence: 87 },
    { time: '16:00', current: 60, predicted: 62, confidence: 89 },
    { time: '18:00', current: 65, predicted: 67, confidence: 91 },
    { time: '20:00', current: 70, predicted: 72, confidence: 93 },
    { time: '22:00', current: 73, predicted: 75, confidence: 95 }
  ];

  const getCurrentPredictionData = () => {
    switch (selectedPredictionType) {
      case 'co2': return co2Predictions;
      case 'pm25': return pm25Predictions;
      case 'humidity': return humidityPredictions;
      default: return co2Predictions;
    }
  };

  const getMetricConfig = (type: string) => {
    switch (type) {
      case 'co2':
        return {
          name: 'CO₂',
          unit: 'ppm',
          color: '#3b82f6',
          threshold: 1000,
          icon: <Wind className="w-5 h-5" />
        };
      case 'pm25':
        return {
          name: 'PM2.5',
          unit: 'μg/m³',
          color: '#8b5cf6',
          threshold: 35,
          icon: <Droplets className="w-5 h-5" />
        };
      case 'humidity':
        return {
          name: 'Humedad',
          unit: '%',
          color: '#06b6d4',
          threshold: 70,
          icon: <Droplets className="w-5 h-5" />
        };
      default:
        return {
          name: 'CO₂',
          unit: 'ppm',
          color: '#3b82f6',
          threshold: 1000,
          icon: <Wind className="w-5 h-5" />
        };
    }
  };

  // Active alerts
  const activeAlerts = [
    {
      id: 1,
      type: 'high',
      metric: 'CO₂',
      predictedValue: 1280,
      threshold: 1000,
      time: '14:00',
      confidence: 75,
      message: 'Niveles críticos de CO₂ previstos durante el almuerzo',
      recommendation: 'Abrir ventanas y activar sistema de ventilación',
      icon: <Wind className="w-5 h-5" />,
      color: 'bg-red-500/20 border-red-500/50 text-red-400'
    },
    {
      id: 2,
      type: 'medium',
      metric: 'PM2.5',
      predictedValue: 58,
      threshold: 35,
      time: '14:00',
      confidence: 76,
      message: 'Aumento moderado en partículas PM2.5',
      recommendation: 'Limitar actividades físicas intensas',
      icon: <Droplets className="w-5 h-5" />,
      color: 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400'
    },
    {
      id: 3,
      type: 'info',
      metric: 'Humedad',
      predictedValue: 82,
      threshold: 70,
      time: '04:00',
      confidence: 96,
      message: 'Alta humedad prevista en primeras horas',
      recommendation: 'Activar deshumidificador si es necesario',
      icon: <Droplets className="w-5 h-5" />,
      color: 'bg-blue-500/20 border-blue-500/50 text-blue-400'
    }
  ];

  const predictionData = getCurrentPredictionData();
  const metricConfig = getMetricConfig(selectedPredictionType);
  
  const averageConfidence = predictionData.reduce((sum, item) => sum + item.confidence, 0) / predictionData.length;

  return (
    <div className="text-white p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2">Predicciones y Alertas</h1>
          <p className="text-gray-400">Análisis predictivo basado en IA para anticipar cambios en la calidad del aire</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-400">Alertas</span>
            <button
              onClick={() => setAlertsEnabled(!alertsEnabled)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                alertsEnabled ? 'bg-purple-600' : 'bg-gray-600'
              }`}
            >
              <div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
                alertsEnabled ? 'translate-x-6' : 'translate-x-0.5'
              }`}></div>
            </button>
          </div>
        </div>
      </div>

      {/* AI Status Card */}
      <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 p-6 rounded-lg border border-purple-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-lg">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Sistema de IA Activo</h3>
              <p className="text-gray-300">Analizando patrones y generando predicciones</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-green-400">{averageConfidence.toFixed(0)}%</div>
            <div className="text-sm text-gray-400">Confianza promedio</div>
          </div>
        </div>
      </div>

      {/* Prediction Controls */}
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <div className="flex items-center space-x-2 mb-4">
          <Target className="w-5 h-5 text-gray-400" />
          <h3 className="text-lg font-semibold">Configuración de Predicciones</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Métrica a Predecir
            </label>
            <select
              value={selectedPredictionType}
              onChange={(e) => setSelectedPredictionType(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="co2">CO₂ (Dióxido de Carbono)</option>
              <option value="pm25">PM2.5 (Partículas Finas)</option>
              <option value="humidity">Humedad Relativa</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Horizonte Temporal
            </label>
            <select
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="24h">Próximas 24 horas</option>
              <option value="48h">Próximas 48 horas</option>
              <option value="7d">Próxima semana</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Modelo de IA
            </label>
            <select
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="lstm">LSTM Neural Network</option>
              <option value="arima">ARIMA Time Series</option>
              <option value="ensemble">Ensemble Model</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Alerts */}
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <h3 className="text-lg font-semibold">Alertas Activas</h3>
            <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded-full text-xs font-medium">
              {activeAlerts.length}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeAlerts.map((alert) => (
            <div key={alert.id} className={`p-4 rounded-lg border ${alert.color}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  {alert.icon}
                  <span className="font-medium text-sm">{alert.metric}</span>
                </div>
                <div className="text-xs bg-gray-700 px-2 py-1 rounded">
                  {alert.confidence}% confianza
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm font-medium">{alert.message}</div>
                <div className="text-xs text-gray-400">{alert.recommendation}</div>
                <div className="flex items-center justify-between text-xs">
                  <span>Previsto: {alert.time}</span>
                  <span>{alert.predictedValue} {metricConfig.unit}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prediction Chart */}
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            {metricConfig.icon}
            <h3 className="text-xl font-semibold">
              Predicción de {metricConfig.name} - Próximas 24 horas
            </h3>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm">Valores actuales</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-sm">Predicción IA</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm">Umbral de alerta</span>
            </div>
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={predictionData}>
              <defs>
                <linearGradient id="currentGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="predictedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff'
                }}
                formatter={(value: any, name: string) => [
                  `${value} ${metricConfig.unit}`,
                  name === 'current' ? 'Actual' : name === 'predicted' ? 'Predicción' : name
                ]}
              />
              <Legend />
              
              {/* Current values line */}
              <Line
                type="monotone"
                dataKey="current"
                stroke="#3b82f6"
                strokeWidth={3}
                name="Valores Actuales"
                dot={{ fill: '#3b82f6', strokeWidth: 2 }}
              />
              
              {/* Predicted values line */}
              <Line
                type="monotone"
                dataKey="predicted"
                stroke="#8b5cf6"
                strokeWidth={3}
                strokeDasharray="5 5"
                name="Predicción IA"
                dot={{ fill: '#8b5cf6', strokeWidth: 2 }}
              />
              
              {/* Threshold line */}
              <Line
                type="monotone"
                dataKey={() => metricConfig.threshold}
                stroke="#ef4444"
                strokeWidth={2}
                strokeDasharray="3 3"
                name="Umbral de Alerta"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Prediction Accuracy and Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Model Performance */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-lg font-semibold mb-4">Rendimiento del Modelo</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Precisión promedio</span>
              <span className="font-medium">{averageConfidence.toFixed(1)}%</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Tiempo de entrenamiento</span>
              <span className="font-medium">2.3 horas</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Último entrenamiento</span>
              <span className="font-medium">Hace 6 horas</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Datos utilizados</span>
              <span className="font-medium">30 días</span>
            </div>
            
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                style={{ width: `${averageConfidence}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-lg font-semibold mb-4">Recomendaciones IA</h3>
          
          <div className="space-y-4">
            <div className="p-3 bg-green-500/20 border border-green-500/50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="w-4 h-4 text-green-400" />
                <span className="text-sm font-medium text-green-400">Acción Inmediata</span>
              </div>
              <p className="text-xs text-gray-300">
                Abrir ventanas del aula 205 en los próximos 15 minutos para prevenir niveles críticos de CO₂.
              </p>
            </div>
            
            <div className="p-3 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-medium text-yellow-400">Planificar</span>
              </div>
              <p className="text-xs text-gray-300">
                Considere activar el sistema de ventilación automático durante las horas pico (10:00-15:00).
              </p>
            </div>
            
            <div className="p-3 bg-blue-500/20 border border-blue-500/50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-400">Optimización</span>
              </div>
              <p className="text-xs text-gray-300">
                Los patrones muestran mejor calidad del aire los martes. Planifique actividades intensas ese día.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Predictions;