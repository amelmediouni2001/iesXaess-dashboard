'use client'

interface Activity {
  id: string
  source: string
  destination: string
  date: string
  status: 'on-air' | 'taking-off' | 'cancelled' | 'arrived'
}

interface ActivitiesTableProps {
  activities: Activity[]
}

export function ActivitiesTable({ activities }: ActivitiesTableProps) {
  return (
    <div className="glass-panel p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Activities</h2>
        <input
          type="search"
          placeholder="Search..."
          className="rounded-md bg-secondary/50 px-3 py-1 text-sm"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10 text-left">
              <th className="pb-2 text-sm font-medium">Cargo ID</th>
              <th className="pb-2 text-sm font-medium">Destination</th>
              <th className="pb-2 text-sm font-medium">Date</th>
              <th className="pb-2 text-sm font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity.id} className="border-b border-white/5">
                <td className="py-3 text-sm">{activity.id}</td>
                <td className="py-3 text-sm">{activity.destination}</td>
                <td className="py-3 text-sm">{activity.date}</td>
                <td className="py-3 text-sm">
                  <span
                    className={`status-badge ${
                      activity.status === 'on-air'
                        ? 'status-badge-success'
                        : activity.status === 'cancelled'
                        ? 'status-badge-danger'
                        : 'status-badge-warning'
                    }`}
                  >
                    {activity.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}