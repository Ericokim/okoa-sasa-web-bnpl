import React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import {
  DeviceIcon,
  FileIcon,
  HandMoneyIcon,
  SearchIcon,
  TruckTickIcon,
} from '@/assets/icons'

const steps = [
  {
    icon: <DeviceIcon size={50} className="text-white" />,
    title: 'Browse and choose your device.',
    step: '1 Step',
  },
  {
    icon: <HandMoneyIcon size={50} className="text-white" />,
    title: 'Check Your Loan Limit to Qualify',
    step: '2 Step',
  },
  {
    icon: <FileIcon size={50} className="text-white" />,
    title: 'Fill in your details and employer info.',
    step: '3 Step',
  },
  {
    icon: <SearchIcon size={50} className="text-white" />,
    title: 'We review your loan request.',
    step: '4 Step',
  },
  {
    icon: <TruckTickIcon size={50} className="text-white" />,
    title: 'Once approved, your device is delivered.',
    step: '5 Step',
  },
  {
    icon: <TruckTickIcon size={50} className="text-white" />,
    title: 'Loan repaid monthly via payroll checkoff.',
    step: '6 Step',
  },
]

const faqData = [
  {
    question: 'What is Okao Sasa?',
    answer:
      'Okao Sasa is an online marketplace that connects buyers and sellers, offering a wide range of unique items that can be purchased from the comfort of your home, office, or even while on the go. It also allows you to sell your own products to a broad audience. Items can be delivered to your doorstep or picked up from designated collection points nationwide.',
  },
  {
    question: 'What do I do in case I have forgotten my password?',
    answer:
      'Please visit the login page and click on the link next to \'Forgot your password?\'; enter the details of the email address that you used when you first registered your account. We will email you a link to this email address which you can click on to reset your password.',
  },
  {
    question: 'When can I place my order?',
    answer:
      'You can place your order at any time. Deliveries however will be done as per the timelines noted on the check-out page.',
  },
  {
    question: 'How soon from the time of ordering will my item be delivered?',
    answer:
      'We offer same day delivery on all orders made before 3pm are delivered same day within Nairobi. If outside nairobi delivery is made the next day. Orders made after 3pm will be processed the next day.The transit time-period is calculated strictly using business days, which excludes Sunday and Public holidays( Visit Shipping and Delivery Policy for more details)',
  },
]

