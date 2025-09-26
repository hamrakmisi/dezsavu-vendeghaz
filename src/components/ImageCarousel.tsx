'use client'

import React, { useState, useEffect, ReactNode } from 'react'

export interface ImageCarouselProps {
  images: string[]
  children?: ReactNode
  className?: string
  interval?: number
  height?: string
}

export default function ImageCarousel({ 
  images, 
  children, 
  className = '', 
  interval = 5000,
  height = 'h-96'
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      )
    }, interval)

    return () => clearInterval(timer)
  }, [images.length, interval])

  if (!images || images.length === 0) {
    return (
      <div className={`${height} bg-gray-200 flex items-center justify-center ${className}`}>
        <p className="text-gray-500">No images to display</p>
      </div>
    )
  }

  return (
    <div className={`relative ${height} overflow-hidden rounded-lg ${className}`}>
      {/* Image Container */}
      <div 
        className="flex transition-transform duration-1000 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="w-full h-full flex-shrink-0 relative"
          >
            <img
              src={image}
              alt={`Carousel image ${index + 1}`}
              className="w-full h-full object-cover"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </div>

      {/* Overlay Content */}
      {children && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          {children}
        </div>
      )}

      {/* Dots Indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-white shadow-lg' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
