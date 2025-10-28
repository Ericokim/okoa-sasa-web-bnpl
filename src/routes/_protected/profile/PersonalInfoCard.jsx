import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'
import { Edit2Icon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAccountStore } from '@/data/accountStore'
import gsap from 'gsap'

export const Route = createFileRoute('/_protected/profile/PersonalInfoCard')({
  component: RouteComponent,
})

export function PersonalInfoCard() {
  const { personalInfo, updatePersonalInfo } = useAccountStore()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    email: personalInfo.email,
    phone: personalInfo.phone,
  })
  const cardRef = useRef(null)
  const editFormRef = useRef(null)

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.1, ease: 'power2.out' },
      )
    }
  }, [])

  useEffect(() => {
    if (editFormRef.current) {
      if (isEditing) {
        gsap.fromTo(
          editFormRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' },
        )
      }
    }
  }, [isEditing])

  const handleSave = () => {
    updatePersonalInfo(formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({
      firstName: personalInfo.firstName,
      lastName: personalInfo.lastName,
      email: personalInfo.email,
      phone: personalInfo.phone,
    })
    setIsEditing(false)
  }

  return (
    <Card
      ref={cardRef}
      className="border-2 border-transparent bg-linear-to-r from-primary/10 to-secondary/10 p-0.5 rounded-lg"
    >
      <div className="bg-card rounded-lg h-full">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-sans font-semibold text-foreground">
              Personal Information
            </CardTitle>
            {!isEditing && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditing(true)}
                className="bg-transparent text-primary hover:bg-primary/10 hover:text-primary"
                aria-label="Edit personal information"
              >
                <Edit2Icon className="w-5 h-5" strokeWidth={1.5} />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {!isEditing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-body font-medium text-muted-foreground uppercase tracking-wide">
                    First Name
                  </p>
                  <p className="text-sm font-body text-foreground mt-1">
                    {personalInfo.firstName}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-body font-medium text-muted-foreground uppercase tracking-wide">
                    Last Name
                  </p>
                  <p className="text-sm font-body text-foreground mt-1">
                    {personalInfo.lastName}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-xs font-body font-medium text-muted-foreground uppercase tracking-wide">
                  Email
                </p>
                <p className="text-sm font-body text-foreground mt-1">
                  {personalInfo.email}
                </p>
              </div>
              <div>
                <p className="text-xs font-body font-medium text-muted-foreground uppercase tracking-wide">
                  Phone
                </p>
                <p className="text-sm font-body text-foreground mt-1">
                  {personalInfo.phone}
                </p>
              </div>
              <div>
                <p className="text-xs font-body font-medium text-muted-foreground uppercase tracking-wide">
                  Designation
                </p>
                <p className="text-sm font-body text-foreground mt-1">
                  {personalInfo.role}
                </p>
              </div>
            </div>
          ) : (
            <div ref={editFormRef} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="firstName"
                    className="text-sm font-body font-medium text-foreground"
                  >
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className="bg-muted border-border text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="lastName"
                    className="text-sm font-body font-medium text-foreground"
                  >
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className="bg-muted border-border text-foreground"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-body font-medium text-foreground"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="bg-muted border-border text-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="phone"
                  className="text-sm font-body font-medium text-foreground"
                >
                  Phone
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="bg-muted border-border text-foreground"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <Button
                  onClick={handleSave}
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-body font-normal"
                >
                  Save Changes
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="flex-1 bg-background text-foreground border-border hover:bg-accent hover:text-accent-foreground font-body font-normal"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </div>
    </Card>
  )
}
