'use client'

import React from 'react'

export interface ButtonProps {
    text: string;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning';
    outline?: boolean;
    color?: string;
    className?: string;
}

export default function Button({ text, onClick, variant, outline, color, className }: ButtonProps) {
  if (outline && !variant) {
    variant = 'primary';
  }
  const buttonClass = `btn ${outline ? `btn-outline-${variant}` : variant ? `btn-${variant}` : ''}`;
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <>
      <button className={buttonClass + ' ' + className} onClick={handleClick}>{text}</button>
    </>
  )
}
