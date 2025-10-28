import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { useStateContext } from '@/context/state-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent } from '@/components/ui/card'
import { Phone, X } from 'lucide-react'

function SigninScreen() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const navigate = useNavigate()
  const { login } = useStateContext()

  const handleLogin = (e) => {
    e.preventDefault()
    login({ phoneNumber, name: 'Demo User' })
    navigate({ to: '/otp' })
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
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold text-brand-black mb-2">
              Login
            </h1>
            <p className="text-base font-medium text-brand-gray">
              Login now to access the dashboard
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
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
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+254 700 000 000"
                  className="pl-10 bg-brand-bg-2 border-brand-stroke rounded-xl h-12"
                  required
                />
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center space-x-3">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={setRememberMe}
                className="h-5 w-5"
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
            >
              Login
            </Button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 text-center">
            <p className="text-sm text-brand-gray">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="text-brand-primary-start hover:text-brand-primary-end font-medium"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export const Route = createFileRoute('/_auth/signin')({
  component: SigninScreen,
})
