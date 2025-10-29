import { Link } from '@tanstack/react-router'

// SVG Icons from Design
const SearchIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.5167 21.0098C16.7634 21.0057 21.0134 16.7491 21.0093 11.5024C21.0052 6.2557 16.7487 2.0057 11.502 2.00977C6.25525 2.01384 2.00525 6.27042 2.00931 11.5171C2.01338 16.7638 6.26997 21.0138 11.5167 21.0098Z"
      stroke="#A0A4AC"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22.0172 22.0014L20.0156 20.003"
      stroke="#A0A4AC"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const ShoppingCartIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 2H3.74001C4.82001 2 5.67 2.93 5.58 4L4.75 13.96C4.61 15.59 5.89999 16.99 7.53999 16.99H18.19C19.63 16.99 20.89 15.81 21 14.38L21.54 6.88C21.66 5.22 20.4 3.87 18.73 3.87H5.82001"
      stroke="#292D32"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.25 22C16.9404 22 17.5 21.4404 17.5 20.75C17.5 20.0596 16.9404 19.5 16.25 19.5C15.5596 19.5 15 20.0596 15 20.75C15 21.4404 15.5596 22 16.25 22Z"
      stroke="#292D32"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.25 22C8.94036 22 9.5 21.4404 9.5 20.75C9.5 20.0596 8.94036 19.5 8.25 19.5C7.55964 19.5 7 20.0596 7 20.75C7 21.4404 7.55964 22 8.25 22Z"
      stroke="#292D32"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 8H21"
      stroke="#292D32"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const ArrowDownIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19.9201 8.9502L13.4001 15.4702C12.6301 16.2402 11.3701 16.2402 10.6001 15.4702L4.08008 8.9502"
      stroke="#292D32"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const SettingsIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22 6.5H16"
      stroke="#292D32"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 6.5H2"
      stroke="#292D32"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 10C11.933 10 13.5 8.433 13.5 6.5C13.5 4.567 11.933 3 10 3C8.067 3 6.5 4.567 6.5 6.5C6.5 8.433 8.067 10 10 10Z"
      stroke="#292D32"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 17.5H18"
      stroke="#292D32"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 17.5H2"
      stroke="#292D32"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 21C15.933 21 17.5 19.433 17.5 17.5C17.5 15.567 15.933 14 14 14C12.067 14 10.5 15.567 10.5 17.5C10.5 19.433 12.067 21 14 21Z"
      stroke="#292D32"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const CloseIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_357_10978)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.99956 8.94244L11.7709 12.7138C11.8966 12.8352 12.065 12.9024 12.2398 12.9009C12.4146 12.8994 12.5818 12.8293 12.7054 12.7057C12.829 12.582 12.8992 12.4148 12.9007 12.24C12.9022 12.0652 12.835 11.8968 12.7136 11.7711L8.94222 7.99977L12.7136 4.22844C12.835 4.10271 12.9022 3.9343 12.9007 3.75951C12.8992 3.58471 12.829 3.4175 12.7054 3.2939C12.5818 3.17029 12.4146 3.10018 12.2398 3.09866C12.065 3.09714 11.8966 3.16434 11.7709 3.28577L7.99956 7.05711L4.22822 3.28577C4.10192 3.16734 3.9345 3.10268 3.76138 3.1055C3.58825 3.10831 3.42302 3.17836 3.30063 3.30084C3.17824 3.42331 3.1083 3.5886 3.10561 3.76172C3.10293 3.93485 3.1677 4.10222 3.28622 4.22844L7.05689 7.99977L3.28556 11.7711C3.22188 11.8326 3.1711 11.9062 3.13616 11.9875C3.10122 12.0688 3.08283 12.1563 3.08206 12.2448C3.08129 12.3334 3.09815 12.4211 3.13168 12.5031C3.1652 12.585 3.2147 12.6594 3.27729 12.722C3.33989 12.7846 3.41432 12.8341 3.49625 12.8677C3.57818 12.9012 3.66597 12.918 3.75449 12.9173C3.84301 12.9165 3.93049 12.8981 4.01183 12.8632C4.09316 12.8282 4.16673 12.7774 4.22822 12.7138L7.99956 8.94244Z"
        fill="#09244B"
      />
    </g>
    <defs>
      <clipPath id="clip0_357_10978">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

const UserAvatar = ({ size = 30 }) => (
  <div
    className="rounded-full bg-gray-300"
    style={{ width: size, height: size }}
  />
)

const VuesaxArrowDown = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.99904 4.80007C7.53237 4.80007 7.0657 4.98007 6.71237 5.3334L2.3657 9.68007C2.17237 9.87341 2.17237 10.1934 2.3657 10.3867C2.55904 10.5801 2.87904 10.5801 3.07237 10.3867L7.41904 6.04007C7.73904 5.72007 8.25904 5.72007 8.57904 6.04007L12.9257 10.3867C13.119 10.5801 13.439 10.5801 13.6324 10.3867C13.8257 10.1934 13.8257 9.87341 13.6324 9.68007L9.2857 5.3334C8.93237 4.98007 8.4657 4.80007 7.99904 4.80007Z"
      fill="#252525"
    />
  </svg>
)

// Social Icons for Footer
const FacebookIcon = () => (
  <svg
    width="16"
    height="30"
    viewBox="0 0 16 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.4923 17.2373H14.2395L15.7384 11.2417H10.4923V8.24395C10.4923 6.70008 10.4923 5.24615 13.4901 5.24615H15.7384V0.209846C15.2498 0.145393 13.4047 0 11.4561 0C7.38658 0 4.4967 2.48368 4.4967 7.04483V11.2417H0V17.2373H4.4967V29.978H10.4923V17.2373Z"
      fill="url(#paint0_linear_facebook)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_facebook"
        x1="9.70252"
        y1="-8.1272e-05"
        x2="9.70252"
        y2="29.9779"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F8971D" />
        <stop offset="1" stopColor="#EE3124" />
      </linearGradient>
    </defs>
  </svg>
)

