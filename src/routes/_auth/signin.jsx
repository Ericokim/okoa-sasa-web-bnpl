import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent } from '@/components/ui/card'
import { Phone, X } from 'lucide-react'

// Phone number validation schema
const signinSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^\+254[17]\d{8}$/, 'Phone number must be in format +254XXXXXXXXX'),
  rememberMe: z.boolean().optional(),
})

function SigninScreen() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      phoneNumber: '',
      rememberMe: false,
    },
  })

  const phoneValue = watch('phoneNumber')
  const rememberMe = watch('rememberMe')

  const handlePhoneChange = (value) => {
    setValue('phoneNumber', value, { shouldValidate: true })
  }

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true)

      // Simulate API call to request OTP
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Navigate to OTP screen with phone number
      navigate({ to: '/otp', search: { phone: data.phoneNumber } })
    } catch (error) {
      // Handle signin error silently for now
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-xl">
        <CardContent className="p-8">
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
          <div className="text-start mb-8">
            <h1 className="text-3xl font-semibold text-brand-black mb-2">
              Login
            </h1>
            <p className="text-base font-medium text-brand-gray">
              Login now to access the dashboard
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Phone Number Field */}
            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="text-sm font-normal text-brand-black"
              >
                Phone Number
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-mid-gray" />
                <Input
                  id="phone"
                  type="tel"
                  value={phoneValue || ''}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  placeholder="+254 700 000 000"
                  className="pl-10 bg-brand-bg-2 border-brand-stroke rounded-xl h-12"
                  required
                  disabled={isSubmitting}
                  autoFocus
                />
              </div>
              {errors.phoneNumber && (
                <p className="text-sm text-red-600">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center space-x-3">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setValue('rememberMe', checked)}
                className="h-5 w-5"
                disabled={isSubmitting}
              />
              <Label
                htmlFor="remember"
                className="text-sm font-normal text-brand-black cursor-pointer"
              >
                Remember Me
              </Label>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              variant="gradient"
              className="w-full h-12 rounded-3xl text-base font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Login'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export const Route = createFileRoute('/_auth/signin')({
  component: SigninScreen,
})
