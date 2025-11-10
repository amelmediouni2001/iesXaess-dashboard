'use client'

import { MissionSummary } from '@/data/cubesatData'

interface MissionSummaryDisplayProps {
  data: MissionSummary
}

export function MissionSummaryDisplay({ data }: MissionSummaryDisplayProps) {
  const formatMissionTime = (hours: number) => {
    const days = Math.floor(hours / 24)
    const remainingHours = Math.floor(hours % 24)
    const minutes = Math.floor((hours % 1) * 60)
    
    if (days > 0) {
      return `${days}d ${remainingHours}h ${minutes}m`
    } else if (remainingHours > 0) {
      return `${remainingHours}h ${minutes}m`
    } else {
      return `${minutes}m`
    }
  }

  const getRepairRate = () => {
    if (data.totalAnomalies === 0) return 100
    return (data.repairedAnomalies / data.totalAnomalies) * 100
  }

  const getRepairRateColor = (rate: number) => {
    if (rate > 90) return 'text-green-400'
    if (rate > 75) return 'text-yellow-400'
    return 'text-red-400'
  }

  const repairRate = getRepairRate()

  return (
    <div className="glass-panel p-6">
      <h3 className="text-lg font-semibold mb-4 text-white">Mission Summary</h3>
      
      <div className="space-y-4">
        {/* Mission Time */}
        <div className="text-center">
          <div className="text-3xl font-mono text-blue-400 mb-1">
            {formatMissionTime(data.missionTime)}
          </div>
          <div className="text-sm text-gray-400">Mission Duration</div>
        </div>

        {/* Mission Stats Grid */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-600">
          {/* Total Anomalies */}
          <div className="text-center">
            <div className="text-2xl font-mono text-orange-400 mb-1">
              {data.totalAnomalies}
            </div>
            <div className="text-xs text-gray-400">Total Anomalies</div>
          </div>

          {/* Repaired Anomalies */}
          <div className="text-center">
            <div className="text-2xl font-mono text-green-400 mb-1">
              {data.repairedAnomalies}
            </div>
            <div className="text-xs text-gray-400">Repaired</div>
          </div>
        </div>

        {/* Repair Success Rate */}
        <div className="pt-4 border-t border-gray-600">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">Repair Success Rate</span>
            <span className={`font-mono text-lg ${getRepairRateColor(repairRate)}`}>
              {repairRate.toFixed(1)}%
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-500 ${getRepairRateColor(repairRate).replace('text-', 'bg-')}`}
              style={{ width: `${repairRate}%` }}
            />
          </div>
        </div>

        {/* Mission Statistics */}
        <div className="pt-4 border-t border-gray-600 space-y-3">
          {/* Orbital Periods */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-300">Orbital Periods</span>
            <span className="font-mono text-sm text-blue-400">
              {Math.floor(data.missionTime / 1.5)}
            </span>
          </div>

          {/* Earth Rotations */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-300">Earth Rotations</span>
            <span className="font-mono text-sm text-blue-400">
              {Math.floor(data.missionTime / 24)}
            </span>
          </div>

          {/* System Uptime */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-300">System Uptime</span>
            <span className="font-mono text-sm text-green-400">
              {((data.repairedAnomalies / Math.max(data.totalAnomalies, 1)) * 100).toFixed(1)}%
            </span>
          </div>
        </div>

        {/* Mission Status */}
        <div className="pt-4 border-t border-gray-600">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-300">Mission Status</span>
            <span className={`text-sm font-medium ${
              repairRate > 95 ? 'text-green-400' :
              repairRate > 85 ? 'text-yellow-400' : 'text-red-400'
            }`}>
              {repairRate > 95 ? 'EXCELLENT' :
               repairRate > 85 ? 'GOOD' : 'NEEDS ATTENTION'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}