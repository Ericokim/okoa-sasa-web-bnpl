import React from 'react'
import * as Dg from '@/components/ui/dialog.jsx'
import * as At from '@/components/ui/alert-dialog.jsx'
import {
  Loader2,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  HelpCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useStateContext } from '@/context/state-context'
import { Input } from '@/components/ui/input'

export const Dialog = React.forwardRef(
  (
    {
      title,
      description,
      open = false,
      onOpenChange,
      contentClassName,
      children,
      closeIcon,
      image,
      DialogHeaderClassName,
      ...props
    },
    ref,
  ) => {
    return (
      <Dg.Dialog
        ref={ref}
        modal={true}
        open={open}
        defaultOpen={open}
        onOpenChange={onOpenChange}
        {...props}
      >
        <Dg.DialogContent
          closeIcon={closeIcon}
          className={cn('max-w-3xl', contentClassName)}
        >
          {image}
          <Dg.DialogHeader className={DialogHeaderClassName}>
            <Dg.DialogTitle className="-mt-2">{title}</Dg.DialogTitle>
            <Dg.DialogDescription>{description}</Dg.DialogDescription>
          </Dg.DialogHeader>
          {children}
        </Dg.DialogContent>
      </Dg.Dialog>
    )
  },
)

export const AlertDialog = React.forwardRef(({ ...props }, ref) => {
  const { alert } = useStateContext()
  const [confirmationInput, setConfirmationInput] = React.useState('')
  const [isConfirmationValid, setIsConfirmationValid] = React.useState(false)

  // Reset confirmation input when dialog opens/closes
  React.useEffect(() => {
    if (!alert.open) {
      setConfirmationInput('')
      setIsConfirmationValid(false)
    }
  }, [alert.open])

  // Check if confirmation input matches required text
  React.useEffect(() => {
    if (alert.requiresConfirmation && alert.confirmationMatch) {
      setIsConfirmationValid(
        confirmationInput.toLowerCase().trim() ===
          alert.confirmationMatch.toLowerCase().trim(),
      )
    } else {
      setIsConfirmationValid(true)
    }
  }, [confirmationInput, alert.requiresConfirmation, alert.confirmationMatch])

  // Handle action with confirmation check
  const handleAction = () => {
    if (alert.requiresConfirmation && !isConfirmationValid) {
      return
    }
    alert.onAction()
  }

  // Get appropriate icon based on alert style
  const getAlertIcon = () => {
    switch (alert.actionStyle) {
      case 'destructive':
        return (
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
            <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
        )
      case 'success':
        return (
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
            <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
        )
      case 'warning':
        return (
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/20">
            <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
          </div>
        )
      case 'info':
      case 'default':
      case 'primary':
        return (
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20">
            <Info className="h-6 w-6 text-primary" />
          </div>
        )
      default:
        return (
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
            <HelpCircle className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          </div>
        )
    }
  }

  return (
    <At.AlertDialog
      modal={true}
      open={alert.open}
      defaultOpen={alert.open}
      onOpenChange={alert.closeConfirmation}
      {...props}
    >
      <At.AlertDialogContent className="sm:max-w-md overflow-hidden p-0">
        <div className="bg-white dark:bg-gray-950">
          {/* Icon Section */}
          <div className="px-6 pt-6 pb-2 text-center">{getAlertIcon()}</div>

          {/* Content Section */}
          <div className="px-6 pb-4">
            <At.AlertDialogHeader className="text-center space-y-2">
              <At.AlertDialogTitle className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                {alert.title}
              </At.AlertDialogTitle>
              <At.AlertDialogDescription className="text-sm text-gray-600 dark:text-gray-400">
                {alert.description}
              </At.AlertDialogDescription>
            </At.AlertDialogHeader>

            {/* Confirmation Input Section */}
            {alert.requiresConfirmation && (
              <div className="mt-4 space-y-3">
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  {alert.confirmationText}
                </div>
                <div className="space-y-2">
                  <Input
                    type="text"
                    placeholder={alert.confirmationPlaceholder}
                    value={confirmationInput}
                    onChange={(e) => setConfirmationInput(e.target.value)}
                    className={cn(
                      'text-center font-mono',
                      isConfirmationValid
                        ? 'border-green-300 focus:border-green-500 focus:ring-green-500'
                        : confirmationInput.length > 0
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                          : '',
                    )}
                  />
                  {alert.confirmationMatch && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                      {/* Type:{' '}
                      <span className="font-mono font-semibold">
                        {alert.confirmationMatch}
                      </span> */}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Button Section */}
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-800">
            <At.AlertDialogFooter className="flex gap-3 justify-center">
              <At.AlertDialogCancel
                className={cn(
                  'inline-flex items-center justify-center',
                  'px-4 py-2 min-w-[80px] h-9',
                  'text-sm font-medium rounded-md',
                  'border border-gray-300 dark:border-gray-600',
                  'bg-white dark:bg-gray-800',
                  'text-gray-700 dark:text-gray-300',
                  'hover:bg-gray-50 dark:hover:bg-gray-700',
                  'focus:outline-none focus:ring-2 focus:ring-gray-500',
                  'transition-colors duration-150',
                )}
                onClick={alert.onCancel}
              >
                {alert.cancelLabel}
              </At.AlertDialogCancel>

              <At.AlertDialogAction
                className={cn(
                  'inline-flex items-center justify-center',
                  'px-4 py-2 min-w-[80px] h-9',
                  'text-sm font-medium rounded-md',
                  'focus:outline-none focus:ring-2',
                  'transition-colors duration-150',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  alert.actionStyle === 'destructive'
                    ? 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500'
                    : alert.actionStyle === 'success'
                      ? 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500'
                      : alert.actionStyle === 'warning'
                        ? 'bg-yellow-600 hover:bg-yellow-700 text-white focus:ring-yellow-500'
                        : 'bg-primary hover:bg-primary/90 text-white focus:ring-primary/80',
                )}
                disabled={
                  alert.loading ||
                  (alert.requiresConfirmation && !isConfirmationValid)
                }
                onClick={handleAction}
              >
                {alert.loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  alert.actionLabel
                )}
              </At.AlertDialogAction>
            </At.AlertDialogFooter>
          </div>
        </div>
      </At.AlertDialogContent>
    </At.AlertDialog>
  )
})

export const CreateDialog = ({ align = 'left', title, icon, children }) => {
  return (
    <fieldset className="w-full rounded-lg border bg-card text-card-foreground shadow hover:shadow-md p-4">
      <legend align={align} className="-ml-1 px-2 text-lg font-medium">
        <div className="flex items-center gap-2">
          {icon && <span className="text-muted-foreground">{icon}</span>}
          {title}
        </div>
      </legend>
      {children}
    </fieldset>
  )
}
