import React from 'react'

export interface ButtonProps {
    text: string;
    onClick?: () => void;
    variant: 'primary' | 'secondary' | 'success' | 'error' | 'warning';
}

export default function Button({ text, onClick, variant }: ButtonProps) {
  return (
    <>
      <button className={`btn btn-${variant}`}>{text}</button>
    </>
  )
}
