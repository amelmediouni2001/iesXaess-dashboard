'use client'

import { useState, useEffect } from 'react'
import { WorldMap } from '@/components/dashboard/world-map'
import { SatisfactionRate } from '@/components/dashboard/satisfaction-rate'
import { ActivitiesTable } from '@/components/dashboard/activities-table'

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

  useEffect(() => {
    // Generate random temperatures only on the client side
    setTemperatures([15, 16, 17, 18].map(() => 24 + Math.round(Math.random() * 5)));
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
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* World Map */}
            <div className="glass-panel p-6">
              <WorldMap />
            </div>

            {/* Activities Table */}
            <ActivitiesTable activities={mockActivities} />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4 space-y-8">
            {/* Stats */}
            <div className="space-y-4">
              <SatisfactionRate
                rate={85}
                title="Satisfaction Rate"
                subtitle="From all projects"
              />
              <SatisfactionRate
                rate={32}
                title="Monthly Delivered"
                subtitle="Last 30 days"
              />
              <SatisfactionRate
                rate={42}
                title="Yearly Progress"
                subtitle="This year"
              />
            </div>

            {/* Weather Status */}
            <div className="glass-panel p-6">
              <h2 className="mb-4 text-lg font-semibold">Weather Status</h2>
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
          </div>
        </div>
      </div>
    </div>
  );
}
