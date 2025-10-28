import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { useStateContext } from '@/context/state-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { X } from 'lucide-react'
import { z } from 'zod'

// Route search params validation
const otpSearchSchema = z.object({
  phone: z.string().min(1, 'Phone number is required'),
})

function OTPScreen() {
  const [otp, setOtp] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)
  const [errors, setErrors] = useState({})

  const navigate = useNavigate()
  const { login } = useStateContext()
  const search = useSearch({ from: '/_auth/otp' })

  // Extract phone number from URL params
  let phoneNumber = ''
  let shouldRedirect = false
  try {
    const validated = otpSearchSchema.parse(search)
    phoneNumber = validated.phone
  } catch {
    shouldRedirect = true
  }

  // Redirect if no valid phone number
  useEffect(() => {
    if (shouldRedirect) {
      navigate({ to: '/signin' })
    }
  }, [shouldRedirect, navigate])

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown((prev) => prev - 1)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [resendCooldown])

  // Early return after hooks
  if (shouldRedirect) {
    return null
  }

  const handleVerifyOtp = async (data) => {
    try {
      setIsSubmitting(true)
      setErrors({})

      // Simulate OTP verification API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate validation - accept '123456' as valid OTP for demo
      if (data.otp !== '123456') {
        setErrors({ otp: 'Invalid verification code. Please try again.' })
        return
      }

      // Set auth state and navigate to products
      login({ phoneNumber, name: 'Demo User' })
      navigate({ to: '/', params: { productId: '1' } })
    } catch (error) {
      setErrors({ otp: 'Verification failed. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResendOtp = async () => {
    try {
      setIsResending(true)

      // Simulate resend API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Start 60-second cooldown
      setResendCooldown(60)
    } catch (error) {
      // Handle resend error
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-xl">
        <div className="p-8">
          {/* Close Button */}
          <div className="flex justify-end mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate({ to: '/' })}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

  

          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-[202px] h-[184px] flex items-center justify-center">
              <img
                src="/primaryLogoVertical.png"
                alt="Okoa Sasa"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold text-brand-black mb-2">
              Enter Verification Code
            </h1>
            <p className="text-base font-medium text-brand-gray">
              We've sent a 6-digit code to {phoneNumber}
            </p>
          </div>

          {/* OTP Form */}
          <div className="space-y-6">
            {/* OTP Input */}
            <div className="space-y-2">
              <Label className="text-sm font-normal text-brand-black">
                Verification Code
              </Label>
              <Input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit code"
                className="bg-brand-bg-2 border-brand-stroke rounded-xl h-12 text-center text-lg tracking-widest"
                maxLength={6}
                autoFocus
              />
              {errors.otp && (
                <p className="text-sm text-red-600">{errors.otp}</p>
              )}
            </div>

            {/* Verify Button */}
            <Button
              onClick={() => handleVerifyOtp({ otp })}
              variant="gradient"
              className="w-full h-12 rounded-3xl text-base font-medium"
              disabled={isSubmitting || !otp || otp.length !== 6}
            >
              {isSubmitting ? 'Verifying...' : 'Verify Code'}
            </Button>

            {/* Resend OTP */}
            {resendCooldown === 0 && (
              <Button
                type="button"
                variant="ghost"
                onClick={handleResendOtp}
                disabled={isResending}
                className="w-full text-brand-primary-start hover:text-brand-primary-end"
              >
                {isResending ? 'Sending...' : 'Resend Code'}
              </Button>
            )}

            {/* Back to Login */}
            <Button
              type="button"
              variant="ghost"
              onClick={() => navigate({ to: '/signin' })}
              className="w-full text-brand-gray hover:text-brand-black"
            >
              Back to Login
            </Button>
          </div>
        </div>
      </div>

      {/* Resend cooldown display */}
      {resendCooldown > 0 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <p className="text-sm text-brand-gray bg-white px-4 py-2 rounded-lg shadow">
            Resend available in {resendCooldown}s
          </p>
        </div>
      )}
    </div>
  )
}

export const Route = createFileRoute('/_auth/otp')({
  component: OTPScreen,
})