const TwitterIcon = () => (
  <svg
    width="35"
    height="35"
    viewBox="0 0 35 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.3623 3.27637L18.2207 12.3447L18.5918 12.835L18.9961 12.3721L26.9531 3.27637H30.5439L20.5215 14.7314L20.2539 15.0381L20.499 15.3623L32.5371 31.2764H23.8887L16.2852 21.335L15.9141 20.8496L15.5117 21.3096L6.78809 31.2764H3.19531L13.9648 18.9668L14.2344 18.6582L13.9854 18.334L2.4707 3.27637H11.3623ZM6.80664 5.87012L24.6025 29.1357L24.7529 29.332H28.7305L28.125 28.5303L10.5283 5.26465L10.3779 5.06641H6.19238L6.80664 5.87012Z"
      stroke="url(#paint0_linear_twitter)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_twitter"
        x1="21.2379"
        y1="2.77629"
        x2="21.2379"
        y2="31.7767"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F8971D" />
        <stop offset="1" stopColor="#EE3124" />
      </linearGradient>
    </defs>
  </svg>
)

const InstagramIcon = () => (
  <svg
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.9862 4.49658C14.3223 4.49658 13.8636 4.51187 12.4247 4.57752C10.9884 4.64317 10.0072 4.87161 9.14928 5.20526C8.24994 5.54341 7.43424 6.07402 6.75973 6.76112C6.07373 7.43484 5.5428 8.24997 5.20387 9.14976C4.87202 10.0077 4.64269 10.9898 4.57703 12.4261C4.51228 13.8641 4.49609 14.3219 4.49609 17.9867C4.49609 21.6515 4.51138 22.1092 4.57703 23.5482C4.64269 24.9844 4.87112 25.9656 5.20477 26.8236C5.54292 27.7229 6.07354 28.5386 6.76063 29.2131C7.43437 29.8991 8.2495 30.43 9.14928 30.769C10.0072 31.1017 10.9884 31.3302 12.4247 31.3958C13.8636 31.4615 14.3223 31.4768 17.9862 31.4768C21.6501 31.4768 22.1088 31.4615 23.5477 31.3958C24.9839 31.3302 25.9651 31.1017 26.8231 30.7681C27.7224 30.4299 28.5381 29.8993 29.2126 29.2122C29.8986 28.5385 30.4296 27.7234 30.7685 26.8236C31.1013 25.9656 31.3297 24.9844 31.3953 23.5482C31.461 22.1092 31.4763 21.6506 31.4763 17.9867C31.4763 14.3228 31.461 13.8641 31.3953 12.4252C31.3297 10.9889 31.1013 10.0077 30.7676 9.14976C30.4289 8.24958 29.898 7.43411 29.2117 6.76022C28.538 6.07422 27.7229 5.54329 26.8231 5.20436C25.9651 4.87251 24.983 4.64317 23.5468 4.57752C22.1088 4.51277 21.651 4.49658 17.9862 4.49658ZM17.9862 6.9275C21.588 6.9275 22.0152 6.94099 23.438 7.00574C24.7528 7.06599 25.4669 7.28453 25.9426 7.4707C26.5722 7.71442 27.0219 8.0076 27.494 8.47886C27.9662 8.95101 28.2584 9.40068 28.5022 10.0302C28.6874 10.506 28.9069 11.22 28.9671 12.5349C29.0319 13.9576 29.0454 14.3848 29.0454 17.9867C29.0454 21.5885 29.0319 22.0157 28.9671 23.4385C28.9069 24.7533 28.6883 25.4674 28.5022 25.9431C28.2863 26.5291 27.9418 27.0592 27.494 27.4945C27.0588 27.9423 26.5287 28.2869 25.9426 28.5027C25.4669 28.6879 24.7528 28.9074 23.438 28.9676C22.0152 29.0324 21.5889 29.0459 17.9862 29.0459C14.3834 29.0459 13.9571 29.0324 12.5344 28.9676C11.2196 28.9074 10.5055 28.6888 10.0297 28.5027C9.44377 28.2868 8.91365 27.9423 8.47837 27.4945C8.03066 27.0592 7.68617 26.5291 7.47021 25.9431C7.28495 25.4674 7.06551 24.7533 7.00525 23.4385C6.9405 22.0157 6.92701 21.5885 6.92701 17.9867C6.92701 14.3848 6.9405 13.9576 7.00525 12.5349C7.06551 11.22 7.28405 10.506 7.47021 10.0302C7.71393 9.40068 8.00712 8.95101 8.47837 8.47886C8.9136 8.03103 9.44373 7.68652 10.0297 7.4707C10.5055 7.28543 11.2196 7.06599 12.5344 7.00574C13.9571 6.94099 14.3843 6.9275 17.9862 6.9275Z"
      fill="url(#paint0_linear_instagram)"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.9866 22.4881C17.3955 22.4881 16.8102 22.3717 16.2641 22.1455C15.718 21.9193 15.2218 21.5877 14.8038 21.1698C14.3858 20.7518 14.0543 20.2556 13.8281 19.7095C13.6019 19.1634 13.4854 18.5781 13.4854 17.9869C13.4854 17.3958 13.6019 16.8105 13.8281 16.2644C14.0543 15.7183 14.3858 15.2221 14.8038 14.8041C15.2218 14.3861 15.718 14.0546 16.2641 13.8284C16.8102 13.6022 17.3955 13.4858 17.9866 13.4858C19.1804 13.4858 20.3253 13.96 21.1695 14.8041C22.0136 15.6483 22.4878 16.7932 22.4878 17.9869C22.4878 19.1807 22.0136 20.3256 21.1695 21.1698C20.3253 22.0139 19.1804 22.4881 17.9866 22.4881ZM17.9866 11.053C16.1477 11.053 14.384 11.7836 13.0836 13.0839C11.7833 14.3843 11.0527 16.148 11.0527 17.9869C11.0527 19.8259 11.7833 21.5896 13.0836 22.89C14.384 24.1903 16.1477 24.9209 17.9866 24.9209C19.8256 24.9209 21.5893 24.1903 22.8897 22.89C24.19 21.5896 24.9205 19.8259 24.9205 17.9869C24.9205 16.148 24.19 14.3843 22.8897 13.0839C21.5893 11.7836 19.8256 11.053 17.9866 11.053ZM26.9378 10.9271C26.9378 11.3618 26.7651 11.7787 26.4577 12.0861C26.1503 12.3935 25.7334 12.5662 25.2987 12.5662C24.864 12.5662 24.4471 12.3935 24.1397 12.0861C23.8324 11.7787 23.6597 11.3618 23.6597 10.9271C23.6597 10.4924 23.8324 10.0755 24.1397 9.76815C24.4471 9.46077 24.864 9.28809 25.2987 9.28809C25.7334 9.28809 26.1503 9.46077 26.4577 9.76815C26.7651 10.0755 26.9378 10.4924 26.9378 10.9271Z"
      fill="url(#paint1_linear_instagram)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_instagram"
        x1="21.129"
        y1="4.49651"
        x2="21.129"
        y2="31.4767"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F8971D" />
        <stop offset="1" stopColor="#EE3124" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_instagram"
        x1="20.8456"
        y1="9.28804"
        x2="20.8456"
        y2="24.9208"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F8971D" />
        <stop offset="1" stopColor="#EE3124" />
      </linearGradient>
    </defs>
  </svg>
)

