import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { useStateContext } from '@/context/state-context'
import { Button } from '@/components/ui/button'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { X, ArrowLeft } from 'lucide-react'

function OTPScreen() {
  const [otp, setOtp] = useState('')
  const [isResending, setIsResending] = useState(false)
  const navigate = useNavigate()
  const { login } = useStateContext()

  const phoneNumber = '+254 700 000 000' // This would come from navigation state in a real app

  const handleVerify = (e) => {
    e.preventDefault()
    if (otp.length === 6) {
      // In a real app, you'd verify the OTP here
      login({ phoneNumber, name: 'Demo User' })
      navigate({ to: '/' })
    }
  }

  const handleResend = async () => {
    setIsResending(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsResending(false)
  }

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-xl">
        <CardContent className="p-8">
          {/* Close Button */}
          <div className="flex justify-between items-center mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate({ to: '/signin' })}
              className="h-6 w-6 p-0"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
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
            <p className="text-base font-medium text-brand-gray mb-2">
              We've sent a 6-digit code to
            </p>
            <p className="text-base font-semibold text-brand-black">
              {phoneNumber}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleVerify} className="space-y-6">
            {/* OTP Input */}
            <div className="space-y-2">
              <Label className="text-sm font-normal text-brand-black text-center block">
                Verification Code
              </Label>
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={setOtp}
                  className="gap-3"
                >
                  <InputOTPGroup>
                    <InputOTPSlot
                      index={0}
                      className="w-12 h-12 text-lg border-brand-stroke bg-brand-bg-2 rounded-xl"
                    />
                    <InputOTPSlot
                      index={1}
                      className="w-12 h-12 text-lg border-brand-stroke bg-brand-bg-2 rounded-xl"
                    />
                    <InputOTPSlot
                      index={2}
                      className="w-12 h-12 text-lg border-brand-stroke bg-brand-bg-2 rounded-xl"
                    />
                    <InputOTPSlot
                      index={3}
                      className="w-12 h-12 text-lg border-brand-stroke bg-brand-bg-2 rounded-xl"
                    />
                    <InputOTPSlot
                      index={4}
                      className="w-12 h-12 text-lg border-brand-stroke bg-brand-bg-2 rounded-xl"
                    />
                    <InputOTPSlot
                      index={5}
                      className="w-12 h-12 text-lg border-brand-stroke bg-brand-bg-2 rounded-xl"
                    />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>

            {/* Verify Button */}
            <Button
              type="submit"
              variant="gradient"
              className="w-full h-12 rounded-3xl text-base font-medium"
              disabled={otp.length !== 6}
            >
              Verify Code
            </Button>
          </form>

          {/* Resend Section */}
          <div className="mt-6 text-center">
            <p className="text-sm text-brand-gray mb-3">
              Didn't receive the code?
            </p>
            <Button
              variant="ghost"
              onClick={handleResend}
              disabled={isResending}
              className="text-brand-primary-start hover:text-brand-primary-end font-medium p-0 h-auto"
            >
              {isResending ? 'Resending...' : 'Resend Code'}
            </Button>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-brand-gray">
              Need help?{' '}
              <Link
                to="/support"
                className="text-brand-primary-start hover:text-brand-primary-end font-medium"
              >
                Contact Support
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export const Route = createFileRoute('/_auth/otp')({
  component: OTPScreen,
})
