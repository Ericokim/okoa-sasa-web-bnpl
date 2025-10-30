import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { User, MapPin, Home, Package } from 'lucide-react'
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
import { Textarea } from '@/components/ui/textarea'

export default function DeliveryDetailsForm({
  onNext,
  onPrevious,
  isFirstStep,
  isLastStep,
}) {
  const [deliveryType, setDeliveryType] = useState('door')

  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      recipientNumber: '',
      region: '',
      pickupStore: '',
      deliveryAddress: '',
    },
  })

  const onSubmit = (data) => {
    console.log({ ...data, deliveryType })
  }

  const containerHeight =
    deliveryType === 'door' ? 'md:h-[569px]' : 'md:h-[529px]'

  return (
    <div className="flex flex-col mb-6 items-center justify-center p-4 md:p-0 gap-6">
      {/* Form Container */}
      <div
        className={`bg-white rounded-2xl shadow-sm border border-gray-200 p-4 md:p-6 w-full max-w-[1020px] ${containerHeight}`}
      >
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

          <div className="h-0.5 bg-gray-300 my-4 md:my-6"></div>

          {/* Delivery Type Toggle */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
            <button
              type="button"
              onClick={() => setDeliveryType('door')}
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
              onClick={() => setDeliveryType('pickup')}
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
            <div className="space-y-4 md:space-y-6">
              {/* Row 1: First Name and Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 md:h-[75px] gap-4 md:gap-[50px]">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm mb-[3px] font-medium text-gray-900">
                        First Name
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            placeholder="Enter your First Name"
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
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm mb-[3px] font-medium text-gray-900">
                        Last Name
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            placeholder="Enter your Last Name"
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

              {/* Row 2: Conditional - Door Delivery or Pickup Station */}
              {deliveryType === 'door' ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 md:h-[75px] gap-4 md:gap-[50px]">
                    <FormField
                      control={form.control}
                      name="recipientNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm mb-[3px] font-medium text-gray-900">
                            Recipient Number
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <Input
                                placeholder="Enter Recipient Number"
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
                      name="region"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm mb-[3px] font-medium text-gray-900">
                            Region
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10 pointer-events-none" />
                                <SelectTrigger className="pl-10 h-11 w-full border-gray-300 bg-gray-50">
                                  <SelectValue placeholder="Enter your region" />
                                </SelectTrigger>
                              </div>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="nairobi">Nairobi</SelectItem>
                              <SelectItem value="kisumu">Kisumu</SelectItem>
                              <SelectItem value="coast">Coast</SelectItem>
                              <SelectItem value="eastern">Eastern</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="hidden md:block"></div>
                  </div>

                  <div className="grid grid-cols-1 md:h-[75px]">
                    <FormField
                      control={form.control}
                      name="deliveryAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm mb-[3px] font-medium text-gray-900">
                            Delivery Address
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter delivery address"
                              className=" md:h-11 border-gray-300 bg-gray-50 resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 md:h-[75px] gap-4 md:gap-[50px]">
                    <FormField
                      control={form.control}
                      name="recipientNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm mb-[3px] font-medium text-gray-900">
                            Recipient Number
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <Input
                                placeholder="Enter Recipient Number"
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
                      name="region"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm mb-[3px] font-medium text-gray-900">
                            Region
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10 pointer-events-none" />
                                <SelectTrigger className="pl-10 h-11 w-full border-gray-300 bg-gray-50">
                                  <SelectValue placeholder="Enter your region" />
                                </SelectTrigger>
                              </div>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="nairobi">Nairobi</SelectItem>
                              <SelectItem value="kisumu">Kisumu</SelectItem>
                              <SelectItem value="coast">Coast</SelectItem>
                              <SelectItem value="eastern">Eastern</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 md:h-[75px] gap-4 md:gap-[50px]">
                    <FormField
                      control={form.control}
                      name="pickupStore"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm mb-[3px] font-medium text-gray-900">
                            Pick Up Store / Post
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10 pointer-events-none" />
                                <SelectTrigger className="pl-10 h-11 w-full border-gray-300 bg-gray-50">
                                  <SelectValue placeholder="Location" />
                                </SelectTrigger>
                              </div>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="store1">
                                Main Street Store
                              </SelectItem>
                              <SelectItem value="store2">
                                City Center Post
                              </SelectItem>
                              <SelectItem value="store3">
                                Westlands Station
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="hidden md:block"></div>
                  </div>
                </>
              )}
            </div>
          </Form>
        </div>
      </div>

      {/* Buttons Container - Completely Outside */}
      <div className="flex flex-col md:flex-row justify-end gap-3 md:gap-4 w-full max-w-[1020px]">
        <Button
          onClick={onPrevious}
          disabled={isFirstStep}
          type="button"
          variant="outline"
          className="flex justify-center items-center px-4 py-3 w-full md:w-[146px] h-[46px] rounded-3xl border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-medium disabled:opacity-50"
        >
          Return To Back
        </Button>
        <Button
          type="button"
          onClick={() => {
            form.handleSubmit(onSubmit)()
            onNext()
          }}
          disabled={isLastStep}
          className="flex justify-center items-center px-4 py-3 w-full md:w-[193px] h-[46px] bg-gradient-to-b from-[#F8971D] to-[#EE3124] hover:opacity-90 text-white rounded-3xl font-medium disabled:opacity-50"
        >
          Next: Delivery Details
        </Button>
      </div>
    </div>
  )
}
