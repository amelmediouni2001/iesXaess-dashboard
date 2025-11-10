'use client'

import { useState, useEffect } from 'react'
import { WorldMap } from '@/components/dashboard/world-map'
import { SatisfactionRate } from '@/components/dashboard/satisfaction-rate'
import { ActivitiesTable } from '@/components/dashboard/activities-table'
import { PowerSystemDisplay } from '@/components/dashboard/power-system'
import { ThermalSystemDisplay } from '@/components/dashboard/thermal-system'
import { CommunicationSystemDisplay } from '@/components/dashboard/communication-system'
import { AIRepairModuleDisplay } from '@/components/dashboard/ai-repair-module'
import { MissionSummaryDisplay } from '@/components/dashboard/mission-summary'
import { getCubeSatTelemetry, generateTelemetry, startTelemetryUpdates, stopTelemetryUpdates, CubeSatTelemetry } from '@/data/cubesatData'

const mockActivities = [
  {
    id: 'AB 707',
    source: 'JP',
    destination: 'IN',
    date: 'May 6, 2025',
    status: 'on-air' as const,
  },
  {
    id: 'JK 127',
    source: 'US',
    destination: 'BN',
    date: 'May 6, 2025',
    status: 'taking-off' as const,
  },
  {
    id: 'NA 235',
    source: 'EU',
    destination: 'US',
    date: 'May 6, 2025',
    status: 'cancelled' as const,
  },
]

export default function DashboardPage() {
  const [temperatures, setTemperatures] = useState<number[]>([24, 24, 24, 24]);
  const [telemetryData, setTelemetryData] = useState<CubeSatTelemetry>(getCubeSatTelemetry());

  useEffect(() => {
    // Generate random temperatures only on the client side
    setTemperatures([15, 16, 17, 18].map(() => 24 + Math.round(Math.random() * 5)));
    
    // Start real-time telemetry updates
    const updateInterval = startTelemetryUpdates((newData) => {
      setTelemetryData(newData);
    });

    return () => {
      stopTelemetryUpdates();
    };
  }, []);
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Worldwide Perspective</h1>
          <button className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-white">
            Track Live
          </button>
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left Column - Main Visualization */}
          <div className="lg:col-span-8 space-y-6">
            {/* World Map */}
            <div className="glass-panel p-6">
              <WorldMap />
            </div>

            {/* Activities Table */}
            <ActivitiesTable activities={mockActivities} />
            
            {/* Telemetry Systems Row */}
            <div className="grid gap-6 md:grid-cols-2">
              <PowerSystemDisplay data={telemetryData.powerSystem} />
              <ThermalSystemDisplay data={telemetryData.thermalSystem} />
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              <CommunicationSystemDisplay data={telemetryData.communicationSystem} />
              <AIRepairModuleDisplay data={telemetryData.aiRepairModule} />
            </div>
          </div>

          {/* Right Column - Stats and Summary */}
          <div className="lg:col-span-4 space-y-6">
            {/* Mission Summary */}
            <MissionSummaryDisplay data={telemetryData.missionSummary} />
            
            {/* Original Stats */}
            <div className="space-y-4">
              <SatisfactionRate
                rate={Math.round(telemetryData.powerSystem.batteryLevel)}
                title="Battery Level"
                subtitle="Current charge"
              />
              <SatisfactionRate
                rate={Math.round(telemetryData.aiRepairModule.confidenceScore * 100)}
                title="AI Confidence"
                subtitle="System health"
              />
              <SatisfactionRate
                rate={Math.round((telemetryData.missionSummary.repairedAnomalies / Math.max(telemetryData.missionSummary.totalAnomalies, 1)) * 100)}
                title="Repair Success"
                subtitle="Auto-fixes"
              />
            </div>

            {/* Weather Status */}
            <div className="glass-panel p-6">
              <h2 className="mb-4 text-lg font-semibold">Orbital Weather</h2>
              <div className="grid grid-cols-2 gap-4">
                {[15, 16, 17, 18].map((hour, index) => (
                  <div
                    key={hour}
                    className="flex flex-col items-center space-y-2 rounded-lg bg-secondary/50 p-4"
                  >
                    <span className="text-sm text-muted-foreground">
                      {hour}:00
                    </span>
                    <span className="text-2xl font-semibold">
                      {temperatures[index]}°C
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Live Data Status */}
            <div className="glass-panel p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Last Update:</span>
                <span className="text-green-400 font-mono">
                  {telemetryData.lastUpdated.toLocaleTimeString()}
                </span>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-gray-400">Live telemetry active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
