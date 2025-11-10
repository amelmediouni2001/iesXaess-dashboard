'use client'

import { useEffect, useState } from 'react'
import { PowerSystem } from '@/data/cubesatData'

interface PowerSystemDisplayProps {
  data: PowerSystem
}

export function PowerSystemDisplay({ data }: PowerSystemDisplayProps) {
  const getBatteryColor = (level: number) => {
    if (level > 70) return 'text-green-400'
    if (level > 30) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getChargingStatusColor = (status: string) => {
    switch (status) {
      case 'charging': return 'text-green-400'
      case 'discharging': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <div className="glass-panel p-6">
      <h3 className="text-lg font-semibold mb-4 text-white">Power System (EPS)</h3>
      
      <div className="space-y-4">
        {/* Battery Level */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-300">Battery Level</span>
          <span className={`font-mono text-lg ${getBatteryColor(data.batteryLevel)}`}>
            {data.batteryLevel.toFixed(1)}%
          </span>
        </div>
        
        {/* Battery Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${
              data.batteryLevel > 70 ? 'bg-green-400' :
              data.batteryLevel > 30 ? 'bg-yellow-400' : 'bg-red-400'
            }`}
            style={{ width: `${data.batteryLevel}%` }}
          />
        </div>

        {/* Solar Panel Output */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-300">Solar Output</span>
          <span className="font-mono text-lg text-blue-400">
            {data.solarPanelOutput.toFixed(1)}W
          </span>
        </div>

        {/* Power Consumption */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-300">Consumption</span>
          <span className="font-mono text-lg text-orange-400">
            {data.powerConsumption.toFixed(1)}W
          </span>
        </div>

        {/* Charging Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-300">Status</span>
          <span className={`font-mono text-sm uppercase tracking-wider ${getChargingStatusColor(data.chargingStatus)}`}>
            {data.chargingStatus}
          </span>
        </div>

        {/* Power Balance */}
        <div className="pt-2 border-t border-gray-600">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-300">Net Power</span>
            <span className={`font-mono text-lg ${
              (data.solarPanelOutput - data.powerConsumption) > 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {(data.solarPanelOutput - data.powerConsumption).toFixed(1)}W
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}