'use client'

import { CommunicationSystem } from '@/data/cubesatData'

interface CommunicationSystemDisplayProps {
  data: CommunicationSystem
}

export function CommunicationSystemDisplay({ data }: CommunicationSystemDisplayProps) {
  const getSignalColor = (strength: number) => {
    if (strength > -70) return 'text-green-400'
    if (strength > -80) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getStatusColor = (status: string) => {
    return status === 'connected' ? 'text-green-400' : 'text-red-400'
  }

  const getSignalBars = (strength: number) => {
    // Convert dBm to signal bars (0-5)
    if (strength > -60) return 5
    if (strength > -70) return 4
    if (strength > -80) return 3
    if (strength > -90) return 2
    if (strength > -100) return 1
    return 0
  }

  const formatTimeSince = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
    if (seconds < 60) return `${seconds}s ago`
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    return `${Math.floor(seconds / 86400)}d ago`
  }

  return (
    <div className="glass-panel p-6">
      <h3 className="text-lg font-semibold mb-4 text-white">Communication System</h3>
      
      <div className="space-y-4">
        {/* Signal Strength */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-300">Signal Strength</span>
          <div className="flex items-center space-x-2">
            <span className={`font-mono text-lg ${getSignalColor(data.signalStrength)}`}>
              {data.signalStrength} dBm
            </span>
            
            {/* Signal Bars */}
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((bar) => (
                <div
                  key={bar}
                  className={`w-1 h-3 rounded ${
                    bar <= getSignalBars(data.signalStrength) 
                      ? getSignalColor(data.signalStrength).replace('text-', 'bg-')
                      : 'bg-gray-600'
                  }`}
                  style={{ height: `${bar * 3 + 6}px` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Uplink Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-300">Uplink Status</span>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${getStatusColor(data.uplinkStatus).replace('text-', 'bg-')}`} />
            <span className={`font-mono text-sm uppercase tracking-wider ${getStatusColor(data.uplinkStatus)}`}>
              {data.uplinkStatus}
            </span>
          </div>
        </div>

        {/* Downlink Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-300">Downlink Status</span>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${getStatusColor(data.downlinkStatus).replace('text-', 'bg-')}`} />
            <span className={`font-mono text-sm uppercase tracking-wider ${getStatusColor(data.downlinkStatus)}`}>
              {data.downlinkStatus}
            </span>
          </div>
        </div>

        {/* Last Contact */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-300">Last Contact</span>
          <span className="font-mono text-sm text-blue-400">
            {formatTimeSince(data.lastContact)}
          </span>
        </div>

        {/* Connection Quality */}
        <div className="pt-2 border-t border-gray-600">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">Connection Quality</span>
            <span className={`text-sm ${getSignalColor(data.signalStrength)}`}>
              {data.signalStrength > -70 ? 'Excellent' :
               data.signalStrength > -80 ? 'Good' :
               data.signalStrength > -90 ? 'Fair' : 'Poor'}
            </span>
          </div>
          
          {/* Quality Bar */}
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${getSignalColor(data.signalStrength).replace('text-', 'bg-')}`}
              style={{ width: `${Math.max(0, Math.min(100, (data.signalStrength + 120) * 100 / 60))}%` }}
            />
          </div>
        </div>

        {/* Link Status Summary */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-300">Overall Status</span>
          <span className={`font-mono text-sm ${
            data.uplinkStatus === 'connected' && data.downlinkStatus === 'connected' 
              ? 'text-green-400' : 'text-yellow-400'
          }`}>
            {data.uplinkStatus === 'connected' && data.downlinkStatus === 'connected' 
              ? 'OPERATIONAL' : 'DEGRADED'}
          </span>
        </div>
      </div>
    </div>
  )
}