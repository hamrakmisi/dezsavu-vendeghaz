'use client'

import React, { useState } from 'react'
import Button from './Button'

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const itemClass = `
    navbar-item hover:scale-105
    transition-transform duration-200 cursor-pointer
  `
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  
  return (
    <div className="relative">
      <div className={`
          navbar navbar-glass navbar-sticky
          mt-2 rounded-lg w-[95%] mx-auto
          bg-[rgb(var(--gray-1)/0.1)] hover:bg-[rgb(var(--gray-1)/0.3)] transition-colors
        `}>
      <div className='navbar-start'>
        <a className={`${itemClass} font-bold sm:text-xl md:text-md uppercase`}>
          Dézsavű Vendégház
        </a>
      </div>
      
      {/* Desktop Navigation - hidden on mobile */}
      <div className='navbar-center hidden sm:flex'>
        <a className={itemClass}>
          Galléria
        </a>
        <a className={itemClass}>
          Rólunk
        </a>
        <a className={itemClass}>
          Elérhetőségek
        </a>
      </div>
      
      <div className={`navbar-end`}>
        {/* Desktop Book Now button - hidden on mobile */}
        <a className={`${itemClass} hidden sm:block`}>
          <Button text="Foglalás" variant="primary" className="uppercase font-bold"/>
        </a>
        
        {/* Hamburger menu button - visible only on mobile */}
        <button 
          className={`${itemClass} sm:hidden`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      
      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <div className="sm:hidden absolute top-full left-0 right-0 mt-1 mx-[2.5%] w-[95%] bg-[rgb(var(--gray-1)/0.9)] backdrop-blur-sm rounded-lg shadow-lg z-50">
          <div className="flex flex-col p-4 space-y-2">
            <a className={`${itemClass} text-center py-2`}>
              Galléria
            </a>
            <a className={`${itemClass} text-center py-2`}>
              Rólunk
            </a>
            <a className={`${itemClass} text-center py-2`}>
              Elérhetőségek
            </a>
            <div className="pt-2 border-t border-gray-300">
              <Button text="Foglalás" variant="primary" className="uppercase font-bold w-full"/>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  )
}
