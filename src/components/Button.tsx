'use client'

import Link from 'next/link'
import Loader from './Loader'

export interface ButtonProps {
  text: string;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning';
  outline?: boolean;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

export default function Button({ text, onClick, href, variant, outline, className, disabled = false, isLoading = false }: ButtonProps) {
  if (outline && !variant) {
    variant = 'primary';
  }
  const buttonClass = `btn ${outline ? `btn-outline-${variant}` : variant ? `btn-${variant}` : ''} hover:scale-105 transition-transform duration-200`;
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };


  if (href) {
    return (
      <Link href={href} className={buttonClass + ' ' + className}>
        {text}
      </Link>
    )
  }

  return (
    <button disabled={disabled} className={buttonClass + ' ' + className} onClick={handleClick}>
      {isLoading ? <Loader color='white' /> : text}
    </button>
  )
}
