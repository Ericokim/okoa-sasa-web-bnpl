import { useState } from 'react'
import { cn } from '@/lib/utils'

export function ProductGallery({ images, name }) {
  const [selectedImage, setSelectedImage] = useState(0)

  const handlePrevious = () => {
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="flex w-full flex-col gap-4 md:flex-row md:gap-6">
      {/* Main Image - Order 1 on mobile, 2 on desktop */}
      <div className="relative order-1 flex h-[274px] flex-1 items-center justify-center rounded-3xl bg-[#F9FAFB] md:order-2 md:h-[580px]">
        <img
          src={images[selectedImage]}
          alt={name}
          className="h-[217px] w-[217px] object-contain md:h-[479px] md:w-[479px]"
        />

        {/* Left Arrow */}
        <button
          onClick={handlePrevious}
          className="absolute left-4 top-1/2 flex h-[30px] w-[30px] -translate-y-1/2 items-center justify-center rounded-full border border-[#E8ECF4] bg-white transition-colors hover:bg-gray-50 md:h-[34px] md:w-[34px]"
        >
          <svg className="h-5 w-5 md:h-6 md:w-6" viewBox="0 0 24 24" fill="none">
            <path
              d="M15.0898 19.92L8.56984 13.4C7.79984 12.63 7.79984 11.37 8.56984 10.6L15.0898 4.08"
              stroke="#292D32"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 flex h-[30px] w-[30px] -translate-y-1/2 items-center justify-center rounded-full border border-[#E8ECF4] bg-white transition-colors hover:bg-gray-50 md:h-[34px] md:w-[34px]"
        >
          <svg className="h-5 w-5 md:h-6 md:w-6" viewBox="0 0 24 24" fill="none">
            <path
              d="M8.91016 19.92L15.4302 13.4C16.2002 12.63 16.2002 11.37 15.4302 10.6L8.91016 4.08"
              stroke="#292D32"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Thumbnails - Horizontal on mobile, Vertical on desktop - Order 2 on mobile, 1 on desktop */}
      <div
        className="order-2 flex w-full snap-x snap-mandatory flex-row gap-3 overflow-x-auto px-2 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:order-1 md:w-[168px] md:flex-col md:gap-3 md:overflow-visible md:snap-none md:p-0"
        aria-label="Product image thumbnails"
      >
        {images.slice(0, 4).map((image, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setSelectedImage(index)}
            className={cn(
              'group relative flex h-[95px] w-[102px] flex-shrink-0 snap-center items-center justify-center rounded-2xl border border-[#E8ECF4] bg-[#F9FAFB] transition-all hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F8971D] md:h-[139px] md:w-[168px] md:rounded-3xl',
              selectedImage === index && 'border-[#F8971D] bg-white'
            )}
          >
            <div
              className={cn(
                'flex h-full w-full items-center justify-center rounded-[inherit] bg-[#F9FAFB] transition-colors group-hover:bg-white',
                selectedImage === index && 'bg-white'
              )}
            >
              <img
                src={image}
                alt={`${name} ${index + 1}`}
                className="h-[73px] w-[50px] object-contain md:h-[97px] md:w-[65px]"
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
