'use client'

import { useEffect, useRef, forwardRef } from 'react'
import dynamic from 'next/dynamic'
import type GlobeType from 'react-globe.gl'  // Static type import (no runtime cost)

const Globe = dynamic(
  () => import('react-globe.gl'),
  {
    ssr: false,
    loading: () => <div className="h-[500px] w-full bg-gray-900 animate-pulse" />  // Optional: Simple loading placeholder
  }
) as typeof GlobeType  // Type assertion to restore full typing, including props and ref support

interface WorldMapProps {
  className?: string
}

const WorldMapInner = forwardRef<HTMLDivElement, WorldMapProps>(function WorldMap({ className }, ref) {
  const globeRef = useRef<any | null>(null)

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true
      globeRef.current.controls().autoRotateSpeed = 0.5
    }
  }, [])

  // Satellite trajectory data
  const trajectoriesData = [{
    startLat: 0,
    startLng: -100,
    endLat: 30,
    endLng: 0,
    color: 'rgba(255, 255, 0, 0.6)',
    dashLength: 1,
    dashGap: 0.5
  }]

  return (
    <div
      ref={ref}
      className={`h-[500px] w-full flex items-center justify-center ${className}`}
    >
      <div className="flex items-center justify-center h-[400px] w-[400px]">
        <Globe
          ref={globeRef}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          backgroundColor="rgba(0,0,0,0)"
          arcColor="color"
          arcsData={trajectoriesData}
          arcDashLength="dashLength"
          arcDashGap="dashGap"
          arcDashAnimateTime={1500}
          atmosphereColor="#3a228a"
          atmosphereAltitude={0.25}
        />
      </div>
    </div>
  )
})

export const WorldMap = forwardRef<HTMLDivElement, WorldMapProps>((props, ref) => <WorldMapInner {...props} ref={ref} />)