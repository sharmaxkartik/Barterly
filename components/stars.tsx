"use client"

import * as React from "react"

export function Stars({ count = 100 }: { count?: number }) {
  const [stars, setStars] = React.useState(
    Array.from({ length: count }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1, // Random size between 1px and 3px
      opacity: Math.random() * 0.8 + 0.2, // Random opacity between 0.2 and 1
      blinkDelay: Math.random() * 5, // Random blink delay
      color: Math.random() > 0.9 ? "purple" : Math.random() > 0.8 ? "blue" : "white", // Add some colored stars
    })),
  )

  React.useEffect(() => {
    const interval = setInterval(() => {
      setStars((prevStars) =>
        prevStars.map((star) => ({
          ...star,
          x: (star.x + Math.random() * 0.1 - 0.05 + 100) % 100, // Even slower horizontal movement
          y: (star.y + Math.random() * 0.1 - 0.05 + 100) % 100, // Even slower vertical movement
          opacity: 0.2 + Math.abs(Math.sin(Date.now() / 1000 + star.blinkDelay)) * 0.8, // Smooth blinking effect
        })),
      )
    }, 2000) // Update every 2 seconds for better performance

    return () => clearInterval(interval) // Cleanup on unmount
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map((star, index) => (
        <div
          key={index}
          className="absolute rounded-full transition-all duration-1000"
          style={{
            top: `${star.y}%`,
            left: `${star.x}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            backgroundColor: star.color,
            boxShadow:
              star.size > 2
                ? `0 0 ${star.size * 2}px ${
                    star.color === "purple"
                      ? "rgba(149, 76, 233, 0.8)"
                      : star.color === "blue"
                        ? "rgba(59, 130, 246, 0.8)"
                        : "rgba(255, 255, 255, 0.5)"
                  }`
                : "none",
          }}
        />
      ))}
    </div>
  )
}
