'use client'

import { useEffect } from 'react'

export default function UserLocation({ onLocation }: { onLocation: (loc: any) => void }) {
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          onLocation({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          })
        },
        (err) => console.error('Location error:', err)
      )
    }
  }, [onLocation])

  return null
}