const WhatsAppIcon = () => (
  <svg
    width="41"
    height="41"
    viewBox="0 0 41 41"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20.2986 5.54834C11.9682 5.54834 5.18882 12.0781 5.18588 20.103C5.18392 22.6692 5.88105 25.1738 7.20287 27.3798L5.05859 34.9219L13.0707 32.8981C15.2994 34.0639 17.7775 34.672 20.2927 34.6703H20.2986C28.6289 34.6703 35.4084 28.1396 35.4113 20.1147C35.4133 16.2276 33.8428 12.5686 30.9886 9.81828C28.1355 7.06695 24.3414 5.54932 20.2986 5.54834ZM20.2986 32.2117H20.2937C18.0398 32.2117 15.8289 31.6282 13.9 30.5257L13.4399 30.2633L8.68721 31.4637L9.95615 26.9989L9.65752 26.5416C8.40317 24.6286 7.73544 22.3906 7.73649 20.103C7.73942 13.4322 13.3752 8.00691 20.3035 8.00691C23.6579 8.00789 26.8117 9.26801 29.1841 11.5543C31.5565 13.8405 32.8617 16.8807 32.8597 20.1137C32.8568 26.7845 27.2219 32.2117 20.2976 32.2117H20.2986ZM27.1887 23.15C26.8107 22.9688 24.9543 22.0886 24.6077 21.9662C24.2621 21.8458 24.0104 21.7831 23.7588 22.1474C23.5081 22.5116 22.7836 23.3311 22.5643 23.573C22.343 23.8158 22.1227 23.8451 21.7447 23.664C21.3668 23.4819 20.1498 23.0981 18.7085 21.8585C17.5854 20.8951 16.8276 19.7045 16.6073 19.3392C16.387 18.976 16.5838 18.7792 16.7728 18.598C16.9422 18.4365 17.1507 18.1741 17.3387 17.9616C17.5267 17.7491 17.5894 17.5974 17.7167 17.3546C17.842 17.1127 17.7793 16.8993 17.6843 16.7181C17.5894 16.535 16.8354 14.7452 16.5192 14.0177C16.2137 13.3088 15.9023 13.4038 15.6703 13.3921C15.45 13.3823 15.1993 13.3793 14.9457 13.3793C14.6961 13.3793 14.2858 13.4704 13.9392 13.8346C13.5936 14.1989 12.6174 15.0781 12.6174 16.8679C12.6174 18.6588 13.9705 20.3879 14.1595 20.6307C14.3485 20.8725 16.8227 24.5472 20.6109 26.1236C21.5117 26.4966 22.2147 26.7208 22.764 26.8892C23.6687 27.1663 24.4922 27.1262 25.1423 27.0332C25.8668 26.9284 27.3766 26.1539 27.69 25.305C28.0052 24.4561 28.0052 23.7277 27.9112 23.5759C27.8192 23.4241 27.5666 23.3331 27.1887 23.15Z"
      fill="url(#paint0_linear_whatsapp)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_whatsapp"
        x1="23.7706"
        y1="5.54826"
        x2="23.7706"
        y2="34.9219"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F8971D" />
        <stop offset="1" stopColor="#EE3124" />
      </linearGradient>
    </defs>
  </svg>
)

const TikTokIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M33.928 12.9179C33.9202 12.698 33.8315 12.4887 33.6792 12.3299C33.5269 12.1711 33.3215 12.0739 33.1022 12.0568C31.6412 11.9207 30.2474 11.379 29.078 10.4928C28.2102 9.83509 27.4844 9.00884 26.9437 8.06367C26.4032 7.11849 26.0592 6.07385 25.9324 4.99244C25.9152 4.77307 25.818 4.56767 25.6592 4.41535C25.5005 4.26304 25.2912 4.17447 25.0714 4.1665H21.5567C21.442 4.16649 21.3287 4.18932 21.223 4.23369C21.1174 4.27805 21.0217 4.34305 20.9415 4.42489C20.8614 4.50672 20.7982 4.60374 20.756 4.71024C20.7139 4.81675 20.6932 4.9306 20.6955 5.04515V26.0273C20.6859 26.9993 20.3722 27.9437 19.7987 28.7285C19.225 29.5132 18.4204 30.0987 17.4974 30.403C16.931 30.5888 16.3349 30.6663 15.74 30.6315C14.989 30.5903 14.2593 30.3672 13.6137 29.9813C12.6888 29.4337 11.9799 28.5852 11.6056 27.5775C11.2314 26.57 11.2144 25.4643 11.5576 24.4458C11.9096 23.4333 12.5953 22.5705 13.5021 21.999C14.4089 21.4273 15.4831 21.181 16.5484 21.3002C16.6664 21.3125 16.7855 21.3 16.8982 21.2632C17.0109 21.2263 17.1145 21.1662 17.2025 21.0865C17.2904 21.007 17.3605 20.9097 17.4082 20.8012C17.456 20.6927 17.4804 20.5753 17.4797 20.4567V16.3446C17.4797 16.3446 15.986 16.2392 15.4764 16.2392C14.1695 16.2331 12.8778 16.5186 11.6952 17.075C10.5126 17.6313 9.46905 18.4443 8.6405 19.455C7.53866 20.6412 6.75305 22.0855 6.356 23.655C5.94856 25.3027 5.97738 27.028 6.43958 28.6612C6.9018 30.2943 7.78146 31.779 8.99196 32.9687C9.28198 33.2608 9.59328 33.531 9.92333 33.777C11.6599 35.1165 13.7929 35.84 15.986 35.8332C16.4858 35.8335 16.985 35.7982 17.4797 35.7277C19.5657 35.4185 21.4987 34.452 22.9977 32.9687C23.9142 32.0695 24.6437 30.998 25.1444 29.8158C25.645 28.6335 25.9069 27.364 25.9149 26.0802V14.517C27.9437 16.0828 30.388 17.0178 32.944 17.2057C33.0629 17.213 33.182 17.1955 33.2939 17.1545C33.4059 17.1133 33.5079 17.0495 33.5937 16.967C33.6797 16.8843 33.7475 16.7848 33.7929 16.6747C33.8384 16.5646 33.8605 16.4462 33.8579 16.3271V12.9179H33.928Z"
      fill="url(#paint0_linear_tiktok)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_tiktok"
        x1="23.2442"
        y1="4.16642"
        x2="23.2442"
        y2="35.8332"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F8971D" />
        <stop offset="1" stopColor="#EE3124" />
      </linearGradient>
    </defs>
  </svg>
)

