import React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  Laptop2,
  Wallet,
  FileText,
  ClipboardCheck,
  Truck,
  RefreshCw,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import {
  DeviceIcon,
  FileIcon,
  HandMoneyIcon,
  SearchIcon,
  TruckTickIcon,
} from '@/assets/icons'

const steps = [
  {
    icon: <DeviceIcon size={36} className="text-white mx-auto" />,
    title: 'Browse And Choose Your Device.',
    step: '1 Step',
  },
  {
    icon: <HandMoneyIcon size={36} className="text-white mx-auto" />,
    title: 'Check Your Loan Limit To Qualify.',
    step: '2 Step',
  },
  {
    icon: <FileIcon size={36} className="text-white mx-auto" />,
    title: 'Fill In Your Details And Employer Info.',
    step: '3 Step',
  },
  {
    icon: <SearchIcon size={36} className="text-white mx-auto" />,
    title: 'We Review Your Loan Request.',
    step: '4 Step',
  },
  {
    icon: <TruckTickIcon size={36} className="text-white mx-auto" />,
    title: 'Once Approved, Your Device Is Delivered.',
    step: '5 Step',
  },
  {
    icon: <TruckTickIcon size={36} className="text-white mx-auto" />,
    title: 'Loan Repaid Monthly Via Payroll Checkoff.',
    step: '6 Step',
  },
]

const faqData = [
  {
    question: 'What Is Okoa Sasa?',
    answer:
      'Okoa Sasa Is An Online Marketplace That Connects Buyers And Sellers, Offering A Wide Range Of Unique Items That Can Be Purchased From The Comfort Of Your Home, Office, Or Even While On The Go. It Also Allows You To Sell Your Own Products To A Broad Audience. Items Can Be Delivered To Your Doorstep Or Picked Up From Designated Collection Points Nationwide.',
  },
  {
    question: 'What Do I Do In Case I Have Forgotten My Password?',
    answer:
      'Please Visit The Login Page And Click On The Link Next To "Forgot Your Password?"; Enter The Details Of The Email Address That You Used When You First Registered Your Account. We Will Email You A Link To This Email Address Which You Can Click On To Reset Your Password.',
  },
  {
    question: 'When Can I Place My Order?',
    answer:
      'You Can Place Your Order At Any Time. Deliveries However Will Be Done As Per The Timelines Noted On The Check-Out Page.',
  },
  {
    question: 'How Soon From The Time Of Ordering Will My Item Be Delivered?',
    answer:
      'We Offer Same Day Delivery On All Orders Made Before 3pm Are Delivered Same Day Within Nairobi. If Outside Nairobi Delivery Is Made The Next Day, Orders Made After 3pm Will Be Processed The Next Day.The Transit Time Period Is Calculated Strictly Using Business Days, Which Excludes Sunday And Public Holidays( Visit Shipping And Delivery Policy For More Details)',
  },
]

const FAQs = () => {
  const [openStates, setOpenStates] = React.useState(faqData.map(() => false))
  const [currentIndex, setCurrentIndex] = React.useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % steps.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + steps.length) % steps.length)
  }

  const toggleFAQ = (index) => {
    setOpenStates((prev) =>
      prev.map((state, i) => (i === index ? !state : state)),
    )
  }

  return (
    <section className="bg-white -ml-20 w-[1550px]">
      <div className="h-[552px]">
        <div className="bg-linear-to-b from-orange-500 to-orange-400 text-white grid justify-center py-8 px-4 text-center h-96">
          <div className="h-[375px] flex flex-col justify-between w-full max-w-7xl mt-[60px]">
            {/* Header */}
            <div className="p-0">
              <div className="w-16 h-1 bg-white mx-auto mb-4 rounded-full"></div>
              <h1 className="text-[36px]  font-semibold capitalize text-white">
                How It Works
              </h1>
              <p className="text-[18px] font-semibold capitalize text-white ">
                Simple steps to get your device with Okoa Sasa financing.
              </p>
            </div>

            {/* Desktop layout */}
            <div className="hidden lg:grid grid-cols-6 gap-3">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="bg-white text-gray-700 rounded-xl py-6 px-4 shadow-md hover:shadow-lg transition-all duration-200 h-56 w-[203.33px]"
                >
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="bg-orange-500 rounded-full h-20 w-20 flex items-center justify-center">
                      {step.icon}
                    </div>
                    <p className="text-sm font-medium text-center w-[178px] h-[50px]">
                      {step.title}
                    </p>
                    <span className="text-orange-500 font-semibold w-[179.33px] h-[30px]">
                      {step.step}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile + Tablet Carousel */}
            <div className="relative lg:hidden flex items-center justify-center mt-4">
              {/* Prev button */}
              <button
                onClick={prevSlide}
                className="absolute left-0 bg-white text-orange-500 rounded-full shadow-md p-2 hover:bg-orange-100 transition"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Card */}
              <div className="bg-white text-gray-700 rounded-xl py-6 px-4 shadow-md h-56 w-[250px] mx-10 flex-shrink-0 transition-all duration-500">
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="bg-orange-500 rounded-full h-20 w-20 flex items-center justify-center">
                    {steps[currentIndex].icon}
                  </div>
                  <p className="text-sm font-medium text-center w-[178px] h-[50px]">
                    {steps[currentIndex].title}
                  </p>
                  <span className="text-orange-500 font-semibold w-[179.33px] h-[30px]">
                    {steps[currentIndex].step}
                  </span>
                </div>
              </div>

              {/* Next button */}
              <button
                onClick={nextSlide}
                className="absolute right-0 bg-white text-orange-500 rounded-full shadow-md p-2 hover:bg-orange-100 transition"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* body */}

      <div className="h-[928px] px-20 py-5 grid place-items-center">
        <div className="w-7xl max-w-7xl h-[888px]  flex flex-col justify-between items-center">
          {/* Header */}
          <div className="h-[111px] w-full text-center flex flex-col justify-center items-center">
            <div className=" w-20 h-1 bg-orange-500 -mt-6 mb-4 rounded-full"></div>
            <h1 className="text-3xl font-bold mb-2 ">FAQs</h1>
            <p className="text-sm md:text-base">
              Have any question for us? Ask away
            </p>
          </div>

          {/* body */}
          <div className="h-[721px] w-full max-w-7xl overflow-y-auto p-1 space-y-10">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className={`rounded-lg bg-white overflow-hidden shadow-2xs transition-all duration-300 
                   
                `}
              >
                {/* Top Row — Question + Toggle Button */}
                <div className="w-full px-6 py-5 flex justify-between items-center text-left">
                  <span className="font-semibold text-gray-900 text-base pr-4">
                    {faq.question}
                  </span>
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="p-2 rounded-full hover:bg-gray-100 transition"
                  >
                    <ChevronDown
                      className={`transition-transform duration-300 text-gray-600 ${
                        openStates[index] ? 'rotate-180' : ''
                      }`}
                      size={20}
                    />
                  </button>
                </div>

                {/* Collapsible Answer */}
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    openStates[index]
                      ? 'max-h-96 opacity-100'
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-5 pt-2 text-gray-600 text-sm leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export const Route = createFileRoute('/_FAQs/FAQs')({
  component: FAQs,
})
