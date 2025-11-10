import { useEffect, useMemo, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Separator } from '@/components/ui/separator'
import { EditIcon } from '@/assets/icons'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import {
  EmailIcon,
  PhoneIcon,
  SingleUserIcon,
  UserFileIcon,
  UserCardIcon,
  UserMsgIcon,
} from '@/assets/icons'
import { PhoneInput } from '@/components/shared/Inputs/FormPhone'
import { FormInput } from '@/components/shared/Inputs/FormInputs'
import { useStateContext } from '@/context/state-context'
import { useUpdateUser } from '@/lib/queries/user'
import { normalizeKenyanPhoneNumber } from '@/lib/validation'

// Validation schema
const personalInfoSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  phoneNumber: z
    .string()
    .min(1, 'Phone number is required')
    .refine(
      (value) => {
        if (!value || value.trim() === '') return false
        const cleaned = value.replace(/\s/g, '')
        if (cleaned.startsWith('+254')) {
          return cleaned.length === 13 && /^\+254\d{9}$/.test(cleaned)
        }
        if (cleaned.startsWith('0')) {
          return cleaned.length === 10 && /^0\d{9}$/.test(cleaned)
        }
        return false
      },
      {
        message: 'Please enter a valid Kenyan phone number',
      },
    ),
  company: z.string().min(1, 'Company is required'),
  idNumber: z
    .string()
    .min(1, 'ID number is required')
    .min(6, 'ID number must be at least 6 digits'),
  employeeNumber: z.string().min(1, 'Employee number is required'),
})

const splitName = (fullName = '') => {
  if (!fullName) return { firstName: '', lastName: '' }
  const parts = fullName.trim().split(/\s+/)
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: '' }
  }
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(' '),
  }
}

const buildInitialValues = (user) => {
  const names = splitName(user?.fullName)
  return {
    firstName: user?.firstName || names.firstName || '',
    lastName: user?.lastName || names.lastName || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    company: user?.employer || user?.company || '',
    idNumber: user?.idNumber || '',
    employeeNumber: user?.employeeNumber || user?.employeeId || '',
  }
}