export default function NotFound() {
  return (
    <div
      className="flex min-h-screen flex-col bg-white"
      style={{ fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif" }}
    >
      {/* Desktop Header */}
      <div className="hidden w-full border-b border-[#E8ECF4] lg:block">
        <div className="flex items-center justify-between px-20 py-6">
          {/* Logo */}
          <Link to="/">
            <img
              src="/primaryLogoHorizontal.png"
              alt="Primary Logo"
              className="h-[43px] w-[158px]"
            />
          </Link>

          {/* Search Bar */}
          <div className="flex w-[690px] items-center gap-3 rounded-3xl bg-[#F9FAFB] px-4 py-3">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search for Devices"
              className="flex-1 bg-transparent text-sm font-normal leading-[140%] text-[#A0A4AC] outline-none placeholder:text-[#A0A4AC]"
              style={{ fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif" }}
            />
          </div>

          {/* Cart and User */}
          <div className="flex items-center gap-5">
            <Link to="/cart" className="flex items-center gap-1">
              <ShoppingCartIcon />
              <span className="text-base font-normal leading-[140%] text-black">
                Cart
              </span>
            </Link>

            <div className="flex items-center gap-2">
              <UserAvatar size={30} />
              <div className="flex items-center gap-2">
                <span className="text-base font-normal leading-[140%] text-[#252525]">
                  James
                </span>
                <VuesaxArrowDown />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="w-full lg:hidden">
        <div className="flex items-center justify-between px-5 py-4">
          <Link to="/">
            <img
              src="/primaryLogoHorizontal.png"
              alt="Primary Logo"
              className="h-[42px] w-[147px]"
            />
          </Link>

          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E8ECF4] bg-white">
              <ShoppingCartIcon />
            </div>
            <UserAvatar size={40} />
          </div>
        </div>

        {/* Mobile Search */}
        <div className="border-t border-[#E8ECF4] px-5 py-4">
          <div className="flex items-center gap-3 rounded-3xl bg-[#F9FAFB] px-4 py-3">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search for Devices"
              className="flex-1 bg-transparent text-sm font-normal leading-[140%] text-[#A0A4AC] outline-none placeholder:text-[#A0A4AC]"
              style={{ fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif" }}
            />
          </div>
          <div className="mt-3 flex h-10 w-10 items-center justify-center rounded-full border border-[#E8ECF4] bg-white">
            <SettingsIcon />
          </div>
        </div>
      </div>

      {/* Desktop Filter Bar */}
      <div className="hidden h-12 items-center justify-between border-b border-[#E8ECF4] px-20 lg:flex">
        {/* Left Side */}
        <div className="flex items-center gap-[26px]">
          <div className="flex items-center gap-2 rounded-3xl bg-[#F9FAFB] px-4 py-2">
            <span className="text-base font-normal capitalize leading-[140%] text-black">
              Brand
            </span>
            <ArrowDownIcon />
          </div>

          <div className="flex items-center gap-2 rounded-3xl bg-[#F9FAFB] px-4 py-2">
            <span className="text-base font-normal capitalize leading-[140%] text-black">
              Price Range
            </span>
            <ArrowDownIcon />
          </div>

          <div className="flex items-center gap-2 rounded-3xl bg-[#F9FAFB] px-4 py-2">
            <span className="text-base font-normal capitalize leading-[140%] text-black">
              Device Type
            </span>
            <ArrowDownIcon />
          </div>

          <div className="flex items-center gap-2 rounded-3xl border border-[#E8ECF4] px-4 py-3">
            <SettingsIcon />
            <span className="text-base font-normal capitalize leading-[140%] text-black">
              All Filters
            </span>
            <ArrowDownIcon />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-3xl border border-[#F8971D] px-4 py-2">
            <span
              className="text-base font-normal capitalize leading-[140%]"
              style={{
                background: 'linear-gradient(180deg, #F8971D 0%, #EE3124 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              How it works
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-3xl border border-[#E8ECF4] px-4 py-2">
            <span className="text-base font-normal capitalize leading-[140%] text-black">
              Sort By
            </span>
            <ArrowDownIcon />
          </div>
        </div>
      </div>

      {/* Mobile Filters */}
      <div className="flex flex-col gap-4 px-5 py-4 lg:hidden">
        {/* Active Filters */}
        <div className="flex items-center gap-[6px]">
          <div className="flex items-center gap-1 rounded-3xl bg-[#F9FAFB] px-3 py-2">
            <span className="text-sm font-normal leading-[140%] text-black">
              Brand
            </span>
            <CloseIcon />
          </div>

          <div className="flex items-center gap-1 rounded-3xl bg-[#F9FAFB] px-3 py-2">
            <span className="text-sm font-normal leading-[140%] text-black">
              Price Range
            </span>
            <CloseIcon />
          </div>

          <div className="flex items-center gap-1 rounded-3xl bg-[#F9FAFB] px-3 py-2">
            <span className="text-sm font-normal leading-[140%] text-black">
              Device Type
            </span>
            <CloseIcon />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <div className="flex flex-1 items-center justify-center rounded-3xl border border-[#F8971D] px-4 py-2">
            <span
              className="text-center text-sm font-medium capitalize leading-[140%]"
              style={{
                background: 'linear-gradient(180deg, #F8971D 0%, #EE3124 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              How it works
            </span>
          </div>

          <div className="flex flex-1 items-center gap-2 rounded-3xl border border-[#E8ECF4] px-4 py-2">
            <span className="text-sm font-medium capitalize leading-[140%] text-black">
              Sort By
            </span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.6004 7.4585L11.1671 12.8918C10.5254 13.5335 9.47539 13.5335 8.83372 12.8918L3.40039 7.4585"
                stroke="#292D32"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center px-5 py-8 lg:px-20 lg:py-16">
        {/* 404 Illustration - Desktop */}
        <div className="mb-8 hidden lg:block">
          <img
            src="/404.png"
            alt="404 Error - Product not Found"
            className="h-[433px] w-[650px]"
          />
        </div>

        {/* 404 Illustration - Mobile */}
        <div className="mb-8 block lg:hidden">
          <img
            src="/404.png"
            alt="404 Error - Product not Found"
            className="h-[223px] w-[334px]"
          />
        </div>

        {/* Error Message - Desktop */}
        <div className="hidden w-full flex-col items-center gap-4 lg:flex">
          <h1
            className="text-center text-4xl font-semibold capitalize leading-[140%] text-[#1A2E35]"
            style={{ width: '451px' }}
          >
            Ooops! Product not found
          </h1>
          <p className="text-center text-[22px] font-medium capitalize leading-[140%] text-[#A0A4AC]">
            The Product you are looking for doesn't exist
          </p>

          <Link to="/" className="mt-2">
            <button
              className="flex items-center justify-center gap-2.5 rounded-3xl border border-[#F8971D] px-4 py-3 text-base font-medium capitalize leading-[140%] text-white"
              style={{
                width: '344px',
                background: 'linear-gradient(180deg, #F8971D 0%, #EE3124 100%)',
              }}
            >
              Back to Home
            </button>
          </Link>
        </div>

        {/* Error Message - Mobile */}
        <div className="flex w-full flex-col items-center gap-4 px-5 lg:hidden">
          <div className="flex flex-col items-start gap-3">
            <h1 className="w-full text-center text-lg font-medium capitalize leading-[140%] text-[#1A2E35]">
              Ooops! Product not found
            </h1>
            <p className="w-full text-center text-sm font-medium leading-[140%] text-[#A0A4AC]">
              The Product you are looking for doesn't exist
            </p>
          </div>

          <Link to="/" className="w-full">
            <button
              className="flex w-full items-center justify-center gap-2.5 rounded-3xl border border-[#F8971D] px-4 py-3 text-base font-medium capitalize leading-[140%] text-white"
              style={{
                background: 'linear-gradient(180deg, #F8971D 0%, #EE3124 100%)',
              }}
            >
              Back to Home
            </button>
          </Link>
        </div>
      </main>

      {/* Desktop Footer */}
      <footer className="hidden bg-[#161719] px-20 py-10 lg:block">
        <div className="flex flex-col gap-10">
          {/* Logo and Social */}
          <div className="flex items-center justify-center gap-[107px]">
            <img
              src="/primaryLogoHorizontal.png"
              alt="Primary Logo"
              className="h-[109px] w-[395px]"
            />

            <div className="flex items-center gap-5">
              <div className="flex h-[63px] w-[63px] items-center justify-center rounded-full bg-[rgba(255,255,255,0.1)] shadow-[0_22.483px_33.725px_-6.745px_rgba(0,0,0,0.1),0_8.993px_13.49px_-8.993px_rgba(0,0,0,0.1)]">
                <FacebookIcon />
              </div>
              <div className="flex h-[63px] w-[63px] items-center justify-center rounded-full bg-[rgba(255,255,255,0.1)] shadow-[0_22.483px_33.725px_-6.745px_rgba(0,0,0,0.1),0_8.993px_13.49px_-8.993px_rgba(0,0,0,0.1)]">
                <TwitterIcon />
              </div>
              <div className="flex h-[63px] w-[63px] items-center justify-center rounded-full bg-[rgba(255,255,255,0.1)] shadow-[0_22.483px_33.725px_-6.745px_rgba(0,0,0,0.1),0_8.993px_13.49px_-8.993px_rgba(0,0,0,0.1)]">
                <InstagramIcon />
              </div>
              <div className="flex h-[63px] w-[63px] items-center justify-center rounded-full bg-[rgba(255,255,255,0.1)] shadow-[0_22.483px_33.725px_-6.745px_rgba(0,0,0,0.1),0_8.993px_13.49px_-8.993px_rgba(0,0,0,0.1)]">
                <WhatsAppIcon />
              </div>
              <div className="flex h-[63px] w-[63px] items-center justify-center rounded-full bg-[rgba(255,255,255,0.1)] shadow-[0_22.483px_33.725px_-6.745px_rgba(0,0,0,0.1),0_8.993px_13.49px_-8.993px_rgba(0,0,0,0.1)]">
                <TikTokIcon />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex justify-between">
            {/* Useful Links */}
            <div className="flex flex-1 flex-col gap-6">
              <h3 className="text-2xl font-semibold capitalize leading-[140%] text-white">
                Useful Links
              </h3>
              <div className="flex flex-col gap-3">
                <Link
                  to="/how-it-works"
                  className="text-base font-medium leading-[140%] text-white"
                >
                  How it Works
                </Link>
                <Link
                  to="/faqs"
                  className="text-base font-medium leading-[140%] text-white"
                >
                  FAqs
                </Link>
                <Link
                  to="/terms"
                  className="text-base font-medium leading-[140%] text-white"
                >
                  Terms & Conditions
                </Link>
              </div>
            </div>

            {/* Other Links */}
            <div className="flex flex-1 flex-col gap-7">
              <h3 className="text-2xl font-semibold capitalize leading-[140%] text-white">
                Other Links
              </h3>
              <div className="flex flex-col gap-3">
                <div className="text-base font-medium leading-[140%] text-white">
                  USSD code *884#
                </div>
                <Link
                  to="/privacy"
                  className="text-base font-medium leading-[140%] text-white"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/insurance"
                  className="text-base font-medium leading-[140%] text-white"
                >
                  Insurance Policy
                </Link>
              </div>
            </div>

            {/* Contact Us */}
            <div className="flex flex-1 flex-col gap-7">
              <h3 className="text-2xl font-semibold capitalize leading-[140%] text-white">
                Contact Us
              </h3>
              <div className="flex flex-col gap-3">
                <div className="text-base font-medium leading-[140%] text-white">
                  +09 456 789
                </div>
                <div className="text-base font-medium leading-[140%] text-white">
                  OkoaSASA@gamil.com
                </div>
                <div className="text-base font-medium leading-[140%] text-white">
                  1234 Building, Kenya
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="flex w-[400px] flex-col items-center gap-6">
              <h3 className="w-full text-2xl font-semibold capitalize leading-[140%] text-white">
                You can Find us On!
              </h3>
              <div className="flex w-full items-center gap-2.5">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 rounded-2xl bg-[#2C2D2F] px-6 py-3 text-base font-normal leading-[140%] text-[#A0A4AC] outline-none placeholder:text-[#A0A4AC]"
                  style={{
                    fontFamily: 'Gilroy-Medium, -apple-system, Roboto, Helvetica, sans-serif',
                    letterSpacing: '-0.6px',
                  }}
                />
                <button
                  className="rounded-3xl px-6 py-3 text-base font-medium capitalize leading-[140%] text-[#FEFEFE]"
                  style={{
                    background: 'linear-gradient(180deg, #F8971D 0%, #EE3124 100%)',
                  }}
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Footer */}
      <footer className="bg-[#161719] px-5 py-10 lg:hidden">
        <div className="flex w-full flex-col gap-10">
          {/* Logo and Social */}
          <div className="flex flex-col items-center gap-6">
            <img
              src="/primaryLogoHorizontal.png"
              alt="Primary Logo"
              className="h-[72px] w-[262px]"
            />

            <div className="flex items-start gap-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(255,255,255,0.1)] shadow-[0_22.483px_33.725px_-6.745px_rgba(0,0,0,0.1),0_8.993px_13.49px_-8.993px_rgba(0,0,0,0.1)]">
                <svg
                  width="11"
                  height="20"
                  viewBox="0 0 11 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 11.5H9.5L10.5 7.5H7V5.5C7 4.47 7 3.5 9 3.5H10.5V0.14C10.174 0.097 8.943 0 7.643 0C4.928 0 3 1.657 3 4.7V7.5H0V11.5H3V20H7V11.5Z"
                    fill="url(#paint0_linear_fb_mobile)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_fb_mobile"
                      x1="6.4731"
                      y1="-5.42212e-05"
                      x2="6.4731"
                      y2="20"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#F8971D" />
                      <stop offset="1" stopColor="#EE3124" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(255,255,255,0.1)] shadow-[0_22.483px_33.725px_-6.745px_rgba(0,0,0,0.1),0_8.993px_13.49px_-8.993px_rgba(0,0,0,0.1)]">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.7984 1.74512H19.8908L13.1349 9.46665L21.0827 19.9739H14.8597L9.98555 13.6013L4.40847 19.9739H1.31424L8.54033 11.7149L0.916016 1.74512H7.29703L11.7028 7.56992L16.7984 1.74512ZM15.7131 18.123H17.4266L6.36596 3.49882H4.52719L15.7131 18.123Z"
                    fill="url(#paint0_linear_x_mobile)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_x_mobile"
                      x1="13.3485"
                      y1="1.74507"
                      x2="13.3485"
                      y2="19.9739"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#F8971D" />
                      <stop offset="1" stopColor="#EE3124" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(255,255,255,0.1)] shadow-[0_22.483px_33.725px_-6.745px_rgba(0,0,0,0.1),0_8.993px_13.49px_-8.993px_rgba(0,0,0,0.1)]">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_instagram_mobile)">
                    <path
                      d="M11 1.98086C13.9391 1.98086 14.2871 1.99375 15.443 2.04531C16.5172 2.09258 17.0973 2.27305 17.484 2.42344C17.9953 2.62109 18.3648 2.86172 18.7473 3.24414C19.134 3.63086 19.3703 3.99609 19.568 4.50742C19.7184 4.89414 19.8988 5.47852 19.9461 6.54844C19.9977 7.70859 20.0105 8.05664 20.0105 10.9914C20.0105 13.9305 19.9977 14.2785 19.9461 15.4344C19.8988 16.5086 19.7184 17.0887 19.568 17.4754C19.3703 17.9867 19.1297 18.3563 18.7473 18.7387C18.3605 19.1254 17.9953 19.3617 17.484 19.5594C17.0973 19.7098 16.5129 19.8902 15.443 19.9375C14.2828 19.9891 13.9348 20.002 11 20.002C8.06094 20.002 7.71289 19.9891 6.55703 19.9375C5.48281 19.8902 4.90273 19.7098 4.51602 19.5594C4.00469 19.3617 3.63516 19.1211 3.25273 18.7387C2.86602 18.352 2.62969 17.9867 2.43203 17.4754C2.28164 17.0887 2.10117 16.5043 2.05391 15.4344C2.00234 14.2742 1.98945 13.9262 1.98945 10.9914C1.98945 8.05234 2.00234 7.7043 2.05391 6.54844C2.10117 5.47422 2.28164 4.89414 2.43203 4.50742C2.62969 3.99609 2.87031 3.62656 3.25273 3.24414C3.63945 2.85742 4.00469 2.62109 4.51602 2.42344C4.90273 2.27305 5.48711 2.09258 6.55703 2.04531C7.71289 1.99375 8.06094 1.98086 11 1.98086ZM11 0C8.01367 0 7.63984 0.0128906 6.4668 0.0644531C5.29805 0.116016 4.49453 0.305078 3.79844 0.575781C3.07227 0.859375 2.45781 1.2332 1.84766 1.84766C1.2332 2.45781 0.859375 3.07227 0.575781 3.79414C0.305078 4.49453 0.116016 5.29375 0.0644531 6.4625C0.0128906 7.63984 0 8.01367 0 11C0 13.9863 0.0128906 14.3602 0.0644531 15.5332C0.116016 16.702 0.305078 17.5055 0.575781 18.2016C0.859375 18.9277 1.2332 19.5422 1.84766 20.1523C2.45781 20.7625 3.07227 21.1406 3.79414 21.4199C4.49453 21.6906 5.29375 21.8797 6.4625 21.9312C7.63555 21.9828 8.00937 21.9957 10.9957 21.9957C13.982 21.9957 14.3559 21.9828 15.5289 21.9312C16.6977 21.8797 17.5012 21.6906 18.1973 21.4199C18.9191 21.1406 19.5336 20.7625 20.1437 20.1523C20.7539 19.5422 21.132 18.9277 21.4113 18.2059C21.682 17.5055 21.8711 16.7063 21.9227 15.5375C21.9742 14.3645 21.9871 13.9906 21.9871 11.0043C21.9871 8.01797 21.9742 7.64414 21.9227 6.47109C21.8711 5.30234 21.682 4.49883 21.4113 3.80273C21.1406 3.07227 20.7668 2.45781 20.1523 1.84766C19.5422 1.2375 18.9277 0.859375 18.2059 0.580078C17.5055 0.309375 16.7062 0.120313 15.5375 0.06875C14.3602 0.0128906 13.9863 0 11 0Z"
                      fill="url(#paint0_linear_instagram_mobile)"
                    />
                    <path
                      d="M11 5.34961C7.88047 5.34961 5.34961 7.88047 5.34961 11C5.34961 14.1195 7.88047 16.6504 11 16.6504C14.1195 16.6504 16.6504 14.1195 16.6504 11C16.6504 7.88047 14.1195 5.34961 11 5.34961ZM11 14.6652C8.97617 14.6652 7.33477 13.0238 7.33477 11C7.33477 8.97617 8.97617 7.33477 11 7.33477C13.0238 7.33477 14.6652 8.97617 14.6652 11C14.6652 13.0238 13.0238 14.6652 11 14.6652Z"
                      fill="url(#paint1_linear_instagram_mobile)"
                    />
                    <path
                      d="M18.193 5.12627C18.193 5.85674 17.6 6.44542 16.8738 6.44542C16.1434 6.44542 15.5547 5.85245 15.5547 5.12627C15.5547 4.3958 16.1477 3.80713 16.8738 3.80713C17.6 3.80713 18.193 4.4001 18.193 5.12627Z"
                      fill="url(#paint2_linear_instagram_mobile)"
                    />
                  </g>
                  <defs>
                    <linearGradient
                      id="paint0_linear_instagram_mobile"
                      x1="13.5547"
                      y1="-5.96316e-05"
                      x2="13.5547"
                      y2="21.9957"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#F8971D" />
                      <stop offset="1" stopColor="#EE3124" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_instagram_mobile"
                      x1="12.3164"
                      y1="5.34958"
                      x2="12.3164"
                      y2="16.6504"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#F8971D" />
                      <stop offset="1" stopColor="#EE3124" />
                    </linearGradient>
                    <linearGradient
                      id="paint2_linear_instagram_mobile"
                      x1="17.1811"
                      y1="3.80712"
                      x2="17.1811"
                      y2="6.44541"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#F8971D" />
                      <stop offset="1" stopColor="#EE3124" />
                    </linearGradient>
                    <clipPath id="clip0_instagram_mobile">
                      <rect width="22" height="22" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(255,255,255,0.1)] shadow-[0_22.483px_33.725px_-6.745px_rgba(0,0,0,0.1),0_8.993px_13.49px_-8.993px_rgba(0,0,0,0.1)]">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 22L1.54641 16.3506C0.592165 14.6969 0.0907498 12.8223 0.0916665 10.9001C0.0944165 4.89042 4.98482 0 10.9936 0C13.9095 0.000916667 16.6466 1.13667 18.7055 3.19733C20.7634 5.258 21.8964 7.997 21.8955 10.9102C21.8927 16.9208 17.0023 21.8112 10.9936 21.8112C9.1694 21.8103 7.37182 21.3528 5.77957 20.4838L0 22ZM6.04724 18.5103C7.58357 19.4223 9.05023 19.9687 10.9899 19.9696C15.9839 19.9696 20.052 15.9051 20.0548 10.9083C20.0566 5.9015 16.0077 1.8425 10.9972 1.84067C5.99957 1.84067 1.93416 5.90517 1.93233 10.901C1.93141 12.9406 2.52908 14.4677 3.53283 16.0655L2.61708 19.4095L6.04724 18.5103ZM16.4853 13.5016C16.4175 13.3879 16.236 13.3201 15.9628 13.1835C15.6905 13.0469 14.3513 12.3878 14.1011 12.2971C13.8517 12.2063 13.6702 12.1605 13.4878 12.4337C13.3063 12.7059 12.7838 13.3201 12.6252 13.5016C12.4666 13.6831 12.3071 13.706 12.0349 13.5694C11.7626 13.4328 10.8845 13.1459 9.84406 12.2173C9.03465 11.495 8.4874 10.6031 8.32881 10.3299C8.17023 10.0577 8.31231 9.91008 8.44798 9.77442C8.57081 9.6525 8.72023 9.45633 8.85681 9.29683C8.99523 9.13917 9.04015 9.0255 9.13181 8.84308C9.22256 8.66158 9.17765 8.50208 9.1089 8.3655C9.04015 8.22983 8.49565 6.88875 8.26923 6.34333C8.0474 5.81258 7.82282 5.88408 7.65598 5.87583L7.13348 5.86667C6.95198 5.86667 6.65682 5.9345 6.40749 6.20767C6.15815 6.48083 5.45415 7.139 5.45415 8.48008C5.45415 9.82117 6.4304 11.1164 6.56607 11.2979C6.70265 11.4794 8.48648 14.2313 11.2191 15.411C11.869 15.6915 12.3768 15.8593 12.7719 15.9848C13.4246 16.192 14.0186 16.1627 14.4879 16.093C15.0113 16.0151 16.0994 15.4339 16.3267 14.7978C16.554 14.1607 16.554 13.6153 16.4853 13.5016Z"
                    fill="url(#paint0_linear_whatsapp_mobile)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_whatsapp_mobile"
                      x1="13.4982"
                      y1="-5.96433e-05"
                      x2="13.4982"
                      y2="22"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#F8971D" />
                      <stop offset="1" stopColor="#EE3124" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(255,255,255,0.1)] shadow-[0_22.483px_33.725px_-6.745px_rgba(0,0,0,0.1),0_8.993px_13.49px_-8.993px_rgba(0,0,0,0.1)]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.3572 7.75082C20.3525 7.61889 20.2993 7.49333 20.2079 7.39805C20.1165 7.30277 19.9933 7.24445 19.8617 7.23418C18.9851 7.15249 18.1488 6.82747 17.4472 6.29578C16.9265 5.90115 16.491 5.4054 16.1666 4.8383C15.8423 4.27119 15.6359 3.64441 15.5598 2.99556C15.5495 2.86394 15.4912 2.7407 15.3959 2.64931C15.3007 2.55792 15.1751 2.50478 15.0432 2.5H12.9344C12.8656 2.49999 12.7976 2.51369 12.7342 2.54031C12.6708 2.56693 12.6134 2.60593 12.5653 2.65503C12.5172 2.70413 12.4793 2.76234 12.454 2.82624C12.4287 2.89015 12.4163 2.95846 12.4177 3.02719V15.6165C12.4119 16.1997 12.2237 16.7663 11.8796 17.2372C11.5354 17.708 11.0526 18.0593 10.4988 18.2419C10.159 18.3534 9.80135 18.3999 9.4444 18.379C8.99379 18.3543 8.55595 18.2204 8.1686 17.9889C7.61365 17.6603 7.18833 17.1512 6.96378 16.5466C6.73923 15.9421 6.72906 15.2787 6.93497 14.6676C7.14616 14.0601 7.55755 13.5424 8.10165 13.1995C8.64575 12.8565 9.29025 12.7087 9.92941 12.7802C10.0002 12.7876 10.0717 12.7801 10.1393 12.758C10.2069 12.7359 10.2691 12.6998 10.3219 12.652C10.3746 12.6043 10.4167 12.5459 10.4453 12.4808C10.474 12.4157 10.4886 12.3453 10.4882 12.2741V9.80687C10.4882 9.80687 9.59201 9.74361 9.28624 9.74361C8.50211 9.73995 7.72705 9.91127 7.01751 10.2451C6.30797 10.5789 5.68182 11.0667 5.18469 11.6731C4.52359 12.3848 4.05222 13.2514 3.81399 14.1931C3.56953 15.1817 3.58682 16.2169 3.86414 17.1968C4.14147 18.1767 4.66927 19.0675 5.39557 19.7813C5.56958 19.9566 5.75636 20.1187 5.95439 20.2663C6.99632 21.07 8.27613 21.5041 9.59201 21.5C9.89187 21.5002 10.1914 21.479 10.4882 21.4367C11.7398 21.2512 12.8996 20.6713 13.799 19.7813C14.3489 19.2418 14.7866 18.5989 15.087 17.8896C15.3874 17.1802 15.5445 16.4185 15.5493 15.6482V8.71031C16.7666 9.64979 18.2332 10.2108 19.7668 10.3235C19.8381 10.3279 19.9096 10.3174 19.9767 10.2928C20.0439 10.2681 20.1051 10.2298 20.1566 10.1803C20.2082 10.1307 20.2489 10.071 20.2761 10.0049C20.3034 9.93883 20.3167 9.8678 20.3151 9.79633V7.75082H20.3572Z"
                    fill="url(#paint0_linear_tiktok_mobile)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_tiktok_mobile"
                      x1="13.9469"
                      y1="2.49995"
                      x2="13.9469"
                      y2="21.5"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#F8971D" />
                      <stop offset="1" stopColor="#EE3124" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-4">
              {/* Useful Links */}
              <div className="flex flex-1 flex-col gap-3">
                <h3 className="text-xl font-semibold capitalize leading-[140%] text-white">
                  Useful Links
                </h3>
                <div className="flex flex-col gap-2">
                  <Link
                    to="/how-it-works"
                    className="text-sm font-medium leading-[140%] text-white"
                  >
                    How it Works
                  </Link>
                  <Link
                    to="/faqs"
                    className="text-sm font-medium leading-[140%] text-white"
                  >
                    FAQs
                  </Link>
                  <Link
                    to="/terms"
                    className="text-sm font-medium leading-[140%] text-white"
                  >
                    Terms & Conditions
                  </Link>
                </div>
              </div>

              {/* Other Links */}
              <div className="flex flex-1 flex-col items-end gap-3">
                <h3 className="w-full text-xl font-semibold capitalize leading-[140%] text-white">
                  Other Links
                </h3>
                <div className="flex w-full flex-col gap-2">
                  <div className="text-sm font-medium leading-[140%] text-white">
                    USSD code *884#
                  </div>
                  <Link
                    to="/privacy"
                    className="text-sm font-medium leading-[140%] text-white"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    to="/insurance"
                    className="text-sm font-medium leading-[140%] text-white"
                  >
                    Insurance Policy
                  </Link>
                </div>
              </div>
            </div>

            {/* Contact Us */}
            <div className="flex flex-col gap-3">
              <h3 className="text-xl font-semibold capitalize leading-[140%] text-white">
                Contact Us
              </h3>
              <div className="flex flex-col gap-2">
                <div className="text-sm font-medium leading-[140%] text-white">
                  +09 456 789
                </div>
                <div className="text-sm font-medium leading-[140%] text-white">
                  OkoaSASA@gamil.com
                </div>
                <div className="text-sm font-medium leading-[140%] text-white">
                  1234 Building, Kenya
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="flex flex-col items-center gap-6">
              <h3 className="w-full text-xl font-semibold capitalize leading-[140%] text-white">
                You can Find us On!
              </h3>
              <div className="flex w-full flex-col gap-2.5">
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="w-full rounded-2xl bg-[#2C2D2F] px-6 py-3 text-sm font-semibold capitalize leading-[140%] text-[#A0A4AC] outline-none placeholder:text-[#A0A4AC]"
                  style={{
                    fontFamily: "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                  }}
                />
                <button
                  className="rounded-3xl px-6 py-3 text-xs font-medium leading-[140%] text-[#FEFEFE]"
                  style={{
                    background: 'linear-gradient(180deg, #F8971D 0%, #EE3124 100%)',
                  }}
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
