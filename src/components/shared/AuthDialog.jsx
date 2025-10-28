import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useStateContext } from '@/context/state-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Phone, User, Mail, X } from 'lucide-react'

export function AuthDialog({ open, onOpenChange, redirectTo = '/' }) {
  const [mode, setMode] = useState('signin')
  const [formData, setFormData] = useState({
    phoneNumber: '',
    rememberMe: false,
    firstName: '',
    lastName: '',
    email: '',
    agreeToTerms: false,
  })

  const navigate = useNavigate()
  const { login } = useStateContext()

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target?.value ?? e,
    }))
  }

  const handleSignin = (e) => {
    e.preventDefault()
    login({ phoneNumber: formData.phoneNumber, name: 'Demo User' })
    onOpenChange(false)
    navigate({ to: redirectTo })
  }

  const handleSignup = (e) => {
    e.preventDefault()
    login({
      phoneNumber: formData.phoneNumber,
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
    })
    onOpenChange(false)
    navigate({ to: redirectTo })
  }

  const resetForm = () => {
    setFormData({
      phoneNumber: '',
      rememberMe: false,
      firstName: '',
      lastName: '',
      email: '',
      agreeToTerms: false,
    })
  }

  const switchMode = (newMode) => {
    setMode(newMode)
    resetForm()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-xl p-8 border border-white/20">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-[180px] h-[160px] flex items-center justify-center">
            <img
              src="/primaryLogoVertical.png"
              alt="Okoa Sasa"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Header */}
        <DialogHeader className="text-center mb-8">
          <DialogTitle className="text-3xl font-semibold text-brand-black mb-2">
            {mode === 'signin' ? 'Login' : 'Sign Up'}
          </DialogTitle>
          <DialogDescription className="text-base font-medium text-brand-gray">
            {mode === 'signin'
              ? 'Login now to access the dashboard'
              : 'Create your account to get started'}
          </DialogDescription>
        </DialogHeader>

        {/* --- SIGN IN --- */}
        {mode === 'signin' ? (
          <form onSubmit={handleSignin} className="space-y-6">
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
                  className="pl-10 bg-brand-bg-2 border-brand-stroke rounded-xl h-12 text-base"
                  required
                />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Checkbox
                id="remember"
                checked={formData.rememberMe}
                onCheckedChange={handleChange('rememberMe')}
                className="h-5 w-5"
              />
              <Label
                htmlFor="remember"
                className="text-sm font-normal text-brand-black cursor-pointer"
              >
                Remember Me
              </Label>
            </div>

            <Button
              type="submit"
              variant="gradient"
              className="w-full h-12 rounded-3xl text-base font-medium"
            >
              Login
            </Button>

            <p className="text-center text-sm text-brand-gray">
              Don’t have an account?{' '}
              <button
                type="button"
                onClick={() => switchMode('signup')}
                className="text-brand-primary-start hover:text-brand-primary-end font-medium"
              >
                Sign Up
              </button>
            </p>
          </form>
        ) : (
          /* --- SIGN UP --- */
          <form onSubmit={handleSignup} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              {['firstName', 'lastName'].map((field) => (
                <div key={field} className="space-y-2">
                  <Label
                    htmlFor={field}
                    className="text-sm font-normal text-brand-black capitalize"
                  >
                    {field.replace(/([A-Z])/g, ' $1')}
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-mid-gray" />
                    <Input
                      id={field}
                      type="text"
                      value={formData[field]}
                      onChange={handleChange(field)}
                      placeholder={
                        field === 'firstName' ? 'First name' : 'Last name'
                      }
                      className="pl-10 bg-brand-bg-2 border-brand-stroke rounded-xl h-12 text-base"
                      required
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Email */}
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
                  className="pl-10 bg-brand-bg-2 border-brand-stroke rounded-xl h-12 text-base"
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label
                htmlFor="phone-signup"
                className="text-sm font-normal text-brand-black"
              >
                Phone Number
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-mid-gray" />
                <Input
                  id="phone-signup"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleChange('phoneNumber')}
                  placeholder="+254 700 000 000"
                  className="pl-10 bg-brand-bg-2 border-brand-stroke rounded-xl h-12 text-base"
                  required
                />
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start space-x-3">
              <Checkbox
                id="terms"
                checked={formData.agreeToTerms}
                onCheckedChange={handleChange('agreeToTerms')}
                className="h-5 w-5 mt-1"
                required
              />
              <Label
                htmlFor="terms"
                className="text-sm font-normal text-brand-black leading-relaxed cursor-pointer"
              >
                I agree to the{' '}
                <span className="font-medium text-brand-primary-start">
                  Terms & Conditions
                </span>{' '}
                and{' '}
                <span className="font-medium text-brand-primary-end">
                  Privacy Policy
                </span>
              </Label>
            </div>

            <Button
              type="submit"
              variant="gradient"
              className="w-full h-12 rounded-3xl text-base font-medium"
              disabled={!formData.agreeToTerms}
            >
              Create Account
            </Button>

            <p className="text-center text-sm text-brand-gray">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => switchMode('signin')}
                className="text-brand-primary-start hover:text-brand-primary-end font-medium"
              >
                Sign In
              </button>
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
