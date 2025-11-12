import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

/**
 * Custom snackbar content that matches the Okoa Sasa gradient theme.
 * Registered for the `success` variant so both add/remove cart toasts share the same style.
 */
export const BrandSnackbar = forwardRef(function BrandSnackbar(
  {
    id,
    message,
    action,
    iconVariant,
    variant = 'success',
    hideIconVariant,
    className,
    style,
  },
  ref,
) {
  const resolvedAction =
    typeof action === 'function'
      ? action(id)
      : action ?? null

  const resolvedIcon =
    hideIconVariant || !iconVariant
      ? null
      : iconVariant[variant] ?? iconVariant.default ?? null

  const baseClasses =
    'pointer-events-auto flex w-full min-w-60 max-w-[360px] items-center gap-3 rounded-[999px] px-5 py-2 text-sm font-semibold leading-snug shadow-[0_10px_30px_rgba(238,49,36,0.25)]'

  const variantClasses = {
    success:
      'bg-linear-to-r from-[#F8971D] to-[#EE3124] text-white',
    error:
      'bg-[#2B0B0B] text-[#FFEDEB] border border-[#FFB4AC]',
    info: 'bg-[#0D0B26] text-white',
  }

  const resolvedClasses = variantClasses[variant] || variantClasses.success

  return (
    <div
      ref={ref}
      style={style}
      role="status"
      className={cn(
        baseClasses,
        resolvedClasses,
        className,
      )}
    >
      {resolvedIcon ? (
        <span className="flex items-center justify-center">
          {resolvedIcon}
        </span>
      ) : null}
      <div className="flex-1">{message}</div>
      {resolvedAction ? (
        <div className="flex items-center">{resolvedAction}</div>
      ) : null}
    </div>
  )
})
