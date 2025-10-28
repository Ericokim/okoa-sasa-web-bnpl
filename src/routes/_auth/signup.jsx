import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { useStateContext } from '@/context/state-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent } from '@/components/ui/card'
import { Phone, User, Mail, X } from 'lucide-react'

function RegisterScreen() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    agreeToTerms: false,
  })
  const navigate = useNavigate()
  const { login } = useStateContext()

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }))
  }

  const handleRegister = (e) => {
    e.preventDefault()
    // In a real app, you'd register the user here
    login({
      phoneNumber: formData.phoneNumber,
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
    })
    navigate({ to: '/products' })
  }

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-lg mx-auto bg-white rounded-3xl shadow-xl">
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
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold text-brand-black mb-2">
              Sign Up
            </h1>
            <p className="text-base font-medium text-brand-gray">
              Create your account to get started
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="firstName"
                  className="text-sm font-normal text-brand-black"
                >
                  First Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-mid-gray" />
                  <Input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange('firstName')}
                    placeholder="First name"
                    className="pl-10 bg-brand-bg-2 border-brand-stroke rounded-xl h-12"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="lastName"
                  className="text-sm font-normal text-brand-black"
                >
                  Last Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-mid-gray" />
                  <Input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange('lastName')}
                    placeholder="Last name"
                    className="pl-10 bg-brand-bg-2 border-brand-stroke rounded-xl h-12"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-normal text-brand-black"
              >
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-mid-gray" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange('email')}
                  placeholder="your@email.com"
                  className="pl-10 bg-brand-bg-2 border-brand-stroke rounded-xl h-12"
                  required
                />
              </div>
            </div>

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
                  value={formData.phoneNumber}
                  onChange={handleChange('phoneNumber')}
                  placeholder="+254 700 000 000"
                  className="pl-10 bg-brand-bg-2 border-brand-stroke rounded-xl h-12"
                  required
                />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start space-x-3">
              <Checkbox
                id="terms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, agreeToTerms: checked }))
                }
                className="h-5 w-5 mt-1"
                required
              />
              <Label
                htmlFor="terms"
                className="text-sm font-normal text-brand-black cursor-pointer leading-relaxed"
              >
                I agree to the{' '}
                <Link
                  to="/terms"
                  className="text-brand-primary-start hover:text-brand-primary-end"
                >
                  Terms & Conditions
                </Link>{' '}
                and{' '}
                <Link
                  to="/privacy"
                  className="text-brand-primary-start hover:text-brand-primary-end"
                >
                  Privacy Policy
                </Link>
              </Label>
            </div>

            {/* Register Button */}
            <Button
              type="submit"
              variant="gradient"
              className="w-full h-12 rounded-3xl text-base font-medium"
              disabled={!formData.agreeToTerms}
            >
              Create Account
            </Button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 text-center">
            <p className="text-sm text-brand-gray">
              Already have an account?{' '}
              <Link
                to="/signin"
                className="text-brand-primary-start hover:text-brand-primary-end font-medium"
              >
                Sign In
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export const Route = createFileRoute('/_auth/signup')({
  component: RegisterScreen,
})
