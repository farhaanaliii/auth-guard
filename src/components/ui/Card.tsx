import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  padding?: boolean
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  padding = true 
}) => {
  return (
    <div className={`
      bg-white rounded-xl border border-secondary-200 shadow-sm hover:shadow-md 
      transition-shadow duration-200 ${padding ? 'p-6' : ''} ${className}
    `}>
      {children}
    </div>
  )
}
