'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> {
  label?: string;
  error?: string;
  type?: string;
  options?: { label: string; value: string }[];
  as?: 'input' | 'textarea' | 'select';
  icon?: React.ReactNode;
}

export default function FormField({
  label,
  error,
  type = 'text',
  options,
  as = 'input',
  icon,
  className,
  id,
  ...props
}: FormFieldProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  const baseClasses = cn(
    'w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white',
    icon && 'pl-10',
    error && 'border-danger focus:ring-danger/20 focus:border-danger',
    className
  );

  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-semibold text-slate-700">
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        )}

        {as === 'textarea' ? (
          <textarea
            id={inputId}
            className={cn(baseClasses, 'min-h-[100px]')}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : as === 'select' ? (
          <select
            id={inputId}
            className={baseClasses}
            {...(props as React.SelectHTMLAttributes<HTMLSelectElement>)}
          >
            {options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={inputId}
            type={type}
            className={baseClasses}
            {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
      </div>

      {error && <p className="text-xs font-medium text-danger">{error}</p>}
    </div>
  );
}