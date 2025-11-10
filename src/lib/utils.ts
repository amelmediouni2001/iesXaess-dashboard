// Utility functions for the CubeSat dashboard

import {
  STATUS_COLORS,
  BG_STATUS_COLORS,
  THERMAL_THRESHOLDS,
  SIGNAL_THRESHOLDS,
  BATTERY_THRESHOLDS,
  SEVERITY_COLORS,
  MISSION_TIME_FORMAT,
} from './constants'
import type { SeverityLevel } from '@/types'

/**
 * Clamps a number between min and max values
 */
export const clamp = (value: number, min: number, max: number): number =>
  Math.max(min, Math.min(max, value))

/**
 * Generates a random number between min and max
 */
export const randomBetween = (min: number, max: number): number =>
  Math.random() * (max - min) + min

/**
 * Returns a random element from an array
 */
export const randomChoice = <T>(array: T[]): T =>
  array[Math.floor(Math.random() * array.length)]

/**
 * Gets color class based on battery level
 */
export const getBatteryColor = (level: number): string => {
  if (level > BATTERY_THRESHOLDS.high) return STATUS_COLORS.success
  if (level > BATTERY_THRESHOLDS.medium) return STATUS_COLORS.warning
  return STATUS_COLORS.danger
}

/**
 * Gets color class based on temperature and system type
 */
export const getTempColor = (
  temp: number,
  system: keyof typeof THERMAL_THRESHOLDS
): string => {
  const threshold = THERMAL_THRESHOLDS[system]
  if (temp > threshold.critical) return STATUS_COLORS.danger
  if (temp > threshold.warning) return STATUS_COLORS.warning
  return STATUS_COLORS.success
}

/**
 * Gets temperature status text
 */
export const getTempStatus = (
  temp: number,
  system: keyof typeof THERMAL_THRESHOLDS
): string => {
  const threshold = THERMAL_THRESHOLDS[system]
  if (temp > threshold.critical) return 'CRITICAL'
  if (temp > threshold.warning) return 'WARNING'
  return 'NOMINAL'
}

/**
 * Gets color class based on signal strength
 */
export const getSignalColor = (strength: number): string => {
  if (strength > SIGNAL_THRESHOLDS.good) return STATUS_COLORS.success
  if (strength > SIGNAL_THRESHOLDS.fair) return STATUS_COLORS.warning
  return STATUS_COLORS.danger
}

/**
 * Gets signal quality text
 */
export const getSignalQuality = (strength: number): string => {
  if (strength > SIGNAL_THRESHOLDS.good) return 'Excellent'
  if (strength > SIGNAL_THRESHOLDS.fair) return 'Good'
  if (strength > SIGNAL_THRESHOLDS.poor) return 'Fair'
  return 'Poor'
}

/**
 * Converts signal strength to visual bars (0-5)
 */
export const getSignalBars = (strength: number): number => {
  if (strength > SIGNAL_THRESHOLDS.excellent) return 5
  if (strength > SIGNAL_THRESHOLDS.good) return 4
  if (strength > SIGNAL_THRESHOLDS.fair) return 3
  if (strength > SIGNAL_THRESHOLDS.poor) return 2
  if (strength > -100) return 1
  return 0
}

/**
 * Gets color class for connection status
 */
export const getStatusColor = (status: 'connected' | 'lost' | string): string =>
  status === 'connected' ? STATUS_COLORS.success : STATUS_COLORS.danger

/**
 * Gets color class for charging status
 */
export const getChargingStatusColor = (status: string): string => {
  switch (status) {
    case 'charging':
      return STATUS_COLORS.success
    case 'discharging':
      return STATUS_COLORS.danger
    default:
      return STATUS_COLORS.neutral
  }
}

/**
 * Gets color class for severity level
 */
export const getSeverityColor = (severity: SeverityLevel): string =>
  SEVERITY_COLORS[severity] || SEVERITY_COLORS.low

/**
 * Gets color class for confidence score
 */
export const getConfidenceColor = (score: number): string => {
  if (score > 0.9) return STATUS_COLORS.success
  if (score > 0.7) return STATUS_COLORS.warning
  return STATUS_COLORS.danger
}

/**
 * Gets color class for AI status
 */
export const getAIStatusColor = (status: string): string => {
  switch (status) {
    case 'monitoring':
      return STATUS_COLORS.success
    case 'repairing':
      return STATUS_COLORS.warning
    case 'idle':
      return STATUS_COLORS.neutral
    default:
      return STATUS_COLORS.neutral
  }
}

/**
 * Gets color class for repair rate
 */
export const getRepairRateColor = (rate: number): string => {
  if (rate > 90) return STATUS_COLORS.success
  if (rate > 75) return STATUS_COLORS.warning
  return STATUS_COLORS.danger
}

/**
 * Formats mission time from hours to human-readable string
 */
export const formatMissionTime = (hours: number): string => {
  const days = Math.floor(hours / MISSION_TIME_FORMAT.hoursPerDay)
  const remainingHours = Math.floor(hours % MISSION_TIME_FORMAT.hoursPerDay)
  const minutes = Math.floor((hours % 1) * MISSION_TIME_FORMAT.minutesPerHour)

  if (days > 0) {
    return `${days}d ${remainingHours}h ${minutes}m`
  } else if (remainingHours > 0) {
    return `${remainingHours}h ${minutes}m`
  } else {
    return `${minutes}m`
  }
}

/**
 * Formats time since a date
 */
export const formatTimeSince = (date: Date): string => {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
  if (seconds < 60) return `${seconds}s ago`
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  return `${Math.floor(seconds / 86400)}d ago`
}

/**
 * Formats time ago in short format
 */
export const formatTimeAgo = (date: Date): string => {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
  if (seconds < 60) return `${seconds}s`
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`
  return `${Math.floor(seconds / 86400)}d`
}

/**
 * Calculates repair success rate percentage
 */
export const calculateRepairRate = (
  repaired: number,
  total: number
): number => {
  if (total === 0) return 100
  return (repaired / total) * 100
}

/**
 * Converts text color class to background color class
 */
export const textColorToBg = (textColor: string): string =>
  textColor.replace('text-', 'bg-')

/**
 * Formats a number with specified decimal places
 */
export const formatNumber = (
  value: number,
  decimals: number = 1
): string => value.toFixed(decimals)

/**
 * Debounce function for performance optimization
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}
