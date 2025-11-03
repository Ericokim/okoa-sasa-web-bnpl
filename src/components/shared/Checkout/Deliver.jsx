import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Package, MapPin } from 'lucide-react'
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
import { Textarea } from '@/components/ui/textarea'
import { ListIcon, PinIcon, SingleUserIcon, WorldIcon } from '@/assets/icons'
import { CustomSelect } from '../Inputs/CustomSelect'
import { FormInput } from '../Inputs/FormInputs'
import { FormSelect } from '../Inputs/FormSelect'
import { FormTextarea } from '../Inputs/FormTextarea'
import { kenyaPhoneSchema, PhoneInput } from '../Inputs/FormPhone'
import { useStateContext } from '@/context/state-context'

// Base schema for common fields
const baseSchema = {
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  recipientNumber: kenyaPhoneSchema,
  region: z.string().min(1, 'Please select a region'),
}

// Schema for door delivery
const doorDeliverySchema = z.object({
  ...baseSchema,
  deliveryAddress: z.string().min(1, 'Delivery address is required'),
  pickupStore: z.string().optional(),
})

// Schema for pickup station
const pickupStationSchema = z.object({
  ...baseSchema,
  pickupStore: z.string().min(1, 'Please select a pickup store'),
  deliveryAddress: z.string().optional(),
})

