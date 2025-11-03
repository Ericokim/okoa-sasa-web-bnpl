import React from 'react'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export function FormInput({
  control,
  name,
  label,
  placeholder,
  type = 'text',
  icon: Icon,
  className = '',
  disabled = false,
}) {
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
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                className={`${Icon ? 'pl-10' : 'pl-4'} h-11 bg-gray-50 focus-visible:ring-primary ${
                  fieldState.error 
                    ? 'border-primary focus-visible:ring-primary' 
                    : 'border-gray-300'
                } ${className}`}
                {...field}
              />
            </div>
          </FormControl>
          <div className="absolute mb-1 left-0 top-full mt-1">
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  )
}