// Application-wide constants and configuration

// Telemetry update intervals (milliseconds)
export const TELEMETRY_UPDATE_INTERVAL = 3000
export const ANIMATION_DURATION = 500

// Thermal thresholds (°C)
export const THERMAL_THRESHOLDS = {
  cpu: { warning: 50, critical: 60 },
  battery: { warning: 23, critical: 28 },
  internal: { warning: 25, critical: 30 },
} as const

// Signal strength thresholds (dBm)
export const SIGNAL_THRESHOLDS = {
  excellent: -60,
  good: -70,
  fair: -80,
  poor: -90,
} as const

// Battery level thresholds (%)
export const BATTERY_THRESHOLDS = {
  high: 70,
  medium: 30,
  low: 0,
} as const

// Color mappings
export const STATUS_COLORS = {
  success: 'text-green-400',
  warning: 'text-yellow-400',
  danger: 'text-red-400',
  info: 'text-blue-400',
  neutral: 'text-gray-400',
} as const

export const BG_STATUS_COLORS = {
  success: 'bg-green-400',
  warning: 'bg-yellow-400',
  danger: 'bg-red-400',
  info: 'bg-blue-400',
  neutral: 'bg-gray-400',
} as const

// Anomaly severity colors
export const SEVERITY_COLORS = {
  low: 'text-blue-400 bg-blue-400/20',
  medium: 'text-yellow-400 bg-yellow-400/20',
  high: 'text-orange-400 bg-orange-400/20',
  critical: 'text-red-400 bg-red-400/20',
} as const

// Activity status colors
export const ACTIVITY_STATUS_COLORS = {
  'on-air': 'status-badge-success',
  'taking-off': 'status-badge-warning',
  cancelled: 'status-badge-danger',
  arrived: 'status-badge-success',
} as const

// Globe configuration
export const GLOBE_CONFIG = {
  imageUrl: '//unpkg.com/three-globe/example/img/earth-night.jpg',
  backgroundColor: 'rgba(0,0,0,0)',
  atmosphereColor: '#3a228a',
  atmosphereAltitude: 0.25,
  autoRotateSpeed: 0.5,
} as const

// Animation configuration
export const ANIMATION_CONFIG = {
  arcAnimateTime: 1500,
  floatingDuration: 6000,
  glowPulseDuration: 2000,
} as const

// Display configuration
export const DISPLAY_CONFIG = {
  maxAnomaliesDisplayed: 10,
  maxRecentAnomalies: 5,
  temperatureDecimalPlaces: 1,
  percentageDecimalPlaces: 1,
  powerDecimalPlaces: 1,
} as const

// Mission time format
export const MISSION_TIME_FORMAT = {
  hoursPerDay: 24,
  minutesPerHour: 60,
  orbitalPeriod: 1.5, // hours
} as const

// Telemetry data generation ranges
export const TELEMETRY_RANGES = {
  battery: { min: 0, max: 100, delta: { min: -2, max: 3 } },
  solar: { min: 10, max: 15, variation: { min: 0.8, max: 1.2 } },
  power: { min: 6, max: 12 },
  cpuTemp: { min: 35, max: 55 },
  batteryTemp: { min: 15, max: 25 },
  internalTemp: { min: 18, max: 28 },
  signalStrength: { min: -85, max: -65 },
  confidence: { min: 0.85, max: 0.98 },
  orbitalCycle: 5400, // seconds (90 minutes)
} as const

// Probability constants
export const PROBABILITIES = {
  anomalyGeneration: 0.05,
  uplinkLoss: 0.05,
  downlinkLoss: 0.03,
  repairCompletion: 0.3,
} as const