export default function DeliveryDetailsForm({
  onNext,
  onPrevious,
  isFirstStep,
  isLastStep,
}) {
  const { saveCheckoutFormData, getCheckoutFormData } = useStateContext()

  const savedData = getCheckoutFormData(3)

  const [deliveryType, setDeliveryType] = useState(
    savedData?.deliveryType || 'door',
  )

  // Choose schema based on delivery type
  const currentSchema =
    deliveryType === 'door' ? doorDeliverySchema : pickupStationSchema

  const form = useForm({
    resolver: zodResolver(currentSchema),
    defaultValues: savedData || {
      firstName: '',
      lastName: '',
      recipientNumber: '',
      region: '',
      pickupStore: '',
      deliveryAddress: '',
    },
  })

  useEffect(() => {
    if (savedData && Object.keys(savedData).length > 0) {
      form.reset(savedData)
      if (savedData.deliveryType) {
        setDeliveryType(savedData.deliveryType)
      }
    }
  }, [savedData, form])

  // Reset validation when delivery type changes
  useEffect(() => {
    form.clearErrors()
  }, [deliveryType, form])

  const onSubmit = (data) => {
    const dataWithType = { ...data, deliveryType }
    console.log(dataWithType)
    // Save form data to context
    saveCheckoutFormData(3, dataWithType)
    onNext()
  }

  const handleDeliveryTypeChange = (type) => {
    setDeliveryType(type)
    // Clear the field that's not needed for the selected type
    if (type === 'door') {
      form.setValue('pickupStore', '')
    } else {
      form.setValue('deliveryAddress', '')
    }
  }

  // Options arrays
  const regionOptions = [
    { value: 'nairobi', label: 'Nairobi' },
    { value: 'kisumu', label: 'Kisumu' },
    { value: 'coast', label: 'Coast' },
    { value: 'eastern', label: 'Eastern' },
  ]

  const pickupStoreOptions = [
    { value: 'store1', label: 'Main Street Store' },
    { value: 'store2', label: 'City Center Post' },
    { value: 'store3', label: 'Westlands Station' },
  ]

  return (
    <div className="flex flex-col items-center justify-center mb-[50px] p-0 md:p-0 gap-6">
      {/* Form Container - Height now adjusts automatically */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 md:p-6 w-full ">
        <div className="w-full">
          <div className="mb-4 md:mb-0 md:h-16">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-1">
              Delivery Details
            </h2>
            <p className="text-gray-500 text-xs md:text-sm">
              {deliveryType === 'door'
                ? 'Fill in your preferred delivery location (Home or Office Address)'
                : 'I would like to pick up my package at the closest pick up point.'}
            </p>
          </div>

          <div className="h-px bg-gray-300 my-4 md:my-6"></div>

          {/* Delivery Type Toggle */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
            <button
              type="button"
              onClick={() => handleDeliveryTypeChange('door')}
              className={`flex items-center gap-2 p-3 md:p-4 rounded-lg border-2 transition-all ${
                deliveryType === 'door'
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  deliveryType === 'door'
                    ? 'border-orange-500'
                    : 'border-gray-300'
                }`}
              >
                {deliveryType === 'door' && (
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                )}
              </div>
              <div className="text-left">
                <div className="font-medium text-sm md:text-base text-gray-900">
                  Door Delivery
                </div>
                <div className="text-xs text-gray-500">
                  We'll deliver to your doorstep
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleDeliveryTypeChange('pickup')}
              className={`flex items-center gap-2 p-3 md:p-4 rounded-lg border-2 transition-all ${
                deliveryType === 'pickup'
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  deliveryType === 'pickup'
                    ? 'border-orange-500'
                    : 'border-gray-300'
                }`}
              >
                {deliveryType === 'pickup' && (
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                )}
              </div>
              <div className="text-left">
                <div className="font-medium text-sm md:text-base text-gray-900">
                  Pickup Station
                </div>
                <div className="text-xs text-gray-500">
                  Pickup at a station near you
                </div>
              </div>
            </button>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 md:space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-[50px]">
                <FormInput
                  control={form.control}
                  name="firstName"
                  label="First Name"
                  placeholder="Enter your First Name"
                  icon={SingleUserIcon}
                />

                <FormInput
                  control={form.control}
                  name="lastName"
                  label="Last Name"
                  placeholder="Enter your Last Name"
                  icon={SingleUserIcon}
                />
              </div>

              {deliveryType === 'door' ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-[50px]">
                    <FormInput
                      control={form.control}
                      name="recipientNumber"
                      label="Recipient Number"
                      placeholder="Enter Recipient Number"
                      icon={ListIcon}
                    />

                    <FormSelect
                      control={form.control}
                      name="region"
                      label="Region"
                      placeholder="Enter your region"
                      options={regionOptions}
                      icon={WorldIcon}
                    />
                  </div>

                  <div className="grid grid-cols-1">
                    <FormTextarea
                      control={form.control}
                      name="deliveryAddress"
                      label="Delivery Address"
                      placeholder="Enter delivery address"
                      minRows={3}
                      maxRows={6}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-[50px]">
                    {/* <FormInput
                      control={form.control}
                      name="recipientNumber"
                      label="Recipient Number"
                      placeholder="Enter Recipient Number"
                      icon={ListIcon}
                    /> */}
                    <PhoneInput
                      control={form.control}
                      name="recipientNumber"
                      label="Recipient Number"
                      placeholder="Enter Recipient Number"
                      icon={ListIcon}
                    />

                    <FormSelect
                      control={form.control}
                      name="region"
                      label="Region"
                      placeholder="Enter your region"
                      options={regionOptions}
                      icon={WorldIcon}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-[50px]">
                    <FormSelect
                      control={form.control}
                      name="pickupStore"
                      label="Pick Up Store / Post"
                      placeholder="Location"
                      options={pickupStoreOptions}
                      icon={PinIcon}
                    />
                    <div className="hidden md:block"></div>
                  </div>
                </>
              )}
            </form>
          </Form>
        </div>
      </div>

      {/* Buttons Container - Completely Outside */}
      <div className="flex flex-col md:flex-row justify-end gap-3 md:gap-4 w-full max-w-full">
        <Button
          onClick={onPrevious}
          disabled={isFirstStep}
          type="button"
          variant="outline"
          className="flex justify-center items-center px-4 py-3 w-full md:w-[146px] h-[46px] rounded-3xl border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-medium disabled:opacity-50"
        >
          Back{' '}
        </Button>
        <Button
          type="button"
          onClick={form.handleSubmit(onSubmit)}
          disabled={isLastStep}
          className="flex justify-center items-center px-4 py-3 w-full md:w-[193px] h-[46px] bg-linear-to-b from-[#F8971D] to-[#EE3124] hover:opacity-90 text-white rounded-3xl font-medium disabled:opacity-50"
        >
          Next: Delivery Details
        </Button>
      </div>
    </div>
  )
}
