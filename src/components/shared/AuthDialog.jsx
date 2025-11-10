import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { Dialog, DialogPortal } from '@/components/ui/dialog'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel as FormFieldLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { cn } from '@/lib/utils'
import { useLogin, useOTP } from '@/lib/queries/auth'
import {
  LoginSchema,
  OTPVerificationSchema,
  normalizeOtpValue,
} from '@/lib/validation'
import { CheckCircle2, Loader2, PhoneIcon, XIcon } from 'lucide-react'
import logo from '@/assets/images/primaryLogoVertical.png'

export function AuthDialog({
  open,
  onOpenChange,
  initialStep = 'login',
  onLoginSuccess,
}) {
  const [step, setStep] = useState(initialStep)
  const [loginIdentifier, setLoginIdentifier] = useState('')
  const [countdown, setCountdown] = useState(41)
  const [isResending, setIsResending] = useState(false)
  const successTimerRef = useRef(null)
  const navigate = useNavigate()

  const form = useForm({
    resolver: LoginSchema,
    defaultValues: {
      phoneNumberOrEmail: '',
      rememberMe: false,
    },
  })

  const otpForm = useForm({
    resolver: OTPVerificationSchema,
    defaultValues: {
      otp: '',
      phoneNumberOrEmail: '',
    },
  })

  const finalizeAuth = React.useCallback(() => {
    if (successTimerRef.current) {
      clearTimeout(successTimerRef.current)
      successTimerRef.current = null
    }

    onOpenChange(false)

    if (typeof onLoginSuccess === 'function') {
      onLoginSuccess()
    } else {
      navigate({ to: '/' })
    }
  }, [navigate, onLoginSuccess, onOpenChange])

  const loginMutation = useLogin({
    onSuccess: (_response, variables) => {
      const identifier = variables?.phoneNumberOrEmail || ''

      setLoginIdentifier(identifier)
      otpForm.reset({ otp: '', phoneNumberOrEmail: identifier })
      setStep('otp')
      setCountdown(41)
    },
  })

  const otpMutation = useOTP({
    onSuccess: () => {
      setStep('success')
      otpForm.reset({ otp: '', phoneNumberOrEmail: '' })

      if (successTimerRef.current) {
        clearTimeout(successTimerRef.current)
      }

      successTimerRef.current = setTimeout(() => {
        finalizeAuth()
      }, 1200)
    },
    onError: () => {
      otpForm.reset({ otp: '', phoneNumberOrEmail: loginIdentifier })
    },
  })

  const maskedIdentifier = maskLoginIdentifier(loginIdentifier)
  const otpValue = otpForm.watch('otp')

  useEffect(() => {
    if (step === 'otp' && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [step, countdown])

  useEffect(() => {
    return () => {
      if (successTimerRef.current) {
        clearTimeout(successTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!open) {
      if (successTimerRef.current) {
        clearTimeout(successTimerRef.current)
        successTimerRef.current = null
      }
      setTimeout(() => {
        setStep('login')
        setLoginIdentifier('')
        setCountdown(41)
        setIsResending(false)
        form.reset({ phoneNumberOrEmail: '', rememberMe: false })
        otpForm.reset({ otp: '', phoneNumberOrEmail: '' })
      }, 200)
    }
  }, [open, form, otpForm])

  const handleLogin = form.handleSubmit((data) => {
    const identifier = data.phoneNumberOrEmail?.trim()

    if (!identifier) {
      return
    }

    loginMutation.mutate({ phoneNumberOrEmail: identifier })
  })

  const handleVerifyOTP = otpForm.handleSubmit(({ otp }) => {
    const contactIdentifier =
      loginIdentifier || otpForm.getValues('phoneNumberOrEmail')

    if (!contactIdentifier) {
      otpForm.setError('otp', {
        type: 'manual',
        message: 'Request a verification code to continue.',
      })
      setStep('login')
      return
    }

    otpMutation.mutate({
      otp,
      phoneNumberOrEmail: contactIdentifier,
    })
  })

  const handleResendOTP = () => {
    if (!loginIdentifier || loginMutation.isPending) {
      return
    }

    setIsResending(true)
    otpForm.reset({ otp: '', phoneNumberOrEmail: loginIdentifier })

    loginMutation.mutate(
      { phoneNumberOrEmail: loginIdentifier },
      {
        onSettled: () => {
          setIsResending(false)
        },
      },
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogPrimitive.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-[#252525]/20 backdrop-blur-[4px]" />
        <DialogPrimitive.Content
          className={cn(
            'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
            'fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%] duration-200',
            'w-[90vw] max-w-[350px] max-h-[calc(100dvh-40px)]',
            'sm:w-[85vw] sm:max-w-[400px] sm:max-h-[calc(100dvh-72px)]',
            'md:max-w-[500px] md:max-h-[calc(100dvh-96px)]',
            'rounded-3xl border-0 bg-white shadow-lg',
            'overflow-hidden',
          )}
          onPointerDownOutside={(e) => e.preventDefault()}
          onInteractOutside={(e) => e.preventDefault()}
        >
          <div className="relative w-full p-4 sm:p-6 md:p-8 pb-6 sm:pb-8 md:pb-10 flex flex-col items-center gap-4 sm:gap-6">
            <button
              onClick={() => onOpenChange(false)}
              //   className="absolute right-4 sm:right-6 md:right-8 top-4 sm:top-6 md:top-8 flex h-8 w-8 items-center justify-center rounded-sm bg-[#F9FAFB] border border-[#E8ECF4] text-[#676D75] transition-all duration-200 hover:bg-[#F1F5F9] hover:text-[#F47120] hover:border-[#F47120] focus:outline-none focus:ring-2 focus:ring-[#F47120]/20 z-10"
              className="absolute right-5 md:right-[30px] top-5 md:top-[30px] rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 z-10"
            >
              <XIcon className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </button>

            <div className="flex flex-col items-center gap-4 md:gap-6 w-full">
              <img
                src={logo}
                srcSet={`${logo} 1x, ${logo} 2x`}
                alt="Okoa Sasa Logo"
                loading="lazy"
                decoding="async"
                className="w-[150px] h-[136px] sm:w-[180px] sm:h-[164px] md:w-[202px] md:h-[184px] object-contain"
              />

              {step === 'login' && (
                <LoginStep
                  form={form}
                  handleLogin={handleLogin}
                  isSubmitting={loginMutation.isPending}
                />
              )}

              {step === 'otp' && (
                <OTPStep
                  form={otpForm}
                  otpValue={otpValue}
                  maskedContact={maskedIdentifier}
                  countdown={countdown}
                  isResending={isResending}
                  isVerifying={otpMutation.isPending}
                  handleVerifyOTP={handleVerifyOTP}
                  handleResendOTP={handleResendOTP}
                />
              )}

              {step === 'success' && <SuccessStep />}
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  )
}

const formatPhoneValue = (value = '') => {
  if (!value) return ''

  const characters = value.split('')
  const sanitized = characters.reduce((acc, char) => {
    if (char === '+' && acc.length === 0) {
      acc.push(char)
      return acc
    }

    if (/\d/.test(char)) {
      acc.push(char)
    }

    return acc
  }, [])

  const result = sanitized.join('')

  if (result.startsWith('+254')) {
    return result.slice(0, 13)
  }

  if (result.startsWith('0')) {
    return result.slice(0, 10)
  }

  return result.slice(0, 13)
}

const formatLoginInputValue = (value = '') => {
  if (!value) return ''
  if (/[a-zA-Z@]/.test(value)) {
    return value.trim()
  }
  return formatPhoneValue(value)
}

const maskLoginIdentifier = (value = '') => {
  if (!value) return 'your contact info'
  if (value.includes('@')) {
    const [localPart = '', domain = ''] = value.split('@')
    if (!domain) return value
    const prefix = localPart.slice(0, Math.min(2, localPart.length))
    const mask = localPart.length > 2 ? '***' : '*'
    return `${prefix || '*'}${mask}@${domain}`
  }
  const compact = value.replace(/\s+/g, '')
  if (compact.length <= 4) {
    return `${compact.slice(0, Math.max(1, compact.length))}****`
  }
  return `${compact.slice(0, 4)}****${compact.slice(-2)}`
}

function LoginStep({ form, handleLogin, isSubmitting }) {
  const { control, formState } = form
  const pending = isSubmitting || formState.isSubmitting

  return (
    <>
      <div className="flex flex-col gap-2 w-full text-left">
        <h2 className="text-[#252525] text-2xl md:text-[28px] font-semibold leading-[140%] capitalize font-['Public_Sans']">
          Login
        </h2>
        <p className="text-[#676D75] text-sm md:text-base font-normal md:font-normal leading-[140%] font-['Public_Sans']">
          Login now to access the dashboard
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={handleLogin} className="flex flex-col gap-6 w-full">
          <FormField
            control={control}
            name="phoneNumberOrEmail"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-[9px] w-full">
                <FormFieldLabel className="text-[#252525] text-sm font-normal leading-[140%] font-['Public_Sans']">
                  Phone Number or Email
                </FormFieldLabel>
                <FormControl>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2.5">
                      <PhoneIcon className="w-5 h-5 text-[#676D75]" />
                    </div>
                    <Input
                      id="login-identifier"
                      type="text"
                      inputMode="text"
                      placeholder="Enter phone number or email"
                      autoComplete="username"
                      value={field.value}
                      onChange={(e) =>
                        field.onChange(formatLoginInputValue(e.target.value))
                      }
                      className="w-full h-auto py-3 pl-14 pr-4 rounded-xl border border-[#E8ECF4] bg-[#F9FAFB] text-[#4d4d4e] text-base font-medium leading-[140%] font-['Public_Sans'] placeholder:text-[#A0A4AC] focus:outline-none focus:ring-2 focus:ring-[#F47120]/20 focus:border-[#F47120]"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-sm font-medium text-[#EE3124]" />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-2">
                <FormControl>
                  <Checkbox
                    id="remember"
                    checked={!!field.value}
                    onCheckedChange={(checked) =>
                      field.onChange(checked === true)
                    }
                    className="w-5 h-5 rounded border-[#A0A4AC]"
                  />
                </FormControl>
                <Label
                  htmlFor="remember"
                  className="text-[#252525] text-sm font-normal leading-[140%] font-['Public_Sans'] cursor-pointer"
                >
                  Remember Me
                </Label>
              </FormItem>
            )}
          />

          <Button
            size="lg"
            type="submit"
            variant="gradient"
            disabled={pending}
          >
            {pending ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Sending OTP...
              </>
            ) : (
              'Login'
            )}
          </Button>
        </form>
      </Form>
    </>
  )
}

function OTPStep({
  form,
  otpValue,
  maskedContact,
  countdown,
  isResending,
  isVerifying,
  handleVerifyOTP,
  handleResendOTP,
}) {
  const { control, formState } = form
  const pending = isVerifying || formState.isSubmitting

  return (
    <>
      <div className="flex flex-col gap-2 w-full text-left">
        <h2 className="text-[#252525] text-2xl md:text-[28px] font-semibold leading-[140%] capitalize font-['Public_Sans']">
          OTP Verification
        </h2>
      </div>

      <div className="w-full py-4 px-3 rounded-2xl bg-[rgba(244,113,32,0.12)] flex items-center justify-center">
        <p className="text-[#F47120] text-sm font-medium leading-[140%] font-['Public_Sans'] text-center">
          We&apos;ve sent a 6-digit code to {maskedContact}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={handleVerifyOTP} className="flex flex-col gap-6 w-full">
          <FormField
            control={control}
            name="otp"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-3 w-full">
                <FormFieldLabel className="text-[#252525] text-sm font-normal leading-[140%] font-['Public_Sans']">
                  Verification Code
                </FormFieldLabel>
                <FormControl>
                  <InputOTP
                    inputMode="numeric"
                    pattern="[0-9]*"
                    autoComplete="one-time-code"
                    maxLength={6}
                    value={field.value}
                    onChange={(value) =>
                      field.onChange(normalizeOtpValue(value))
                    }
                    className="w-full max-w-none"
                  >
                    <InputOTPGroup className="w-full justify-between gap-1 sm:gap-2 md:gap-3 flex-nowrap">
                      {[0, 1, 2, 3, 4, 5].map((index) => (
                        <InputOTPSlot
                          key={index}
                          index={index}
                          className={cn(
                            'flex h-[48px] w-10 sm:w-10 md:h-[50px] md:w-[60px] items-center justify-center rounded-[12px] sm:rounded-[10px] md:rounded-[12px]',
                            'shrink-0 first:rounded-[12px] first:rounded-l-[12px] last:rounded-[12px] last:rounded-r-[12px]',
                            'flex-1 max-w-[44px] sm:max-w-[48px] md:max-w-none',
                            'border border-[#E8ECF4] bg-[#F9FAFB] text-base sm:text-lg font-medium leading-[1.4] font-["Public_Sans"] text-[#252525]',
                            'placeholder:text-[#A0A4AC] transition-colors focus:border-[#F8971D] focus:ring-2 focus:ring-[#F8971D]/20 focus:outline-none',
                          )}
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage className="text-sm font-medium text-[#EE3124]" />
              </FormItem>
            )}
          />

          <p className="text-[#676D75] text-sm font-normal leading-[140%] text-center font-['Public_Sans']">
            Enter the 6-digit code sent to your phone or email
          </p>

          <Button
            size="lg"
            type="submit"
            variant="gradient"
            disabled={otpValue.length !== 6 || pending}
          >
            {pending ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Verifying...
              </>
            ) : (
              'Login'
            )}
          </Button>

          <div className="flex items-center justify-center gap-3 w-full flex-wrap">
            <span className="text-[#252525] text-sm font-normal leading-[140%] font-['Public_Sans']">
              Did'nt Receive the code?
            </span>
            {countdown > 0 ? (
              <span className="text-sm font-medium leading-[140%] capitalize font-['Public_Sans'] bg-gradient-to-b from-[#F8971D] to-[#EE3124] bg-clip-text text-transparent">
                Resend In
                <span className="font-bold"> {countdown}</span>s
              </span>
            ) : (
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={isResending || pending}
                className="text-sm font-semibold leading-[140%] capitalize font-['Public_Sans'] bg-gradient-to-b from-[#F8971D] to-[#EE3124] bg-clip-text text-transparent hover:opacity-80 transition-opacity disabled:opacity-50"
              >
                {isResending ? (
                  <span className="flex items-center gap-1">
                    <Loader2 className="h-4 w-4 animate-spin" /> Resending...
                  </span>
                ) : (
                  'Resend Code'
                )}
              </button>
            )}
          </div>
        </form>
      </Form>
    </>
  )
}

function SuccessStep() {
  return (
    <div className="flex flex-col items-center gap-5 w-full text-center py-6">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(244,113,32,0.12)] text-[#F47120]">
        <CheckCircle2 className="h-10 w-10" />
      </div>
      <div className="space-y-2">
        <h2 className="text-[#252525] text-2xl md:text-[28px] font-semibold leading-[140%] capitalize font-['Public_Sans']">
          You&apos;re all set!
        </h2>
        <p className="text-[#676D75] text-sm md:text-base font-normal leading-[140%] font-['Public_Sans']">
          Redirecting you to your account...
        </p>
      </div>
    </div>
  )
}
