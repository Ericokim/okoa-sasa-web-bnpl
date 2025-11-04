import React, { useState, useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Dialog, DialogPortal } from '@/components/ui/dialog'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { useStateContext } from '@/context/state-context'
import { cn } from '@/lib/utils'
import { PhoneIcon, XIcon } from 'lucide-react'
import logo from '@/assets/images/primaryLogoVertical.png'

export function AuthDialog({
  open,
  onOpenChange,
  initialStep = 'login',
  onLoginSuccess,
}) {
  const [step, setStep] = useState(initialStep)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [otp, setOtp] = useState('')
  const [countdown, setCountdown] = useState(41)
  const [isResending, setIsResending] = useState(false)
  const { login } = useStateContext()
  const navigate = useNavigate()

  const maskedPhone = phoneNumber ? `0712****` : '0712****'

  useEffect(() => {
    if (step === 'otp' && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [step, countdown])

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setStep('login')
        setPhoneNumber('')
        setOtp('')
        setRememberMe(false)
        setCountdown(41)
      }, 200)
    }
  }, [open])

  const handleLogin = (e) => {
    e.preventDefault()
    if (phoneNumber) {
      setStep('otp')
      setCountdown(41)
    }
  }

  const handleVerifyOTP = (e) => {
    e.preventDefault()
    if (otp.length === 6) {
      login({
        phoneNumber,
        name: 'User',
      })
      onOpenChange(false)

      if (onLoginSuccess) {
        onLoginSuccess()
      } else {
        navigate({ to: '/' })
      }
    }
  }

  const handleResendOTP = () => {
    setIsResending(true)
    setCountdown(41)
    setOtp('')
    setTimeout(() => setIsResending(false), 1000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogPrimitive.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-[#252525]/20 backdrop-blur-[4px]" />
        <DialogPrimitive.Content
          className={cn(
            'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
            'fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%] duration-200',
            'w-[90vw] max-w-[350px] max-h-[85vh] overflow-y-auto',
            'sm:w-[85vw] sm:max-w-[400px] sm:max-h-[80vh]',
            'md:max-w-[500px] md:max-h-[75vh]',
            'rounded-3xl border-0 bg-white shadow-lg',
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

              {step === 'login' ? (
                <LoginStep
                  phoneNumber={phoneNumber}
                  setPhoneNumber={setPhoneNumber}
                  rememberMe={rememberMe}
                  setRememberMe={setRememberMe}
                  handleLogin={handleLogin}
                />
              ) : (
                <OTPStep
                  otp={otp}
                  setOtp={setOtp}
                  maskedPhone={maskedPhone}
                  countdown={countdown}
                  isResending={isResending}
                  handleVerifyOTP={handleVerifyOTP}
                  handleResendOTP={handleResendOTP}
                />
              )}
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  )
}

function LoginStep({
  phoneNumber,
  setPhoneNumber,
  rememberMe,
  setRememberMe,
  handleLogin,
}) {
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

      <form onSubmit={handleLogin} className="flex flex-col gap-6 w-full">
        <div className="flex flex-col gap-[9px] w-full">
          <Label
            htmlFor="phone"
            className="text-[#252525] text-sm font-normal leading-[140%] font-['Public_Sans']"
          >
            Phone Number
          </Label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2.5">
              <PhoneIcon className="w-5 h-5 text-[#676D75]" />
            </div>
            <Input
              id="phone"
              type="tel"
              placeholder="+254"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full h-auto py-3 pl-14 pr-4 rounded-xl border border-[#E8ECF4] bg-[#F9FAFB] text-[#4d4d4e] text-base font-medium leading-[140%] font-['Public_Sans'] placeholder:text-[#A0A4AC] focus:outline-none focus:ring-2 focus:ring-[#F47120]/20 focus:border-[#F47120]"
              autoComplete="tel"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="remember"
            checked={rememberMe}
            onCheckedChange={setRememberMe}
            className="w-5 h-5 rounded border-[#A0A4AC]"
          />
          <Label
            htmlFor="remember"
            className="text-[#252525] text-sm font-normal leading-[140%] font-['Public_Sans'] cursor-pointer"
          >
            Remember Me
          </Label>
        </div>

        <Button size="lg" type="submit" variant="gradient">
          Login
        </Button>
      </form>
    </>
  )
}

function OTPStep({
  otp,
  setOtp,
  maskedPhone,
  countdown,
  isResending,
  handleVerifyOTP,
  handleResendOTP,
}) {
  return (
    <>
      <div className="flex flex-col gap-2 w-full text-left">
        <h2 className="text-[#252525] text-2xl md:text-[28px] font-semibold leading-[140%] capitalize font-['Public_Sans']">
          OTP Verification
        </h2>
      </div>

      <div className="w-full py-4 px-3 rounded-2xl bg-[rgba(244,113,32,0.12)] flex items-center justify-center">
        <p className="text-[#F47120] text-sm font-medium leading-[140%] font-['Public_Sans'] text-center">
          We've sent a 6-digit code to {maskedPhone} and xx@gmail.com
        </p>
      </div>

      <form onSubmit={handleVerifyOTP} className="flex flex-col gap-6 w-full">
        <div className="flex flex-col gap-3 w-full">
          <Label className="text-[#252525] text-sm font-normal leading-[140%] font-['Public_Sans']">
            Verification Code
          </Label>

          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(value) => setOtp(value)}
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
                    'border border-[#E8ECF4] bg-[#F9FAFB] text-sm sm:text-base md:text-lg font-medium leading-[1.4] font-["Public_Sans"] text-[#252525]',
                    'placeholder:text-[#A0A4AC] transition-colors focus:border-[#F8971D] focus:ring-2 focus:ring-[#F8971D]/20 focus:outline-none',
                  )}
                />
              ))}
            </InputOTPGroup>
          </InputOTP>

          <p className="text-[#676D75] text-sm font-normal leading-[140%] text-center font-['Public_Sans']">
            Enter the 6-digit code we sent to your email
          </p>
        </div>

        <Button
          size="lg"
          type="submit"
          variant="gradient"
          disabled={otp.length !== 6}
        >
          Login
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
              disabled={isResending}
              className="text-sm font-semibold leading-[140%] capitalize font-['Public_Sans'] bg-gradient-to-b from-[#F8971D] to-[#EE3124] bg-clip-text text-transparent hover:opacity-80 transition-opacity disabled:opacity-50"
            >
              Resend Code
            </button>
          )}
        </div>
      </form>
    </>
  )
}
