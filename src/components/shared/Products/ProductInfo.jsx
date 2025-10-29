import { useState } from 'react'
import {
  LinkIcon,
  FacebookIcon,
  XIcon,
  InstagramIcon,
  WhatsAppIcon,
  TikTokIcon,
  AddIcon,
  MinusIcon,
  BoxIcon,
  TruckIcon,
  VerifyIcon,
} from '@/assets/icons'
import { Button } from '@/components/ui/button'

export function ProductInfo({ product }) {
  const [quantity, setQuantity] = useState(1)
  const maxQuantity = 5

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1)
  }

  const handleIncrease = () => {
    if (quantity < maxQuantity) setQuantity(quantity + 1)
  }

  return (
    <div className="flex flex-col gap-5 md:gap-5">
      {/* Share With Others */}
      <div className="flex flex-col items-end gap-2">
        <p className="text-[10px] font-normal leading-[150%] text-[#000] md:text-xs md:font-medium">
          Share With Others
        </p>
        <div className="flex items-center gap-2">
          {[
            { Icon: LinkIcon, label: 'Copy link', size: 16 },
            { Icon: FacebookIcon, label: 'Facebook', size: 18 },
            { Icon: XIcon, label: 'Twitter', size: 16 },
            { Icon: InstagramIcon, label: 'Instagram', size: 18 },
            { Icon: WhatsAppIcon, label: 'WhatsApp', size: 18 },
            { Icon: TikTokIcon, label: 'TikTok', size: 18 },
          ].map(({ Icon, label, size }, i) => (
            <button
              key={i}
              className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#F9FAFB] transition-colors hover:bg-gray-200 md:h-10 md:w-10"
              aria-label={label}
            >
              <Icon size={size} />
            </button>
          ))}
        </div>
      </div>

      {/* Product Title */}
      <h1 className="text-xl font-bold capitalize leading-[140%] text-[#000] md:text-[28px]">
        {product.name}
      </h1>

      {/* Product Description */}
      <p className="text-sm font-normal leading-[140%] text-[#676D75] md:text-base md:font-medium">
        {product.description}
      </p>

      {/* Divider */}
      <div className="h-px bg-[#E8ECF4]" />

      {/* Price and Stock */}
      <div className="flex items-center justify-between">
        <p
          className="text-lg font-bold capitalize leading-[140%] md:text-2xl"
          style={{
            background: 'linear-gradient(180deg, #F8971D 0%, #EE3124 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {product.price}
        </p>
        <div className="rounded-3xl bg-[rgba(244,113,32,0.12)] px-4 py-2">
          <span className="text-xs font-bold capitalize leading-[140%] text-[#F47120] md:text-sm">
            {product.stock}
          </span>
        </div>
      </div>

      {/* Quantity Selector */}
      <div className="flex flex-col gap-2">
        <div className="flex w-[250px] items-center justify-between rounded-3xl bg-[#F9FAFB] px-4 py-2">
          <button
            onClick={handleIncrease}
            disabled={quantity >= maxQuantity}
            className="flex h-6 w-6 items-center justify-center rounded-full bg-white transition-colors hover:bg-gray-50 disabled:opacity-50 md:h-[30px] md:w-[30px]"
          >
            <AddIcon size={18} />
          </button>
          <span className="min-w-[30px] text-center text-sm font-bold capitalize leading-[140%] text-[#252525] md:text-lg">
            {quantity}
          </span>
          <button
            onClick={handleDecrease}
            disabled={quantity <= 1}
            className="flex h-6 w-6 items-center justify-center rounded-full bg-white transition-colors hover:bg-gray-50 disabled:opacity-50 md:h-[30px] md:w-[30px]"
          >
            <MinusIcon size={18} />
          </button>
        </div>
        <p className="text-xs font-normal leading-[140%] text-[#A0A4AC] md:text-sm md:font-medium">
          Maximum purchase {maxQuantity}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3">
        {/* Add to Cart Button */}
        <Button
          variant={'outlineGradient'}
          className="flex h-11 w-full items-center justify-center gap-2.5 self-stretch rounded-3xl  px-4 py-3 text-base font-medium capitalize leading-[140%]"
          size="lg"
        >
          <svg className="size-6" viewBox="0 0 20 20" fill="none">
            <path
              d="M1.66699 1.66669H3.117C4.017 1.66669 4.72533 2.44169 4.65033 3.33335L3.95866 11.6334C3.84199 12.9917 4.91699 14.1584 6.28365 14.1584H15.1587C16.3587 14.1584 17.4087 13.175 17.5003 11.9834L17.9503 5.73335C18.0503 4.35002 17.0003 3.22502 15.6087 3.22502H4.85033"
              stroke="url(#cart0)"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13.5417 18.3334C14.117 18.3334 14.5833 17.867 14.5833 17.2917C14.5833 16.7164 14.117 16.25 13.5417 16.25C12.9664 16.25 12.5 16.7164 12.5 17.2917C12.5 17.867 12.9664 18.3334 13.5417 18.3334Z"
              stroke="url(#cart1)"
              strokeWidth="1.5"
            />
            <path
              d="M6.87467 18.3334C7.44997 18.3334 7.91634 17.867 7.91634 17.2917C7.91634 16.7164 7.44997 16.25 6.87467 16.25C6.29938 16.25 5.83301 16.7164 5.83301 17.2917C5.83301 17.867 6.29938 18.3334 6.87467 18.3334Z"
              stroke="url(#cart2)"
              strokeWidth="1.5"
            />
            <path
              d="M7.5 6.66669H17.5"
              stroke="url(#cart3)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient
                id="cart0"
                x1="11.7"
                y1="1.67"
                x2="11.7"
                y2="14.16"
              >
                <stop stopColor="#F8971D" />
                <stop offset="1" stopColor="#EE3124" />
              </linearGradient>
              <linearGradient
                id="cart1"
                x1="13.78"
                y1="16.25"
                x2="13.78"
                y2="18.33"
              >
                <stop stopColor="#F8971D" />
                <stop offset="1" stopColor="#EE3124" />
              </linearGradient>
              <linearGradient
                id="cart2"
                x1="7.12"
                y1="16.25"
                x2="7.12"
                y2="18.33"
              >
                <stop stopColor="#F8971D" />
                <stop offset="1" stopColor="#EE3124" />
              </linearGradient>
              <linearGradient
                id="cart3"
                x1="13.66"
                y1="6.67"
                x2="13.66"
                y2="7.67"
              >
                <stop stopColor="#F8971D" />
                <stop offset="1" stopColor="#EE3124" />
              </linearGradient>
            </defs>
          </svg>
          Add to Cart
        </Button>

        {/* Buy Now Button */}
        <Button
          // onClick={onCheckout}
          className="flex h-11 w-full items-center justify-center gap-2.5 self-stretch rounded-3xl border border-transparent bg-brand-primary-gradient px-4 py-3 text-base font-medium capitalize leading-[140%] text-white transition-opacity hover:bg-brand-primary-gradient hover:opacity-90 md:h-12"
          size="lg"
        >
          Buy Now
        </Button>
      </div>

      {/* Features */}
      <div className="flex flex-col gap-2 rounded-2xl bg-[#F9FAFB] p-3 md:p-4">
        {[
          {
            Icon: BoxIcon,
            text: '15GB + 500 Mins + Unlimited SMS at KES 1,000/Month',
          },
          { Icon: TruckIcon, text: 'Country Wide Delivery' },
          { Icon: VerifyIcon, text: 'Warranty on all mobile phone' },
        ].map(({ Icon, text }, i) => (
          <div
            key={i}
            className="flex items-start gap-2 md:items-center md:gap-3"
          >
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[rgba(244,113,32,0.12)]">
              <Icon size={20} />
            </div>
            <p className="flex-1 text-sm font-medium leading-[140%] text-[#000] md:text-base md:font-semibold">
              {text}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
