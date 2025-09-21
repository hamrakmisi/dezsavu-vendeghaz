import React from 'react'

export default function Header() {
  return (
    <div className="navbar navbar-glass rounded-lg">
      <div className="navbar-start">
        <a className="navbar-item">Ripple UI</a>
      </div>
      <div className="navbar-center">
        <a className="navbar-item">Home</a>
        <a className="navbar-item">About</a>
        <a className="navbar-item">Contact</a>
      </div>
      <div className="navbar-end">
        <a className="navbar-item">Home</a>
      </div>
    </div>
  )
}
