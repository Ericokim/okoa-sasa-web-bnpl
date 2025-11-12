import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import logo from '@/assets/images/primaryLogoHorizontal.png'

// Custom Brand Icons
const FacebookIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20.984 20.2351H24.7312L26.2301 14.2395H20.984V11.2417C20.984 9.69788 20.984 8.24395 23.9818 8.24395H26.2301V3.20765C25.7415 3.1432 23.8964 2.9978 21.9478 2.9978C17.8783 2.9978 14.9884 5.48148 14.9884 10.0426V14.2395H10.4917V20.2351H14.9884V32.9758H20.984V20.2351Z"
      fill="url(#paint0_linear_facebook)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_facebook"
        x1="20.1942"
        y1="2.99772"
        x2="20.1942"
        y2="32.9757"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F8971D" />
        <stop offset="1" stopColor="#EE3124" />
      </linearGradient>
    </defs>
  </svg>
)

const XIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 33 29"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M25.2675 0H30.1872L19.4392 12.2843L32.0833 29.0004H22.1831L14.4288 18.8621L5.55617 29.0004H0.633547L12.1296 15.861L0 0H10.1516L17.1608 9.26673L25.2675 0ZM23.5409 26.0557H26.2669L8.67037 2.78998H5.74505L23.5409 26.0557Z"
      fill="url(#paint0_linear_x)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_x"
        x1="19.7789"
        y1="-7.86217e-05"
        x2="19.7789"
        y2="29.0003"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F8971D" />
        <stop offset="1" stopColor="#EE3124" />
      </linearGradient>
    </defs>
  </svg>
)

const InstagramIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.9867 4.4967C14.3228 4.4967 13.8641 4.51199 12.4252 4.57764C10.9889 4.6433 10.0077 4.87173 9.14976 5.20538C8.25042 5.54354 7.43472 6.07415 6.76022 6.76124C6.07422 7.43497 5.54329 8.25009 5.20436 9.14989C4.87251 10.0079 4.64317 10.9899 4.57752 12.4262C4.51277 13.8642 4.49658 14.322 4.49658 17.9868C4.49658 21.6516 4.51187 22.1094 4.57752 23.5483C4.64317 24.9846 4.87161 25.9657 5.20526 26.8237C5.54341 27.723 6.07402 28.5387 6.76112 29.2133C7.43486 29.8992 8.24998 30.4302 9.14976 30.7691C10.0077 31.1019 10.9889 31.3303 12.4252 31.3959C13.8641 31.4616 14.3228 31.4769 17.9867 31.4769C21.6506 31.4769 22.1092 31.4616 23.5482 31.3959C24.9844 31.3303 25.9656 31.1019 26.8236 30.7682C27.7229 30.4301 28.5386 29.8994 29.2131 29.2124C29.8991 28.5386 30.4301 27.7235 30.769 26.8237C31.1017 25.9657 31.3302 24.9846 31.3958 23.5483C31.4615 22.1094 31.4768 21.6507 31.4768 17.9868C31.4768 14.3229 31.4615 13.8642 31.3958 12.4253C31.3302 10.989 31.1017 10.0079 30.7681 9.14989C30.4294 8.24971 29.8984 7.43424 29.2122 6.76034C28.5385 6.07434 27.7234 5.54341 26.8236 5.20448C25.9656 4.87263 24.9835 4.6433 23.5473 4.57764C22.1092 4.51289 21.6515 4.4967 17.9867 4.4967ZM17.9867 6.92762C21.5885 6.92762 22.0157 6.94111 23.4385 7.00586C24.7533 7.06612 25.4674 7.28466 25.9431 7.47082C26.5727 7.71454 27.0223 8.00773 27.4945 8.47898C27.9666 8.95113 28.2589 9.4008 28.5027 10.0303C28.6879 10.5061 28.9074 11.2202 28.9676 12.535C29.0324 13.9578 29.0459 14.3849 29.0459 17.9868C29.0459 21.5887 29.0324 22.0158 28.9676 23.4386C28.9074 24.7534 28.6888 25.4675 28.5027 25.9433C28.2867 26.5292 27.9423 27.0593 27.4945 27.4946C27.0593 27.9425 26.5291 28.287 25.9431 28.5028C25.4674 28.688 24.7533 28.9075 23.4385 28.9677C22.0157 29.0325 21.5894 29.046 17.9867 29.046C14.3839 29.046 13.9576 29.0325 12.5349 28.9677C11.22 28.9075 10.506 28.6889 10.0302 28.5028C9.44426 28.2869 8.91414 27.9424 8.47886 27.4946C8.03115 27.0593 7.68665 26.5292 7.4707 25.9433C7.28543 25.4675 7.06599 24.7534 7.00574 23.4386C6.94099 22.0158 6.9275 21.5887 6.9275 17.9868C6.9275 14.3849 6.94099 13.9578 7.00574 12.535C7.06599 11.2202 7.28453 10.5061 7.4707 10.0303C7.71442 9.4008 8.0076 8.95113 8.47886 8.47898C8.91408 8.03115 9.44422 7.68664 10.0302 7.47082C10.506 7.28556 11.22 7.06612 12.5349 7.00586C13.9576 6.94111 14.3848 6.92762 17.9867 6.92762V6.92762Z"
      fill="url(#paint0_linear_instagram)"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.9866 22.4879C17.3955 22.4879 16.8102 22.3715 16.2641 22.1453C15.718 21.9191 15.2218 21.5875 14.8038 21.1695C14.3858 20.7516 14.0543 20.2553 13.8281 19.7092C13.6019 19.1631 13.4854 18.5778 13.4854 17.9867C13.4854 17.3956 13.6019 16.8103 13.8281 16.2642C14.0543 15.7181 14.3858 15.2219 14.8038 14.8039C15.2218 14.3859 15.718 14.0543 16.2641 13.8281C16.8102 13.6019 17.3955 13.4855 17.9866 13.4855C19.1804 13.4855 20.3253 13.9597 21.1695 14.8039C22.0136 15.648 22.4878 16.7929 22.4878 17.9867C22.4878 19.1805 22.0136 20.3254 21.1695 21.1695C20.3253 22.0137 19.1804 22.4879 17.9866 22.4879V22.4879ZM17.9866 11.0528C16.1477 11.0528 14.384 11.7833 13.0836 13.0837C11.7833 14.384 11.0527 16.1477 11.0527 17.9867C11.0527 19.8257 11.7833 21.5894 13.0836 22.8897C14.384 24.1901 16.1477 24.9206 17.9866 24.9206C19.8256 24.9206 21.5893 24.1901 22.8897 22.8897C24.19 21.5894 24.9205 19.8257 24.9205 17.9867C24.9205 16.1477 24.19 14.384 22.8897 13.0837C21.5893 11.7833 19.8256 11.0528 17.9866 11.0528V11.0528ZM26.9378 10.9269C26.9378 11.3616 26.7651 11.7785 26.4577 12.0859C26.1503 12.3932 25.7334 12.5659 25.2987 12.5659C24.864 12.5659 24.4471 12.3932 24.1397 12.0859C23.8324 11.7785 23.6597 11.3616 23.6597 10.9269C23.6597 10.4922 23.8324 10.0753 24.1397 9.76791C24.4471 9.46053 24.864 9.28784 25.2987 9.28784C25.7334 9.28784 26.1503 9.46053 26.4577 9.76791C26.7651 10.0753 26.9378 10.4922 26.9378 10.9269"
      fill="url(#paint1_linear_instagram)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_instagram"
        x1="21.1295"
        y1="4.49663"
        x2="21.1295"
        y2="31.4768"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F8971D" />
        <stop offset="1" stopColor="#EE3124" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_instagram"
        x1="20.8456"
        y1="9.2878"
        x2="20.8456"
        y2="24.9206"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F8971D" />
        <stop offset="1" stopColor="#EE3124" />
      </linearGradient>
    </defs>
  </svg>
)

const WhatsAppIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 41 41"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20.2986 5.54846C11.9682 5.54846 5.18882 12.0782 5.18588 20.1031C5.18392 22.6693 5.88105 25.1739 7.20287 27.3799L5.05859 34.922L13.0707 32.8982C15.2994 34.064 17.7775 34.6721 20.2927 34.6704H20.2986C28.6289 34.6704 35.4084 28.1397 35.4113 20.1148C35.4133 16.2277 33.8427 12.5687 30.9886 9.8184C28.1355 7.06708 24.3414 5.54944 20.2986 5.54846ZM20.2986 32.2118H20.2937C18.0398 32.2118 15.8289 31.6283 13.9 30.5258L13.4399 30.2634L8.68721 31.4638L9.95615 26.999L9.65752 26.5418C8.40317 24.6287 7.73544 22.3907 7.73649 20.1031C7.73942 13.4323 13.3752 8.00703 20.3035 8.00703C23.6579 8.00801 26.8117 9.26814 29.1841 11.5544C31.5565 13.8406 32.8617 16.8808 32.8597 20.1138C32.8568 26.7846 27.2219 32.2118 20.2976 32.2118H20.2986ZM27.1887 23.1501C26.8107 22.969 24.9543 22.0887 24.6077 21.9663C24.2621 21.8459 24.0104 21.7832 23.7588 22.1475C23.5081 22.5117 22.7836 23.3312 22.5643 23.5731C22.343 23.8159 22.1227 23.8453 21.7447 23.6641C21.3668 23.482 20.1498 23.0982 18.7085 21.8586C17.5854 20.8952 16.8276 19.7046 16.6073 19.3394C16.387 18.9761 16.5838 18.7793 16.7728 18.5982C16.9422 18.4366 17.1507 18.1742 17.3387 17.9617C17.5267 17.7493 17.5894 17.5975 17.7167 17.3547C17.842 17.1128 17.7793 16.8994 17.6843 16.7183C17.5894 16.5352 16.8354 14.7453 16.5192 14.0178C16.2137 13.309 15.9023 13.4039 15.6703 13.3922C15.45 13.3824 15.1993 13.3795 14.9457 13.3795C14.6961 13.3795 14.2858 13.4705 13.9392 13.8348C13.5936 14.199 12.6174 15.0782 12.6174 16.8681C12.6174 18.6589 13.9705 20.388 14.1595 20.6308C14.3485 20.8727 16.8227 24.5473 20.6109 26.1237C21.5117 26.4967 22.2147 26.7209 22.764 26.8894C23.6687 27.1664 24.4922 27.1263 25.1423 27.0333C25.8668 26.9285 27.3766 26.154 27.69 25.3051C28.0052 24.4562 28.0052 23.7278 27.9112 23.576C27.8192 23.4242 27.5666 23.3332 27.1887 23.1501V23.1501Z"
      fill="url(#paint0_linear_whatsapp)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_whatsapp"
        x1="23.7706"
        y1="5.54838"
        x2="23.7706"
        y2="34.922"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F8971D" />
        <stop offset="1" stopColor="#EE3124" />
      </linearGradient>
    </defs>
  </svg>
)

const TikTokIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M33.929 12.918C33.9212 12.6981 33.8325 12.4888 33.6802 12.33C33.5278 12.1712 33.3225 12.074 33.1032 12.0569C31.6422 11.9208 30.2483 11.3791 29.079 10.4929C28.2112 9.83521 27.4853 9.00896 26.9447 8.06379C26.4042 7.11861 26.0602 6.07398 25.9333 4.99256C25.9162 4.77319 25.819 4.56779 25.6602 4.41548C25.5015 4.26316 25.2922 4.17459 25.0723 4.16663H21.5577C21.443 4.16661 21.3297 4.18944 21.224 4.23381C21.1183 4.27818 21.0227 4.34318 20.9425 4.42501C20.8623 4.50684 20.7992 4.60386 20.757 4.71036C20.7148 4.81688 20.6942 4.93073 20.6965 5.04528V26.0275C20.6868 26.9995 20.3732 27.9438 19.7997 28.7286C19.226 29.5133 18.4213 30.0988 17.4983 30.4031C16.932 30.589 16.3359 30.6665 15.741 30.6316C14.99 30.5905 14.2602 30.3673 13.6147 29.9815C12.6897 29.4338 11.9809 28.5853 11.6066 27.5776C11.2324 26.5701 11.2154 25.4645 11.5586 24.446C11.9106 23.4335 12.5962 22.5706 13.5031 21.9991C14.4099 21.4275 15.4841 21.1811 16.5493 21.3003C16.6673 21.3126 16.7865 21.3001 16.8992 21.2633C17.0118 21.2265 17.1155 21.1663 17.2035 21.0866C17.2913 21.0071 17.3615 20.9098 17.4092 20.8013C17.457 20.6928 17.4813 20.5755 17.4807 20.4568V16.3447C17.4807 16.3447 15.987 16.2393 15.4774 16.2393C14.1705 16.2332 12.8787 16.5187 11.6962 17.0751C10.5136 17.6315 9.47002 18.4445 8.64147 19.4551C7.53964 20.6413 6.75402 22.0856 6.35697 23.6551C5.94954 25.3028 5.97836 27.0281 6.44056 28.6613C6.90277 30.2945 7.78244 31.7791 8.99294 32.9688C9.28295 33.261 9.59426 33.5311 9.92431 33.7771C11.6609 35.1166 13.7939 35.8401 15.987 35.8333C16.4868 35.8336 16.986 35.7983 17.4807 35.7278C19.5667 35.4186 21.4997 34.4521 22.9987 32.9688C23.9152 32.0696 24.6447 30.9981 25.1453 29.816C25.646 28.6336 25.9078 27.3641 25.9158 26.0803V14.5171C27.9447 16.0829 30.389 17.018 32.945 17.2058C33.0638 17.2131 33.183 17.1956 33.2948 17.1546C33.4068 17.1135 33.5088 17.0496 33.5947 16.9671C33.6807 16.8845 33.7485 16.785 33.7938 16.6748C33.8393 16.5647 33.8615 16.4463 33.8588 16.3272V12.918H33.929Z"
      fill="url(#paint0_linear_tiktok)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_tiktok"
        x1="23.2452"
        y1="4.16654"
        x2="23.2452"
        y2="35.8333"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F8971D" />
        <stop offset="1" stopColor="#EE3124" />
      </linearGradient>
    </defs>
  </svg>
)

