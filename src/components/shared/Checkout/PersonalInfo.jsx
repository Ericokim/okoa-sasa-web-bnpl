import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { User, CreditCard, Building2, Mail, Phone } from 'lucide-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { EmailIcon, PhoneIcon, SingleUserIcon, UserCardIcon, UserFileIcon, UserMsgIcon } from '@/assets/icons'
import { CustomSelect } from '../Inputs/CustomSelect'

const personalInfoSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  nationalId: z.string().min(1, 'National ID is required'),
  employer: z.string().min(1, 'Please select an employer'),
  employeeNumber: z.string().min(1, 'Employee number is required'),
  email: z.string().email('Please enter a valid email address'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
})

export default function PersonalInfoForm({
  onNext,
  onPrevious,
  isFirstStep,
  isLastStep,
}) {
  const form = useForm({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      fullName: '',
      nationalId: '',
      employer: '',
      employeeNumber: '',
      email: '',
      phoneNumber: '',
    },
  })

    const companyOptions = [
    { value: 'company1', label: 'Company One' },
    { value: 'company2', label: 'Company Two' },
    { value: 'company3', label: 'Company Three' },
    { value: 'company4', label: 'Company Four' },
  ]

  const onSubmit = (data) => {
    console.log(data)
    // Only proceed to next step if validation passes
    onNext()
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-0 gap-6">
      {/* Form Container */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 w-full">
        <div className="w-full">
          <div className="mb-4 sm:mb-0">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1">
              Personal Info
            </h2>
            <p className="text-gray-500 text-sm">
              Fill in your personal details
            </p>
          </div>

          <div className="h-px bg-gray-300 my-4 sm:my-6"></div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 sm:space-y-6"
            >
              {/* Row 1: Full Name and National ID */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-[50px]">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm mb-[3px] font-medium text-gray-900">
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <SingleUserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            placeholder="Enter your Full Name"
                            className="pl-10 h-11 border-gray-300 bg-gray-50 focus-visible:ring-orange-500 invalid:border-orange-300"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nationalId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm mb-[3px] font-medium text-gray-900">
                        National ID Number
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <UserFileIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            placeholder="Enter ID Number"
                            type={'number'}
                            className="pl-10 h-11 border-gray-300 bg-gray-50 focus-visible:ring-orange-500 invalid:border-orange-300"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Row 2: Employer and Employee Number */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-[50px]">
                <FormField
                  control={form.control}
                  name="employer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm mb-[3px] font-medium text-gray-900">
                        Employer
                      </FormLabel>
                      
                        <FormControl>
                          
                          <CustomSelect
                                                        icon={UserCardIcon}
                                                        placeholder="Employer Name"
                                                        options={companyOptions}
                                                        value={field.value}
                                                        onValueChange={field.onChange}
                                                      />
                        </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="employeeNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm mb-[3px] font-medium text-gray-900">
                        Employee Number
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <UserMsgIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            placeholder="OKOA085"
                            className="pl-10 h-11 bg-gray-50 border-gray-300 text-gray-500 focus-visible:ring-orange-500 invalid:border-orange-300"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Row 3: Email and Phone Number */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-[50px]">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm mb-[3px] font-medium text-gray-900">
                        Email
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <EmailIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type="email"
                            placeholder="Enter your email"
                            className="pl-10 h-11 border-gray-300 bg-gray-50 focus-visible:ring-orange-500 invalid:border-orange-300"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm mb-[3px] font-medium text-gray-900">
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            placeholder="004583"
                            className="pl-10 h-11 bg-gray-50 border-gray-300 text-gray-500 focus-visible:ring-orange-500 invalid:border-orange-300"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </div>
      </div>

      {/* Buttons Container - Completely Outside */}
      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 w-full max-w-full">
        <Button
          onClick={onPrevious}
          disabled={isFirstStep}
          type="button"
          variant="outline"
          className="flex flex-row justify-center items-center px-4 py-3 gap-2.5 w-full sm:w-[146px] h-[46px] rounded-3xl border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-medium disabled:opacity-50"
        >
          Back{' '}
        </Button>
        <Button
          onClick={form.handleSubmit(onSubmit)}
          disabled={isLastStep}
          type="button"
          className="flex flex-row justify-center items-center px-4 py-3 gap-2.5 w-full sm:w-[193px] h-[46px] bg-gradient-to-b from-[#F8971D] to-[#EE3124] hover:opacity-90 text-white rounded-3xl font-medium disabled:opacity-50"
        >
          Next: Delivery Details
        </Button>
      </div>
    </div>
  )
}