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
    variant,
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

  return (
    <div
      ref={ref}
      style={style}
      role="status"
      className={cn(
        'pointer-events-auto flex w-full min-w-[240px] max-w-[360px] items-center gap-3 rounded-[999px] bg-gradient-to-r from-[#F8971D] to-[#EE3124] px-5 py-3 text-white shadow-[0_10px_30px_rgba(238,49,36,0.25)]',
        className,
      )}
    >
      {resolvedIcon ? (
        <span className="flex items-center justify-center text-white">
          {resolvedIcon}
        </span>
      ) : null}
      <div className="flex-1 text-sm font-semibold leading-snug">
        {message}
      </div>
      {resolvedAction ? (
        <div className="flex items-center text-white">{resolvedAction}</div>
      ) : null}
    </div>
  )
})
