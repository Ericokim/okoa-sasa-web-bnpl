import React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { ChevronDown } from 'lucide-react'
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
      "Please visit the login page and click on the link next to 'Forgot your password?'; enter the details of the email address that you used when you first registered your account. We will email you a link to this email address which you can click on to reset your password.",
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
  const scrollContainerRef = React.useRef(null)
  const [currentStep, setCurrentStep] = React.useState(0)

  const toggleFAQ = (index) => {
    setOpenStates((prev) =>
      prev.map((state, i) => (i === index ? !state : state)),
    )
  }

  const handleScroll = () => {
    if (!scrollContainerRef.current) return

    const container = scrollContainerRef.current
    const scrollLeft = container.scrollLeft

    // For mobile: 1 card per view, for tablet: 2 cards per view
    const isTablet = window.innerWidth >= 768
    const cardWidth = isTablet ? 280 + 20 : 320 + 20
    const cardsPerView = isTablet ? 2 : 1
    const newStep = Math.round(scrollLeft / (cardWidth * cardsPerView))

    setCurrentStep(newStep)
  }

  const scrollToStep = (stepIndex) => {
    if (!scrollContainerRef.current) return

    const container = scrollContainerRef.current
    const isTablet = window.innerWidth >= 768
    const cardWidth = isTablet ? 280 + 20 : 320 + 20
    const cardsPerView = isTablet ? 2 : 1
    const targetScroll = stepIndex * cardWidth * cardsPerView

    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth',
    })
  }

  // Calculate steps count based on screen size
  const getStepsCount = () => {
    const isTablet = typeof window !== 'undefined' && window.innerWidth >= 768
    return isTablet ? Math.ceil(steps.length / 2) : steps.length
  }

  const [stepsCount, setStepsCount] = React.useState(getStepsCount())

  // Update steps count on resize
  React.useEffect(() => {
    const handleResize = () => {
      setStepsCount(getStepsCount())
      scrollToStep(currentStep)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [currentStep])

  return (
    <div className="bg-white mb-6 overflow-hidden relative w-full">
      {/* How It Works Section */}
      <div className="bg-white overflow-hidden relative w-full min-h-[600px] lg:h-[600px]">
        <div className="bg-linear-to-b from-[#f8971d] to-[#ee3124] h-80 lg:h-96 w-full absolute left-0 top-0" />

        <div className="absolute left-1/2 top-[60px] lg:top-20 -translate-x-1/2 w-full max-w-[360px] md:max-w-[650px] lg:max-w-7xl px-4 lg:px-0">
          <div className="flex flex-col gap-8 lg:gap-[60px] items-center">
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

            {/* Steps Grid - Scrollable on mobile and tablet */}
            <div className="w-full">
              {/* Desktop Grid */}
              <div className="hidden lg:grid grid-cols-6 gap-4 w-full">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className="bg-white flex flex-col gap-5 items-center justify-center px-4 py-6 rounded-2xl shadow-sm flex-1 min-h-[280px]"
                  >
                    <div className="bg-linear-to-b from-[#f8971d] to-[#ee3124] overflow-hidden rounded-full w-22 h-22 flex items-center justify-center">
                      {React.cloneElement(step.icon, { size: 50 })}
                    </div>
                    <div className="flex flex-col gap-3 items-center justify-center w-full px-3">
                      <p className="font-['Public_Sans'] text-[16px] font-semibold leading-[1.4] text-[#252525] text-center capitalize">
                        {step.title}
                      </p>
                    </div>
                    <div className="relative h-[32px] w-full">
                      <p
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-['Public_Sans'] text-[26px] font-semibold leading-[1.4] text-center capitalize bg-linear-to-b from-[#f8971d] to-[#ee3124] bg-clip-text"
                        style={{ WebkitTextFillColor: 'transparent' }}
                      >
                        {step.step}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile & Tablet - Horizontal Scroll with Carousel Behavior */}
              <div className="lg:hidden w-full">
                <div
                  ref={scrollContainerRef}
                  className="flex gap-5 pb-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide md:px-4"
                  onScroll={handleScroll}
                  style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                  }}
                >
                  <div className="flex gap-5 min-w-max px-4 md:px-0">
                    {steps.map((step, index) => (
                      <div
                        key={index}
                        className="bg-white flex flex-col gap-4 items-center justify-center px-5 py-8 rounded-2xl shadow-sm w-[320px] md:w-[280px] min-h-[260px] shrink-0 snap-start snap-always md:mx-2"
                      >
                        <div className="bg-linear-to-b from-[#f8971d] to-[#ee3124] overflow-hidden rounded-full w-18 h-18 flex items-center justify-center">
                          {React.cloneElement(step.icon, { size: 44 })}
                        </div>
                        <div className="flex flex-col gap-3 items-center justify-center w-full px-3">
                          <p className="font-['Public_Sans'] text-[16px] md:text-[16px] font-semibold leading-[1.4] text-[#252525] text-center capitalize">
                            {step.title}
                          </p>
                        </div>
                        <div className="relative h-[28px] w-full">
                          <p
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-['Public_Sans'] text-[22px] md:text-[24px] font-semibold leading-[1.4] text-center capitalize bg-linear-to-b from-[#f8971d] to-[#ee3124] bg-clip-text"
                            style={{ WebkitTextFillColor: 'transparent' }}
                          >
                            {step.step}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step Indicators - Dynamic count based on screen size */}
                <div className="flex justify-center gap-2 mt-6">
                  {Array.from({ length: stepsCount }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => scrollToStep(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentStep
                          ? 'bg-[#ee3124] w-6'
                          : 'bg-gray-300'
                      }`}
                      aria-label={`Go to step ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="w-full px-5">
        <div className="max-w-full">
          <div className="flex flex-col gap-6 lg:gap-14 items-center lg:items-start w-full">
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
            <div className="flex flex-col gap-6 lg:gap-10 w-full">
              {faqData.map((faq, index) => (
                <div
                  key={index}
                  onClick={() => toggleFAQ(index)}
                  className="bg-white border flex flex-col gap-3 items-start p-4 md:p-6 lg:p-6 rounded-2xl shadow-sm w-full"
                >
                  {/* Question Row */}
                  <div className="flex items-start justify-between cursor-pointer w-full">
                    <h2 className="font-['Public_Sans'] text-[18px] md:text-[20px] lg:text-[24px] font-semibold leading-[1.4] text-[#1c1f21] capitalize text-left flex-1 pr-4">
                      {faq.question}
                    </h2>
                    <button className="flex items-center justify-center w-6 h-6 md:w-7 md:h-7 shrink-0">
                      <ChevronDown
                        className={`w-6 h-6 md:w-7 md:h-7 text-[#4e555a] transition-transform duration-300 ${
                          openStates[index] ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {/* Answer */}
                  {openStates[index] && (
                    <div className="w-full">
                      <p className="font-['Public_Sans'] text-[14px] md:text-[16px] lg:text-[18px] font-normal leading-[1.4] text-[#4e555a]">
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