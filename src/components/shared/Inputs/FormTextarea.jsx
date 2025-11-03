import React from 'react'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'

export function FormTextarea({
  control,
  name,
  label,
  placeholder,
  className = '',
  rows = 3,
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
            <Textarea
              placeholder={placeholder}
              disabled={disabled}
              rows={rows}
              className={`border-gray-300 bg-gray-50 resize-none focus-visible:ring-orange-500 invalid:border-orange-300 ${className}`}
              {...field}
            />
          </FormControl>
          <div className="absolute left-0 top-full mb-1 mt-1">
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  )
}