const FAQs = () => {
  const [openStates, setOpenStates] = React.useState(faqData.map(() => false))
  const [currentSlide, setCurrentSlide] = React.useState(0)

  const toggleFAQ = (index) => {
    setOpenStates((prev) =>
      prev.map((state, i) => (i === index ? !state : state)),
    )
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 2 < steps.length ? prev + 2 : 0))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 2 >= 0 ? prev - 2 : Math.max(0, steps.length - 2)))
  }

  return (
    <div className="bg-white overflow-hidden relative w-full">
      {/* How It Works Section */}
      <div className="bg-white overflow-hidden relative w-full h-[485px] lg:h-[552px]">
        <div className="bg-linear-to-b from-[#f8971d] to-[#ee3124] h-[291px] lg:h-96 w-screen absolute left-0 top-0" />

        <div className="absolute left-1/2 top-[42px] lg:top-20 -translate-x-1/2 w-full max-w-[335px] lg:max-w-7xl px-5 lg:px-0">
          <div className="flex flex-col gap-10 lg:gap-[60px] items-center">
            {/* Header */}
            <div className="flex flex-col gap-2 items-center text-center w-full lg:max-w-[616px]">
              <div className="w-[67px] lg:w-[77px] h-0 border-t-4 border-white rotate-180 mb-2" />
              <h1 className="text-[24px] lg:text-[36px] font-semibold leading-[1.4] text-white capitalize">
                How It Works
              </h1>
              <p className="text-[14px] lg:text-[18px] font-semibold leading-[1.4] text-white capitalize">
                Simple steps to get your device with Okoa Sasa financing.
              </p>
            </div>

            {/* Desktop Grid */}
            <div className="hidden lg:grid grid-cols-6 gap-[12px] w-full">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="bg-white flex flex-col gap-[16px] items-center justify-center px-[12px] py-[16px] rounded-[16px] shadow-[0px_4px_24px_0px_rgba(37,37,37,0.08)] flex-1"
                >
                  <div className="bg-linear-to-b from-[#f8971d] to-[#ee3124] overflow-hidden rounded-full w-[80px] h-[80px] flex items-center justify-center">
                    {step.icon}
                  </div>
                  <div className="flex flex-col gap-[12px] items-center justify-center w-[178px]">
                    <p className="font-['Public_Sans'] text-base font-normal leading-[1.4] text-[#252525] text-center capitalize">
                      {step.title}
                    </p>
                  </div>
                  <div className="relative h-[30px] w-full">
                    <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-['Public_Sans'] text-[24px] font-semibold leading-[1.4] text-center capitalize bg-linear-to-b from-[#f8971d] to-[#ee3124] bg-clip-text" style={{ WebkitTextFillColor: 'transparent' }}>
                      {step.step}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Carousel */}
            <div className="relative lg:hidden w-full">
              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md"
                disabled={currentSlide === 0}
              >
                <ChevronLeft className="w-4 h-4 text-[#f8971d]" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md"
                disabled={currentSlide >= steps.length - 2}
              >
                <ChevronRight className="w-4 h-4 text-[#f8971d]" />
              </button>

              {/* Carousel Container */}
              <div className="overflow-hidden mx-8">
                <div
                  className="flex transition-transform duration-300 ease-in-out gap-3"
                  style={{ transform: `translateX(-${(currentSlide * 100) / 2}%)` }}
                >
                  {steps.map((step, index) => (
                    <div
                      key={index}
                      className="bg-white flex flex-col gap-4 items-center justify-center px-3 py-4 rounded-2xl shadow-[0px_4px_24px_0px_rgba(37,37,37,0.08)] min-w-[50%] shrink-0"
                    >
                      <div className="bg-linear-to-b from-[#f8971d] to-[#ee3124] overflow-hidden rounded-full w-[80px] h-[80px] flex items-center justify-center">
                        {step.icon}
                      </div>
                      <div className="flex flex-col gap-3 items-center justify-center w-[178px]">
                        <p className="font-['Public_Sans'] text-[18px] font-semibold leading-[1.4] text-[#252525] text-center capitalize">
                          {step.title}
                        </p>
                      </div>
                      <div className="relative h-[30px] w-full">
                        <div className="absolute left-0 w-[30px] h-[30px] rounded-full">
                          <div className="w-full h-full bg-linear-to-b from-[#f8971d] to-[#ee3124] rounded-full" />
                        </div>
                        <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-['Public_Sans'] text-[24px] font-semibold leading-[1.4] text-center capitalize bg-linear-to-b from-[#f8971d] to-[#ee3124] bg-clip-text" style={{ WebkitTextFillColor: 'transparent' }}>
                          {step.step}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="w-full px-5 lg:px-20 py-6 lg:py-5">
        <div className="max-w-[335px] lg:max-w-7xl mx-auto">
          <div className="flex flex-col gap-4 lg:gap-14 items-center lg:items-start w-full">
            {/* Header */}
            <div className="flex flex-col gap-4 lg:gap-6 items-center w-full">
              <div className="w-[77px] h-0 border-t-4 border-[#f8971d] rotate-180" />
              <div className="flex flex-col gap-2 lg:gap-3 items-center text-center">
                <h1 className="font-['Public_Sans'] text-[24px] lg:text-[36px] font-semibold leading-[1.4] text-[#1c1f21] capitalize">
                  FAQs
                </h1>
                <p className="font-['Public_Sans'] text-[14px] lg:text-[18px] font-semibold leading-[1.4] text-[#4e555a] capitalize">
                  Have any question for us? Ask away
                </p>
              </div>
            </div>

            {/* FAQ Items */}
            <div className="flex flex-col gap-4 lg:gap-10 w-full">
              {faqData.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white flex flex-col gap-3 items-start p-3 lg:p-6 rounded-2xl shadow-[0px_4px_24px_0px_rgba(37,37,37,0.08)] w-full"
                >
                  {/* Question Row */}
                  <div className="flex items-start justify-between w-full">
                    <h2 className="font-['Public_Sans'] text-[18px] lg:text-[24px] font-semibold leading-[1.4] text-[#1c1f21] capitalize text-left flex-1 pr-4">
                      {faq.question}
                    </h2>
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="flex items-center justify-center w-6 h-6 shrink-0"
                    >
                      <ChevronDown
                        className={`w-6 h-6 text-[#4e555a] transition-transform duration-300 ${
                          openStates[index] ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {/* Answer */}
                  {openStates[index] && (
                    <div className="w-full">
                      <p className="font-['Public_Sans'] text-[14px] lg:text-[18px] font-normal leading-[1.4] text-[#4e555a]">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/_FAQs/FAQs')({
  component: FAQs,
})