export function Footer() {
  return (
    <footer className="bg-[#161719] py-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
      <div className="mx-auto w-full space-y-8">
        {/* Header Section with Logo and Social Media */}
        <div className="flex flex-col items-center gap-6 sm:gap-8 lg:flex-row lg:items-center lg:justify-between">
          {/* Logo */}
          <div className="w-[176px] sm:w-[170px] md:w-[220px] lg:w-[250px] xl:w-[280px] h-auto">
            <img
              src={logo}
              srcSet={`${logo} 1x, ${logo} 2x`}
              alt="Okoa Sasa Logo"
              loading="lazy"
              decoding="async"
              className="h-auto max-h-[80px] w-full object-contain"
            />
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center justify-center gap-4 sm:gap-5">
            <a
              href="https://www.facebook.com/OKOA-SASA-102076565265682/"
              target="_blank"
              className="w-9 h-9 sm:w-10 sm:h-10 md:w-[60px] md:h-[60px] bg-[rgba(255,255,255,0.1)] rounded-full flex items-center justify-center shadow-[0px_22.483px_33.725px_-6.745px_rgba(0,0,0,0.1),0px_8.993px_13.49px_-8.993px_rgba(0,0,0,0.1)] hover:bg-[rgba(255,255,255,0.2)] transition-colors"
            >
              <FacebookIcon className="w-6 sm:w-6 md:w-[34px] h-auto" />
            </a>
            <a
              href="https://twitter.com/okoa_sasa?t=l6l81a2uqV6H41rpPAGhXQ&s=09"
              target="_blank"
              className="w-9 h-9 sm:w-10 sm:h-10 md:w-[60px] md:h-[60px] bg-[rgba(255,255,255,0.1)] rounded-full flex items-center justify-center shadow-[0px_22.483px_33.725px_-6.745px_rgba(0,0,0,0.1),0px_8.993px_13.49px_-8.993px_rgba(0,0,0,0.1)] hover:bg-[rgba(255,255,255,0.2)] transition-colors"
            >
              <XIcon className="w-5 sm:w-5 md:w-[32px] h-auto" />
            </a>
            <a
              href="https://instagram.com/okoa_sasa1?utm_medium=copy_link"
              target="_blank"
              className="w-9 h-9 sm:w-10 sm:h-10 md:w-[60px] md:h-[60px] bg-[rgba(255,255,255,0.1)] rounded-full flex items-center justify-center shadow-[0px_22.483px_33.725px_-6.745px_rgba(0,0,0,0.1),0px_8.993px_13.49px_-8.993px_rgba(0,0,0,0.1)] hover:bg-[rgba(255,255,255,0.2)] transition-colors"
            >
              <InstagramIcon className="w-6 sm:w-6 md:w-[34px] h-auto" />
            </a>
            <a
              href="https://web.whatsapp.com/send?phone=254794249951&text=Hello"
              target="_blank"
              className="w-9 h-9 sm:w-10 sm:h-10 md:w-[60px] md:h-[60px] bg-[rgba(255,255,255,0.1)] rounded-full flex items-center justify-center shadow-[0px_22.483px_33.725px_-6.745px_rgba(0,0,0,0.1),0px_8.993px_13.49px_-8.993px_rgba(0,0,0,0.1)] hover:bg-[rgba(255,255,255,0.2)] transition-colors"
            >
              <WhatsAppIcon className="w-6 sm:w-6 md:w-[34px] h-auto" />
            </a>
            <a
              href="#"
              target="_blank"
              className="w-9 h-9 sm:w-10 sm:h-10 md:w-[60px] md:h-[60px] bg-[rgba(255,255,255,0.1)] rounded-full flex items-center justify-center shadow-[0px_22.483px_33.725px_-6.745px_rgba(0,0,0,0.1),0px_8.993px_13.49px_-8.993px_rgba(0,0,0,0.1)] hover:bg-[rgba(255,255,255,0.2)] transition-colors"
            >
              <TikTokIcon className="w-6 sm:w-6 md:w-[34px] h-auto" />
            </a>
          </div>
        </div>

        {/* Content Section - Balanced & Responsive */}
        <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[repeat(3,minmax(200px,1fr))_minmax(280px,380px)] gap-6 md:gap-8 lg:gap-10 xl:gap-12">
          {/* Useful Links */}
          <div className="flex flex-col items-start gap-3 text-left">
            <h3 className="text-lg sm:text-xl font-semibold text-white">
              Useful Links
            </h3>
            <div className="space-y-2.5 text-sm sm:text-base font-medium text-white">
              <Link
                to="/FAQs"
                className="block hover:text-brand-primary-start transition-colors"
              >
                How it Works
              </Link>
              <Link
                to="/FAQs"
                className="block hover:text-brand-primary-start transition-colors"
              >
                FAQs
              </Link>
              <Link
                to="/terms"
                className="block hover:text-brand-primary-start transition-colors"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>

          {/* Other Links */}
          <div className="flex flex-col items-start gap-3 text-left">
            <h3 className="text-lg sm:text-xl font-semibold text-white">
              Other Links
            </h3>
            <div className="space-y-2.5 text-sm sm:text-base font-medium text-white">
              <div>USSD code *884#</div>
              <Link
                to="/privacy"
                className="block hover:text-brand-primary-start transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/insurance"
                className="block hover:text-brand-primary-start transition-colors"
              >
                Insurance Policy
              </Link>
            </div>
          </div>

          {/* Contact Us */}
          <div className="flex flex-col items-start gap-3 text-left">
            <h3 className="text-lg sm:text-xl font-semibold text-white">
              Contact Us
            </h3>
            <div className="space-y-2.5 text-sm sm:text-base font-medium text-white">
              <div>+09 456 789</div>
              <div>OkoaSASA@gmail.com</div>
              <div>1234 Building, Kenya</div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="flex flex-col gap-4 text-left max-w-full w-full">
            <h3 className="text-lg sm:text-xl font-semibold text-white">
              You Can Find Us On!
            </h3>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full">
              <Input
                type="email"
                placeholder="Enter Your Email"
                className="bg-[#2c2d2f] border-none text-base text-brand-mid-gray placeholder:text-brand-mid-gray rounded-2xl px-5 py-3 h-auto flex-1"
              />
              <Button
                variant="gradient"
                className="w-full sm:w-24 sm:h-12 sm:text-sm rounded-3xl px-5 py-3 text-base font-medium whitespace-nowrap"
                size="lg"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