export function RouteComponent() {
  const { user, login } = useStateContext()
  const [editing, setEditing] = useState(false)
  const initialValues = useMemo(() => buildInitialValues(user), [user])


  // // Single useProducts call - no conditional hooks
  // const { data:masokoproducts, isLoading:isMasokoProductsLoading, error:masokoError } = useProducts({
  //   amount: 20000,
  //   organization: "liberty",
  //   channel: "ussd",
  // });

  // console.log(masokoproducts)


  // Initialize form with personalInfo
  const form = useForm({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: initialValues,
  })

  useEffect(() => {
    form.reset(initialValues)
  }, [form, initialValues])

  const updateUserMutation = useUpdateUser({
    onSuccess: (_response, variables) => {
      const formattedFullName =
        variables?.fullName ||
        `${form.getValues('firstName')} ${form.getValues('lastName')}`.trim()
      login?.({
        ...(user || {}),
        fullName: formattedFullName,
        lastName: variables?.lastName ?? form.getValues('lastName'),
        email: variables?.email,
        phoneNumber: variables?.phoneNumber,
        employer: variables?.employer,
        company: variables?.employer,
        idNumber: variables?.idNumber,
        employeeNumber: variables?.employeeNumber,
      })
      setEditing(false)
    },
  })

  const userId =
    user?.id || user?.userId || user?.userID || user?.idNumber || undefined

  const handleSave = (data) => {
    if (!userId) return

    const normalizedPhone = normalizeKenyanPhoneNumber(data.phoneNumber)
    const payload = {
      userId,
      idNumber: data.idNumber.trim(),
      phoneNumber: normalizedPhone,
      fullName: `${data.firstName} ${data.lastName}`
        .replace(/\s+/g, ' ')
        .trim(),
      lastName: data.lastName.trim(),
      email: data.email.trim(),
      employer: data.company.trim(),
      employeeNumber: data.employeeNumber.trim(),
      isStaff: Boolean(user?.isStaff),
      roles: Array.isArray(user?.roles)
        ? user.roles.map((role) => role?.roleId || role?.name).filter(Boolean)
        : [],
    }

    console.log('profile', payload)

    updateUserMutation.mutate(payload)
  }

  const handleCancel = () => {
    form.reset(initialValues)
    setEditing(false)
  }

  const handleEdit = () => {
    form.reset(initialValues)
    setEditing(true)
  }

  return (
    <div className="border rounded-xl p-6 bg-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-sans text-2xl font-medium leading-9 capitalize text-black">
          Personal Information
        </h2>

        {!editing && (
          <button
            onClick={handleEdit}
            className="cursor-pointer flex items-center gap-1 rounded-full border border-orange-500 px-3 py-1 text-sm text-orange-600 hover:bg-orange-50"
          >
            <EditIcon />
            Edit
          </button>
        )}
      </div>

      <Separator className="mb-6" />

      {/* ========== VIEW MODE ========== */}
      {!editing ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          {/* First Name */}
          <div>
            <p className="font-sans text-base font-normal leading-[22px] text-gray-600">
              First Name
            </p>
            <p className="font-sans font-medium text-[18px] leading-[25px] text-[#252525]">
              {initialValues.firstName || '—'}
            </p>
          </div>

          {/* Last Name */}
          <div>
            <p className="font-sans text-base font-normal leading-[22px] text-gray-600">
              Last Name
            </p>
            <p className="font-sans font-medium text-[18px] leading-[25px] text-[#252525]">
              {initialValues.lastName || '—'}
            </p>
          </div>

          {/* Email */}
          <div>
            <p className="font-sans text-base font-normal leading-[22px] text-gray-600">
              Email Address
            </p>
            <p className="font-sans font-medium text-[18px] leading-[25px] text-[#252525]">
              {initialValues.email || '—'}
            </p>
          </div>

          {/* Phone */}
          <div>
            <p className="font-sans text-base font-normal leading-[22px] text-gray-600">
              Phone Number
            </p>
            <p className="font-sans font-medium text-[18px] leading-[25px] text-[#252525]">
              {initialValues.phoneNumber || '—'}
            </p>
          </div>

          {/* Employee No */}
          <div>
            <p className="font-sans text-base font-normal leading-[22px] text-gray-600">
              Employee No
            </p>
            <p className="font-sans font-medium text-[18px] leading-[25px] text-[#252525]">
              {initialValues.employeeNumber || '—'}
            </p>
          </div>

          {/* Company */}
          <div>
            <p className="font-sans text-base font-normal leading-[22px] text-gray-600">
              Company
            </p>
            <p className="font-sans font-medium text-[18px] leading-[25px] text-[#252525]">
              {initialValues.company || '—'}
            </p>
          </div>

          {/* idNumber No */}
          <div>
            <p className="font-sans text-base font-normal leading-[22px] text-gray-600">
              idNumber No
            </p>
            <p className="font-sans font-medium text-[18px] leading-[25px] text-[#252525]">
              {initialValues.idNumber || '—'}
            </p>
          </div>
        </div>
      ) : (
        /* ========== EDIT MODE ========== */
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)} className="space-y-6">
            {/* Row 1: First Name + Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                control={form.control}
                name="firstName"
                label="First Name"
                placeholder="Enter your first name"
                icon={SingleUserIcon}
              />
              <FormInput
                control={form.control}
                name="lastName"
                label="Last Name"
                placeholder="Enter your last name"
                icon={SingleUserIcon}
              />
            </div>

            {/* Row 2: Company + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                control={form.control}
                name="company"
                label="Company"
                placeholder="Enter your company"
                icon={UserCardIcon}
              />
              <FormInput
                control={form.control}
                name="email"
                label="Email"
                placeholder="Enter your email"
                type="email"
                icon={EmailIcon}
              />
            </div>

            {/* Row 3: Phone + idNumber No */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <PhoneInput
                control={form.control}
                name="phoneNumber"
                label="Phone Number"
                placeholder="+254712345678 or 0712345678"
                icon={PhoneIcon}
              />
              <FormInput
                control={form.control}
                name="idNumber"
                label="ID Number"
                placeholder="Enter ID number (6+ digits)"
                icon={UserFileIcon}
                numbersOnly={true}
              />
            </div>

            {/* Row 4: Employee No */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <FormInput
                  control={form.control}
                  name="employeeNumber"
                  label="Employee Number"
                  placeholder="Enter employee number"
                  icon={UserMsgIcon}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white rounded-full py-2 font-medium transition-colors"
                disabled={updateUserMutation.isPending}
              >
                {updateUserMutation.isPending ? 'Saving...' : 'Save'}
              </Button>
              <Button
                type="button"
                onClick={handleCancel}
                variant="outline"
                className="flex-1 border border-gray-300 rounded-full py-2 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}

export const Route = createFileRoute('/_protected/profile/PersonalInfoCard')({
  component: RouteComponent,
})

export const component = RouteComponent
export const PersonalInfoCard = RouteComponent
