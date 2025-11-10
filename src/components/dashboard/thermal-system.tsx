'use client'

import { ThermalSystem } from '@/data/cubesatData'

interface ThermalSystemDisplayProps {
  data: ThermalSystem
}

export function ThermalSystemDisplay({ data }: ThermalSystemDisplayProps) {
  const getTempColor = (temp: number, system: 'cpu' | 'battery' | 'internal') => {
    const thresholds = {
      cpu: { warning: 50, critical: 60 },
      battery: { warning: 23, critical: 28 },
      internal: { warning: 25, critical: 30 }
    }

    const threshold = thresholds[system]
    if (temp > threshold.critical) return 'text-red-400'
    if (temp > threshold.warning) return 'text-yellow-400'
    return 'text-green-400'
  }

  const getTempStatus = (temp: number, system: 'cpu' | 'battery' | 'internal') => {
    const thresholds = {
      cpu: { warning: 50, critical: 60 },
      battery: { warning: 23, critical: 28 },
      internal: { warning: 25, critical: 30 }
    }

    const threshold = thresholds[system]
    if (temp > threshold.critical) return 'CRITICAL'
    if (temp > threshold.warning) return 'WARNING'
    return 'NOMINAL'
  }

  return (
    <div className="glass-panel p-6">
      <h3 className="text-lg font-semibold mb-4 text-white">Thermal System</h3>
      
      <div className="space-y-4">
        {/* CPU Temperature */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm text-gray-300">CPU Temperature</span>
            <span className={`text-xs ${getTempColor(data.cpuTemp, 'cpu')}`}>
              {getTempStatus(data.cpuTemp, 'cpu')}
            </span>
          </div>
          <span className={`font-mono text-lg ${getTempColor(data.cpuTemp, 'cpu')}`}>
            {data.cpuTemp.toFixed(1)}°C
          </span>
        </div>

        {/* Temperature Bar for CPU */}
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${getTempColor(data.cpuTemp, 'cpu').replace('text-', 'bg-')}`}
            style={{ width: `${Math.min(100, (data.cpuTemp / 70) * 100)}%` }}
          />
        </div>

        {/* Battery Temperature */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm text-gray-300">Battery Temperature</span>
            <span className={`text-xs ${getTempColor(data.batteryTemp, 'battery')}`}>
              {getTempStatus(data.batteryTemp, 'battery')}
            </span>
          </div>
          <span className={`font-mono text-lg ${getTempColor(data.batteryTemp, 'battery')}`}>
            {data.batteryTemp.toFixed(1)}°C
          </span>
        </div>

        {/* Temperature Bar for Battery */}
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${getTempColor(data.batteryTemp, 'battery').replace('text-', 'bg-')}`}
            style={{ width: `${Math.min(100, (data.batteryTemp / 35) * 100)}%` }}
          />
        </div>

        {/* Internal Temperature */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm text-gray-300">Internal Temperature</span>
            <span className={`text-xs ${getTempColor(data.internalTemp, 'internal')}`}>
              {getTempStatus(data.internalTemp, 'internal')}
            </span>
          </div>
          <span className={`font-mono text-lg ${getTempColor(data.internalTemp, 'internal')}`}>
            {data.internalTemp.toFixed(1)}°C
          </span>
        </div>

        {/* Temperature Bar for Internal */}
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${getTempColor(data.internalTemp, 'internal').replace('text-', 'bg-')}`}
            style={{ width: `${Math.min(100, (data.internalTemp / 35) * 100)}%` }}
          />
        </div>

        {/* Average Temperature */}
        <div className="pt-2 border-t border-gray-600">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-300">Average Temp</span>
            <span className="font-mono text-lg text-blue-400">
              {((data.cpuTemp + data.batteryTemp + data.internalTemp) / 3).toFixed(1)}°C
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}