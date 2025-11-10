'use client'

import { AIRepairModule, Anomaly } from '@/data/cubesatData'

interface AIRepairModuleDisplayProps {
  data: AIRepairModule
}

export function AIRepairModuleDisplay({ data }: AIRepairModuleDisplayProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'monitoring': return 'text-green-400'
      case 'repairing': return 'text-yellow-400'
      case 'idle': return 'text-gray-400'
      default: return 'text-gray-400'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-blue-400 bg-blue-400/20'
      case 'medium': return 'text-yellow-400 bg-yellow-400/20'
      case 'high': return 'text-orange-400 bg-orange-400/20'
      case 'critical': return 'text-red-400 bg-red-400/20'
      default: return 'text-gray-400 bg-gray-400/20'
    }
  }

  const getConfidenceColor = (score: number) => {
    if (score > 0.9) return 'text-green-400'
    if (score > 0.7) return 'text-yellow-400'
    return 'text-red-400'
  }

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
    if (seconds < 60) return `${seconds}s`
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`
    return `${Math.floor(seconds / 86400)}d`
  }

  return (
    <div className="glass-panel p-6">
      <h3 className="text-lg font-semibold mb-4 text-white">AI Self-Repair Module</h3>
      
      <div className="space-y-4">
        {/* AI Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-300">AI Status</span>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${getStatusColor(data.aiStatus).replace('text-', 'bg-')} animate-pulse`} />
            <span className={`font-mono text-sm uppercase tracking-wider ${getStatusColor(data.aiStatus)}`}>
              {data.aiStatus}
            </span>
          </div>
        </div>

        {/* Confidence Score */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-300">Confidence Score</span>
          <span className={`font-mono text-lg ${getConfidenceColor(data.confidenceScore)}`}>
            {(data.confidenceScore * 100).toFixed(1)}%
          </span>
        </div>

        {/* Confidence Bar */}
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${getConfidenceColor(data.confidenceScore).replace('text-', 'bg-')}`}
            style={{ width: `${data.confidenceScore * 100}%` }}
          />
        </div>

        {/* Recent Anomalies */}
        <div className="pt-2 border-t border-gray-600">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-300">Recent Anomalies</span>
            <span className="text-xs text-gray-400">
              {data.anomaliesDetected.length} detected
            </span>
          </div>
          
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {data.anomaliesDetected.slice(0, 5).map((anomaly, index) => (
              <div key={index} className="bg-gray-800/50 rounded-lg p-3 text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white font-medium">{anomaly.system}</span>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded text-xs ${getSeverityColor(anomaly.severity)}`}>
                      {anomaly.severity.toUpperCase()}
                    </span>
                    <span className="text-gray-400">{formatTimeAgo(anomaly.time)}</span>
                  </div>
                </div>
                <p className="text-gray-300 text-xs">{anomaly.actionTaken}</p>
              </div>
            ))}
            
            {data.anomaliesDetected.length === 0 && (
              <div className="text-center text-gray-400 py-4">
                No recent anomalies detected
              </div>
            )}
          </div>
        </div>

        {/* System Health */}
        <div className="pt-2 border-t border-gray-600">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-300">System Health</span>
            <span className={`text-sm font-medium ${
              data.confidenceScore > 0.9 ? 'text-green-400' :
              data.confidenceScore > 0.7 ? 'text-yellow-400' : 'text-red-400'
            }`}>
              {data.confidenceScore > 0.9 ? 'OPTIMAL' :
               data.confidenceScore > 0.7 ? 'GOOD' : 'DEGRADED'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}