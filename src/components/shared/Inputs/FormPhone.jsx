import React from 'react'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import * as z from 'zod'

// Kenyan phone number validation schema
export const kenyaPhoneSchema = z
  .string()
  .min(1, 'Phone number is required')
  .refine(
    (value) => {
      // Remove any spaces for validation
      const cleaned = value.replace(/\s/g, '')
      
      // Check if it starts with +254 (should be 13 characters total)
      if (cleaned.startsWith('+254')) {
        return cleaned.length === 13 && /^\+254\d{9}$/.test(cleaned)
      }
      
      // Check if it starts with 0 (should be 10 characters total)
      if (cleaned.startsWith('0')) {
        return cleaned.length === 10 && /^0\d{9}$/.test(cleaned)
      }
      
      return false
    },
    {
      message: 'Please enter a valid phone number (e.g., +254712345678 or 0712345678)',
    }
  )

export function PhoneInput({
  control,
  name,
  label,
  placeholder = '+254712345678 or 0712345678',
  icon: Icon,
  className = '',
  disabled = false,
}) {
  const handlePhoneChange = (e, field) => {
    const value = e.target.value
    
    // Allow only + symbol, numbers, and handle backspace
    const filteredValue = value
      .split('')
      .filter((char, index) => {
        // Allow + only at the beginning
        if (char === '+') return index === 0
        // Allow only numbers
        return /\d/.test(char)
      })
      .join('')
    
    // Enforce maximum length based on format
    let maxLength
    if (filteredValue.startsWith('+254')) {
      maxLength = 13 // +254 + 9 digits
    } else if (filteredValue.startsWith('0')) {
      maxLength = 10 // 0 + 9 digits
    } else {
      // Allow typing to begin
      maxLength = 13
    }
    
    const finalValue = filteredValue.slice(0, maxLength)
    field.onChange(finalValue)
  }

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className="relative">
          <FormLabel className="text-sm mb-[3px] font-medium text-gray-900">
            {label}
          </FormLabel>
          <FormControl>
            <div className="relative">
              {Icon && (
                <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              )}
              <Input
                type="text"
                placeholder={placeholder}
                disabled={disabled}
                className={`${Icon ? 'pl-10' : 'pl-4'} h-11 bg-gray-50 focus-visible:ring-primary ${
                  fieldState.error 
                    ? 'border-primary focus-visible:ring-primary' 
                    : 'border-gray-300'
                } ${className}`}
                value={field.value}
                onChange={(e) => handlePhoneChange(e, field)}
                onBlur={field.onBlur}
                name={field.name}
              />
            </div>
          </FormControl>
          <div className="absolute left-0 top-full mb-1 mt-1">
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  )
}