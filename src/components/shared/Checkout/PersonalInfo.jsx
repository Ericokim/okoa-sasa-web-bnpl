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
    // resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      fullName: '',
      nationalId: '',
      employer: '',
      employeeNumber: 'OKOA085',
      email: '',
      phoneNumber: '004583',
    },
  })

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-0 gap-6">
      {/* Form Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 w-full max-w-[1020px]">
        <div className="w-full">
          <div className="h-auto sm:h-16 mb-4 sm:mb-0">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1">
              Personal Info
            </h2>
            <p className="text-gray-500 text-sm">
              Fill in your personal details
            </p>
          </div>

          <div className="h-0.5 bg-gray-300 my-4 sm:my-6"></div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
              {/* Row 1: Full Name and National ID */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-[50px] h-auto sm:h-[75px]">
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
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            placeholder="Enter your Full Name"
                            className="pl-10 h-11 border-gray-300 bg-gray-50"
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
                          <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            placeholder="Enter ID Number"
                            type={'number'}
                            className="pl-10 h-11 border-gray-300 bg-gray-50"
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
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-[50px] h-auto sm:h-[75px]">
                <FormField
                  control={form.control}
                  name="employer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm mb-[3px] font-medium text-gray-900">
                        Employer
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <div className="relative">
                            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10 pointer-events-none" />
                            <SelectTrigger className="pl-10 h-11 w-full border-gray-300 bg-gray-50">
                              <SelectValue placeholder="Employer Name" />
                            </SelectTrigger>
                          </div>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="company1">Company One</SelectItem>
                          <SelectItem value="company2">Company Two</SelectItem>
                          <SelectItem value="company3">
                            Company Three
                          </SelectItem>
                        </SelectContent>
                      </Select>
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
                          <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            placeholder="OKOA085"
                            className="pl-10 h-11 bg-gray-50 border-gray-300 text-gray-500"
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
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-[50px] h-auto sm:h-[75px]">
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
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type="email"
                            placeholder="Enter your email"
                            className="pl-10 h-11 border-gray-300 bg-gray-50"
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
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            placeholder="004583"
                            className="pl-10 h-11 bg-gray-50 border-gray-300 text-gray-500"
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
      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 w-full max-w-[1020px]">
        <Button
          onClick={onPrevious}
          disabled={isFirstStep}
          type="button"
          variant="outline"
          className="flex flex-row justify-center items-center px-4 py-3 gap-2.5 w-full sm:w-[146px] h-[46px] rounded-3xl border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-medium disabled:opacity-50"
        >
          Return To Back
        </Button>
        <Button
          onClick={() => {
            form.handleSubmit(onSubmit)()
            onNext()
          }}
          disabled={isLastStep}
          className="flex flex-row justify-center items-center px-4 py-3 gap-2.5 w-full sm:w-[193px] h-[46px] bg-gradient-to-b from-[#F8971D] to-[#EE3124] hover:opacity-90 text-white rounded-3xl font-medium disabled:opacity-50"
        >
          Next: Delivery Details
        </Button>
      </div>
    </div>
  )
}