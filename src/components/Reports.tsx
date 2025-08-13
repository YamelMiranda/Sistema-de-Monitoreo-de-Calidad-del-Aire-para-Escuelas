import React, { useState } from 'react';
import { Calendar, Download, Filter, BarChart3, TrendingUp, FileText } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend, Area, AreaChart } from 'recharts';
import jsPDF from 'jspdf';

const Reports: React.FC = () => {
  const [selectedDateRange, setSelectedDateRange] = useState('week');
  const [selectedSensor, setSelectedSensor] = useState('all');
  const [selectedMetric, setSelectedMetric] = useState('co2');

  // Historical data for different periods
  const weeklyData = [
    { date: 'Lun', co2: 850, pm25: 45, pm10: 62, humidity: 68, temperature: 26 },
    { date: 'Mar', co2: 920, pm25: 48, pm10: 65, humidity: 70, temperature: 27 },
    { date: 'Mié', co2: 780, pm25: 42, pm10: 58, humidity: 65, temperature: 25 },
    { date: 'Jue', co2: 1050, pm25: 52, pm10: 70, humidity: 72, temperature: 28 },
    { date: 'Vie', co2: 890, pm25: 46, pm10: 63, humidity: 69, temperature: 26 },
    { date: 'Sáb', co2: 650, pm25: 35, pm10: 48, humidity: 60, temperature: 24 },
    { date: 'Dom', co2: 580, pm25: 32, pm10: 45, humidity: 58, temperature: 23 }
  ];

  const monthlyData = [
    { date: 'Sem 1', co2: 825, pm25: 42, pm10: 58, humidity: 66, temperature: 25 },
    { date: 'Sem 2', co2: 890, pm25: 48, pm10: 65, humidity: 70, temperature: 27 },
    { date: 'Sem 3', co2: 920, pm25: 45, pm10: 62, humidity: 68, temperature: 26 },
    { date: 'Sem 4', co2: 850, pm25: 50, pm10: 68, humidity: 72, temperature: 28 }
  ];

  const yearlyData = [
    { date: 'Ene', co2: 780, pm25: 38, pm10: 52, humidity: 65, temperature: 22 },
    { date: 'Feb', co2: 820, pm25: 42, pm10: 58, humidity: 68, temperature: 24 },
    { date: 'Mar', co2: 860, pm25: 45, pm10: 62, humidity: 70, temperature: 26 },
    { date: 'Abr', co2: 890, pm25: 48, pm10: 65, humidity: 72, temperature: 28 },
    { date: 'May', co2: 920, pm25: 50, pm10: 68, humidity: 75, temperature: 30 },
    { date: 'Jun', co2: 950, pm25: 52, pm10: 70, humidity: 78, temperature: 32 },
    { date: 'Jul', co2: 930, pm25: 48, pm10: 66, humidity: 76, temperature: 31 },
    { date: 'Ago', co2: 900, pm25: 46, pm10: 64, humidity: 74, temperature: 29 },
    { date: 'Sep', co2: 870, pm25: 44, pm10: 60, humidity: 70, temperature: 27 },
    { date: 'Oct', co2: 840, pm25: 42, pm10: 58, humidity: 68, temperature: 25 },
    { date: 'Nov', co2: 810, pm25: 40, pm10: 55, humidity: 66, temperature: 23 },
    { date: 'Dic', co2: 790, pm25: 38, pm10: 52, humidity: 64, temperature: 21 }
  ];

  const getCurrentData = () => {
    switch (selectedDateRange) {
      case 'week': return weeklyData;
      case 'month': return monthlyData;
      case 'year': return yearlyData;
      default: return weeklyData;
    }
  };

  const getMetricConfig = () => {
    switch (selectedMetric) {
      case 'co2':
        return { 
          key: 'co2', 
          label: 'CO₂ (ppm)', 
          color: '#3b82f6',
          threshold: 1000
        };
      case 'pm25':
        return { 
          key: 'pm25', 
          label: 'PM2.5 (μg/m³)', 
          color: '#8b5cf6',
          threshold: 35
        };
      case 'pm10':
        return { 
          key: 'pm10', 
          label: 'PM10 (μg/m³)', 
          color: '#06b6d4',
          threshold: 50
        };
      case 'humidity':
        return { 
          key: 'humidity', 
          label: 'Humedad (%)', 
          color: '#10b981',
          threshold: 70
        };
      case 'temperature':
        return { 
          key: 'temperature', 
          label: 'Temperatura (°C)', 
          color: '#f59e0b',
          threshold: 30
        };
      default:
        return { 
          key: 'co2', 
          label: 'CO₂ (ppm)', 
          color: '#3b82f6',
          threshold: 1000
        };
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const currentData = getCurrentData();
    const metricConfig = getMetricConfig();
    
    // Header
    doc.setFontSize(18);
    doc.text('Reporte de Calidad del Aire', 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Período: ${selectedDateRange === 'week' ? 'Última semana' : selectedDateRange === 'month' ? 'Último mes' : 'Último año'}`, 20, 35);
    doc.text(`Métrica: ${metricConfig.label}`, 20, 45);
    doc.text(`Sensor: ${selectedSensor === 'all' ? 'Todos los sensores' : selectedSensor}`, 20, 55);
    doc.text(`Fecha de generación: ${new Date().toLocaleDateString('es-ES')}`, 20, 65);
    
    // Data table
    let yPosition = 80;
    doc.text('Fecha', 20, yPosition);
    doc.text('Valor', 60, yPosition);
    doc.text('Estado', 100, yPosition);
    
    yPosition += 10;
    currentData.forEach((item) => {
      const value = item[metricConfig.key as keyof typeof item] as number;
      const status = value > metricConfig.threshold ? 'Alto' : 'Normal';
      
      doc.text(item.date, 20, yPosition);
      doc.text(value.toString(), 60, yPosition);
      doc.text(status, 100, yPosition);
      yPosition += 10;
    });
    
    doc.save(`reporte-calidad-aire-${selectedDateRange}.pdf`);
  };

  const exportToCSV = () => {
    const currentData = getCurrentData();
    const headers = ['Fecha', 'CO₂ (ppm)', 'PM2.5 (μg/m³)', 'PM10 (μg/m³)', 'Humedad (%)', 'Temperatura (°C)'];
    
    const csvContent = [
      headers.join(','),
      ...currentData.map(row => [
        row.date,
        row.co2,
        row.pm25,
        row.pm10,
        row.humidity,
        row.temperature
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `reporte-calidad-aire-${selectedDateRange}.csv`;
    link.click();
  };

  const metricConfig = getMetricConfig();
  const currentData = getCurrentData();

  const averageValue = currentData.reduce((sum, item) => 
    sum + (item[metricConfig.key as keyof typeof item] as number), 0
  ) / currentData.length;

  const maxValue = Math.max(...currentData.map(item => 
    item[metricConfig.key as keyof typeof item] as number
  ));

  const minValue = Math.min(...currentData.map(item => 
    item[metricConfig.key as keyof typeof item] as number
  ));

  return (
    <div className="text-white p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2">Reportes Históricos</h1>
          <p className="text-gray-400">Analiza tendencias y patrones en la calidad del aire</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={exportToPDF}
            className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span>PDF</span>
          </button>
          
          <button
            onClick={exportToCSV}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>CSV</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <div className="flex items-center space-x-2 mb-4">
          <Filter className="w-5 h-5 text-gray-400" />
          <h3 className="text-lg font-semibold">Filtros</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Date Range Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Período de Tiempo
            </label>
            <select
              value={selectedDateRange}
              onChange={(e) => setSelectedDateRange(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="week">Última semana</option>
              <option value="month">Último mes</option>
              <option value="year">Último año</option>
            </select>
          </div>

          {/* Sensor Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Sensor
            </label>
            <select
              value={selectedSensor}
              onChange={(e) => setSelectedSensor(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">Todos los sensores</option>
              <option value="aula1">Aula 1 - Primer piso</option>
              <option value="aula2">Aula 2 - Segundo piso</option>
              <option value="laboratorio">Laboratorio</option>
              <option value="biblioteca">Biblioteca</option>
            </select>
          </div>

          {/* Metric Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Métrica
            </label>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="co2">CO₂</option>
              <option value="pm25">PM2.5</option>
              <option value="pm10">PM10</option>
              <option value="humidity">Humedad</option>
              <option value="temperature">Temperatura</option>
            </select>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Promedio</p>
              <p className="text-2xl font-bold">{averageValue.toFixed(1)}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Máximo</p>
              <p className="text-2xl font-bold">{maxValue}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-red-400" />
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Mínimo</p>
              <p className="text-2xl font-bold">{minValue}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-400 transform rotate-180" />
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Alertas</p>
              <p className="text-2xl font-bold">
                {currentData.filter(item => 
                  (item[metricConfig.key as keyof typeof item] as number) > metricConfig.threshold
                ).length}
              </p>
            </div>
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Main Chart */}
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Tendencia de {metricConfig.label}</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: metricConfig.color }}
              ></div>
              <span className="text-sm">{metricConfig.label}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm">Umbral de alerta</span>
            </div>
          </div>
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={currentData}>
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={metricConfig.color} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={metricConfig.color} stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Area
                type="monotone"
                dataKey={metricConfig.key}
                stroke={metricConfig.color}
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorGradient)"
              />
              {/* Threshold line */}
              <Line
                type="monotone"
                dataKey={() => metricConfig.threshold}
                stroke="#ef4444"
                strokeDasharray="5 5"
                strokeWidth={2}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Comparative Chart */}
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <h3 className="text-xl font-semibold mb-6">Comparativa de Todas las Métricas</h3>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={currentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="co2" stroke="#3b82f6" strokeWidth={2} name="CO₂ (ppm)" />
              <Line type="monotone" dataKey="pm25" stroke="#8b5cf6" strokeWidth={2} name="PM2.5 (μg/m³)" />
              <Line type="monotone" dataKey="pm10" stroke="#06b6d4" strokeWidth={2} name="PM10 (μg/m³)" />
              <Line type="monotone" dataKey="humidity" stroke="#10b981" strokeWidth={2} name="Humedad (%)" />
              <Line type="monotone" dataKey="temperature" stroke="#f59e0b" strokeWidth={2} name="Temperatura (°C)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Reports;