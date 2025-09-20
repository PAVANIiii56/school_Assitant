import React from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  className,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5">
            {icon}
          </div>
        )}
        <input
          className={cn(
            'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
            'transition-all duration-200',
            'placeholder-gray-400',
            icon && 'pl-10',
            error && 'border-red-300 focus:ring-red-500',
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};