import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'

const FilterIcon = () => (
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

const CheckIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_450_10792)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.6599 4.55417C17.8161 4.71044 17.9039 4.92237 17.9039 5.14334C17.9039 5.36431 17.8161 5.57623 17.6599 5.7325L8.29158 15.1017C8.20646 15.1868 8.10539 15.2544 7.99414 15.3005C7.8829 15.3466 7.76366 15.3703 7.64325 15.3703C7.52284 15.3703 7.4036 15.3466 7.29236 15.3005C7.18111 15.2544 7.08004 15.1868 6.99492 15.1017L2.33992 10.4467C2.26249 10.3692 2.20107 10.2773 2.15917 10.1762C2.11727 10.075 2.0957 9.96658 2.0957 9.85709C2.0957 9.74759 2.11727 9.63917 2.15917 9.53801C2.20107 9.43684 2.26249 9.34493 2.33992 9.2675C2.41734 9.19008 2.50926 9.12866 2.61042 9.08676C2.71158 9.04486 2.82 9.02329 2.9295 9.02329C3.039 9.02329 3.14742 9.04486 3.24858 9.08676C3.34974 9.12866 3.44166 9.19008 3.51908 9.2675L7.64408 13.3925L16.4808 4.55417C16.637 4.39794 16.8489 4.31018 17.0699 4.31018C17.2909 4.31018 17.5036 4.39794 17.6599 4.55417Z"
        fill="#F47120"
      />
    </g>
    <defs>
      <clipPath id="clip0_450_10792">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

const ArrowDownIcon = ({ className = '' }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M13.2802 10.0333L8.93355 5.68667C8.42021 5.17333 7.58021 5.17333 7.06688 5.68667L2.72021 10.0333"
      stroke="#292D32"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const CheckedCheckboxIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.4915 1.66666H6.50817C3.47484 1.66666 1.6665 3.475 1.6665 6.50833V13.4833C1.6665 16.525 3.47484 18.3333 6.50817 18.3333H13.4832C16.5165 18.3333 18.3248 16.525 18.3248 13.4917V6.50833C18.3332 3.475 16.5248 1.66666 13.4915 1.66666ZM13.9832 8.08333L9.25817 12.8083C9.1415 12.925 8.98317 12.9917 8.8165 12.9917C8.64984 12.9917 8.4915 12.925 8.37484 12.8083L6.0165 10.45C5.77484 10.2083 5.77484 9.80833 6.0165 9.56666C6.25817 9.325 6.65817 9.325 6.89984 9.56666L8.8165 11.4833L13.0998 7.2C13.3415 6.95833 13.7415 6.95833 13.9832 7.2C14.2248 7.44166 14.2248 7.83333 13.9832 8.08333Z"
      fill="#1C8546"
    />
  </svg>
)

const UncheckedCheckboxIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.4998 18.9583H7.49984C2.97484 18.9583 1.0415 17.025 1.0415 12.5V7.5C1.0415 2.975 2.97484 1.04166 7.49984 1.04166H12.4998C17.0248 1.04166 18.9582 2.975 18.9582 7.5V12.5C18.9582 17.025 17.0248 18.9583 12.4998 18.9583ZM7.49984 2.29166C3.65817 2.29166 2.2915 3.65833 2.2915 7.5V12.5C2.2915 16.3417 3.65817 17.7083 7.49984 17.7083H12.4998C16.3415 17.7083 17.7082 16.3417 17.7082 12.5V7.5C17.7082 3.65833 16.3415 2.29166 12.4998 2.29166H7.49984Z"
      fill="#A0A4AC"
    />
  </svg>
)

const FilterSection = ({ title, children, isOpen, onToggle }) => (
  <div className="flex flex-col items-start gap-3 self-stretch">
    <button
      onClick={onToggle}
      className="flex items-center justify-between self-stretch"
    >
      <span className="font-['Public_Sans'] text-sm font-medium leading-[140%] text-black">
        {title}
      </span>
      <ArrowDownIcon
        className={`transition-transform duration-200 ${isOpen ? '' : 'rotate-180'}`}
      />
    </button>
    {isOpen && children}
  </div>
)

const FilterCheckboxItem = ({ label, checked, onChange }) => (
  <button
    onClick={() => onChange(!checked)}
    className="flex items-center justify-center gap-2 self-stretch rounded-lg px-2 py-1"
  >
    {checked ? <CheckedCheckboxIcon /> : <UncheckedCheckboxIcon />}
    <span className="flex-1 text-left font-['Public_Sans'] text-sm font-medium leading-[140%] text-[#252525]">
      {label}
    </span>
  </button>
)

export function FilterBar({ className = '', onLoanCalculatorOpen }) {
  const [selectedPaymentType, setSelectedPaymentType] = useState('basic')
  const [selectedSort, setSelectedSort] = useState('price-low-high')
  const [activeFilters, setActiveFilters] = useState({
    brand: ['Brand'],
    priceRange: ['Price Range'],
    deviceType: ['Device Type'],
  })

  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [openSections, setOpenSections] = useState({
    price: true,
    color: true,
    storage: true,
    camera: true,
    display: true,
    ram: true,
    brand: true,
  })

  const [filters, setFilters] = useState({
    priceRange: [0, 200000],
    priceMin: '00',
    priceMax: '00',
    color: {
      Green: true,
      Black: false,
    },
    storage: {
      '128 GB': true,
      '256 GB': false,
    },
    camera: {
      '50MP': true,
      '256 GB': false,
    },
    display: {
      '6.3"': true,
      '6.6': false,
      '6.7': false,
    },
    ram: {
      '8 GB': true,
    },
    brand: {
      Apple: false,
      TECNO: false,
      TCL: false,
    },
  })

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const removeFilter = (type, value) => {
    setActiveFilters((prev) => ({
      ...prev,
      [type]: prev[type].filter((item) => item !== value),
    }))
  }

  const clearAllFilters = () => {
    setFilters({
      priceRange: [0, 200000],
      priceMin: '00',
      priceMax: '00',
      color: {
        Green: false,
        Black: false,
      },
      storage: {
        '128 GB': false,
        '256 GB': false,
      },
      camera: {
        '50MP': false,
        '256 GB': false,
      },
      display: {
        '6.3"': false,
        '6.6': false,
        '6.7': false,
      },
      ram: {
        '8 GB': false,
      },
      brand: {
        Apple: false,
        TECNO: false,
        TCL: false,
      },
    })
  }

  return (
    <div
      className={`flex flex-col gap-4 border-b border-[#E8ECF4] py-4 md:py-6 lg:flex-row lg:items-center lg:justify-between lg:py-8 ${className}`}
    >
      <div className="flex flex-wrap items-center gap-2 md:gap-[26px]">
        {activeFilters.brand.map((brand) => (
          <div
            key={brand}
            className="flex items-center gap-2 rounded-3xl bg-[#F9FAFB] px-3 py-1.5 md:px-4 md:py-2"
          >
            <span className="text-sm font-normal capitalize text-black md:text-base">
              {brand}
            </span>
            <button
              onClick={() => removeFilter('brand', brand)}
              className="flex items-center justify-center"
            >
              <X className="h-5 w-5 text-[#09244B] md:h-6 md:w-6" />
            </button>
          </div>
        ))}

        {activeFilters.priceRange.map((range) => (
          <div
            key={range}
            className="flex items-center gap-2 rounded-3xl bg-[#F9FAFB] px-3 py-1.5 md:px-4 md:py-2"
          >
            <span className="text-sm font-normal capitalize text-black md:text-base">
              {range}
            </span>
            <button
              onClick={() => removeFilter('priceRange', range)}
              className="flex items-center justify-center"
            >
              <X className="h-5 w-5 text-[#09244B] md:h-6 md:w-6" />
            </button>
          </div>
        ))}

        {activeFilters.deviceType.map((device) => (
          <div
            key={device}
            className="flex items-center gap-2 rounded-3xl bg-[#F9FAFB] px-3 py-1.5 md:px-4 md:py-2"
          >
            <span className="text-sm font-normal capitalize text-black md:text-base">
              {device}
            </span>
            <button
              onClick={() => removeFilter('deviceType', device)}
              className="flex items-center justify-center"
            >
              <X className="h-5 w-5 text-[#09244B] md:h-6 md:w-6" />
            </button>
          </div>
        ))}

        <Popover open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-2 rounded-3xl bg-[#F9FAFB] px-3 py-1.5 md:px-4 md:py-2">
              <span className="text-sm font-normal capitalize text-black md:text-base">
                All Filters
              </span>
              <FilterIcon />
            </button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="w-[280px] overflow-y-auto rounded-2xl border-none bg-white p-4 shadow-[0_4px_24px_0_rgba(37,37,37,0.08)] max-h-[90vh]"
          >
            <div className="flex flex-col items-start justify-center gap-4">
              <div className="flex items-center justify-between self-stretch">
                <span className="font-['Public_Sans'] text-base font-medium leading-[140%] text-black">
                  Filters
                </span>
                <button
                  onClick={clearAllFilters}
                  className="font-['Public_Sans'] text-xs font-medium leading-[140%] text-[#F25E5E]"
                >
                  Clear
                </button>
              </div>

              <FilterSection
                title="Price"
                isOpen={openSections.price}
                onToggle={() => toggleSection('price')}
              >
                <div className="flex flex-col items-start gap-3 self-stretch">
                  <div className="relative h-4 self-stretch">
                    <div className="absolute left-0 top-1 h-2 w-full rounded-lg bg-[#F9FAFB]"></div>
                    <div
                      className="absolute left-0 top-1 h-2 rounded-lg bg-[#F47120]"
                      style={{
                        width: `${((filters.priceRange[1] - filters.priceRange[0]) / 200000) * 100}%`,
                      }}
                    ></div>
                    <div className="absolute left-0 top-0 h-4 w-4 rounded-full border border-[#E8ECF4] bg-white"></div>
                    <div
                      className="absolute top-0 h-4 w-4 rounded-full border border-[#E8ECF4] bg-white"
                      style={{
                        left: `${((filters.priceRange[1] - filters.priceRange[0]) / 200000) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <div className="flex items-start gap-2 self-stretch">
                    <div className="flex flex-1 items-center justify-center gap-2.5 rounded-lg border border-[#E8ECF4] px-3 py-1">
                      <input
                        type="text"
                        value={filters.priceMin}
                        onChange={(e) =>
                          setFilters((prev) => ({
                            ...prev,
                            priceMin: e.target.value,
                          }))
                        }
                        className="w-full font-['Public_Sans'] text-sm font-normal leading-[140%] text-[#A0A4AC] outline-none"
                        placeholder="00"
                      />
                    </div>
                    <div className="flex flex-1 items-center justify-center gap-2.5 rounded-lg border border-[#E8ECF4] px-3 py-1">
                      <input
                        type="text"
                        value={filters.priceMax}
                        onChange={(e) =>
                          setFilters((prev) => ({
                            ...prev,
                            priceMax: e.target.value,
                          }))
                        }
                        className="w-full font-['Public_Sans'] text-sm font-normal leading-[140%] text-[#A0A4AC] outline-none"
                        placeholder="00"
                      />
                    </div>
                  </div>
                  <button className="flex items-center justify-center gap-2 self-stretch rounded-3xl bg-[#F47120] px-4 py-2">
                    <span className="font-['Public_Sans'] text-xs font-medium leading-[140%] text-white">
                      Apply
                    </span>
                  </button>
                  <div className="h-px self-stretch bg-[#E8ECF4]"></div>
                </div>
              </FilterSection>

              <FilterSection
                title="Color"
                isOpen={openSections.color}
                onToggle={() => toggleSection('color')}
              >
                <div className="flex flex-col items-start gap-3 self-stretch">
                  <FilterCheckboxItem
                    label="Green"
                    checked={filters.color.Green}
                    onChange={(checked) =>
                      setFilters((prev) => ({
                        ...prev,
                        color: { ...prev.color, Green: checked },
                      }))
                    }
                  />
                  <FilterCheckboxItem
                    label="Black"
                    checked={filters.color.Black}
                    onChange={(checked) =>
                      setFilters((prev) => ({
                        ...prev,
                        color: { ...prev.color, Black: checked },
                      }))
                    }
                  />
                  <div className="h-px self-stretch bg-[#E8ECF4]"></div>
                </div>
              </FilterSection>

              <FilterSection
                title="Storage Capacity"
                isOpen={openSections.storage}
                onToggle={() => toggleSection('storage')}
              >
                <div className="flex flex-col items-start gap-3 self-stretch">
                  <FilterCheckboxItem
                    label="128 GB"
                    checked={filters.storage['128 GB']}
                    onChange={(checked) =>
                      setFilters((prev) => ({
                        ...prev,
                        storage: { ...prev.storage, '128 GB': checked },
                      }))
                    }
                  />
                  <FilterCheckboxItem
                    label="256 GB"
                    checked={filters.storage['256 GB']}
                    onChange={(checked) =>
                      setFilters((prev) => ({
                        ...prev,
                        storage: { ...prev.storage, '256 GB': checked },
                      }))
                    }
                  />
                  <div className="h-px self-stretch bg-[#E8ECF4]"></div>
                </div>
              </FilterSection>

              <FilterSection
                title="Camera Megapixel"
                isOpen={openSections.camera}
                onToggle={() => toggleSection('camera')}
              >
                <div className="flex flex-col items-start gap-3 self-stretch">
                  <FilterCheckboxItem
                    label="50MP"
                    checked={filters.camera['50MP']}
                    onChange={(checked) =>
                      setFilters((prev) => ({
                        ...prev,
                        camera: { ...prev.camera, '50MP': checked },
                      }))
                    }
                  />
                  <FilterCheckboxItem
                    label="256 GB"
                    checked={filters.camera['256 GB']}
                    onChange={(checked) =>
                      setFilters((prev) => ({
                        ...prev,
                        camera: { ...prev.camera, '256 GB': checked },
                      }))
                    }
                  />
                  <div className="h-px self-stretch bg-[#E8ECF4]"></div>
                </div>
              </FilterSection>

              <FilterSection
                title="Display Size"
                isOpen={openSections.display}
                onToggle={() => toggleSection('display')}
              >
                <div className="flex flex-col items-start gap-3 self-stretch">
                  <FilterCheckboxItem
                    label='6.3"'
                    checked={filters.display['6.3"']}
                    onChange={(checked) =>
                      setFilters((prev) => ({
                        ...prev,
                        display: { ...prev.display, '6.3"': checked },
                      }))
                    }
                  />
                  <FilterCheckboxItem
                    label="6.6"
                    checked={filters.display['6.6']}
                    onChange={(checked) =>
                      setFilters((prev) => ({
                        ...prev,
                        display: { ...prev.display, '6.6': checked },
                      }))
                    }
                  />
                  <FilterCheckboxItem
                    label="6.7"
                    checked={filters.display['6.7']}
                    onChange={(checked) =>
                      setFilters((prev) => ({
                        ...prev,
                        display: { ...prev.display, '6.7': checked },
                      }))
                    }
                  />
                  <div className="h-px self-stretch bg-[#E8ECF4]"></div>
                </div>
              </FilterSection>

              <FilterSection
                title="RAM"
                isOpen={openSections.ram}
                onToggle={() => toggleSection('ram')}
              >
                <div className="flex flex-col items-start gap-3 self-stretch">
                  <FilterCheckboxItem
                    label="8 GB"
                    checked={filters.ram['8 GB']}
                    onChange={(checked) =>
                      setFilters((prev) => ({
                        ...prev,
                        ram: { ...prev.ram, '8 GB': checked },
                      }))
                    }
                  />
                  <div className="h-px self-stretch bg-[#E8ECF4]"></div>
                </div>
              </FilterSection>

              <FilterSection
                title="Brand"
                isOpen={openSections.brand}
                onToggle={() => toggleSection('brand')}
              >
                <div className="flex flex-col items-start gap-3 self-stretch">
                  <FilterCheckboxItem
                    label="Apple"
                    checked={filters.brand.Apple}
                    onChange={(checked) =>
                      setFilters((prev) => ({
                        ...prev,
                        brand: { ...prev.brand, Apple: checked },
                      }))
                    }
                  />
                  <FilterCheckboxItem
                    label="TECNO"
                    checked={filters.brand.TECNO}
                    onChange={(checked) =>
                      setFilters((prev) => ({
                        ...prev,
                        brand: { ...prev.brand, TECNO: checked },
                      }))
                    }
                  />
                  <FilterCheckboxItem
                    label="TCL"
                    checked={filters.brand.TCL}
                    onChange={(checked) =>
                      setFilters((prev) => ({
                        ...prev,
                        brand: { ...prev.brand, TCL: checked },
                      }))
                    }
                  />
                  <div className="h-px self-stretch bg-[#E8ECF4]"></div>
                </div>
              </FilterSection>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex flex-wrap items-center gap-2 md:justify-end md:gap-3">
        <button className="rounded-3xl border border-[#F8971D] bg-gradient-to-b from-transparent to-transparent px-3 py-1.5 md:px-4 md:py-2">
          <span className="bg-gradient-to-b from-[#F8971D] to-[#EE3124] bg-clip-text text-sm font-normal capitalize text-transparent md:text-base">
            How it works
          </span>
        </button>

        <Popover>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-2 rounded-3xl border border-[#E8ECF4] px-3 py-1.5 md:px-4 md:py-2">
              <span className="text-sm font-normal capitalize text-black md:text-base">
                My Loan Limit
              </span>
              <svg
                className="h-5 w-5 md:h-6 md:w-6"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.9201 8.95L13.4001 15.47C12.6301 16.24 11.3701 16.24 10.6001 15.47L4.08008 8.95"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="w-[210px] rounded-2xl bg-white p-4 shadow-[0_4px_24px_0_rgba(37,37,37,0.08)]"
          >
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  onLoanCalculatorOpen()
                  setSelectedPaymentType('basic')
                }}
                className={`flex items-center justify-between gap-2 rounded-lg px-3 py-3 ${
                  selectedPaymentType === 'basic'
                    ? 'bg-[rgba(244,113,32,0.12)]'
                    : ''
                }`}
              >
                <span
                  className={`flex-1 text-left text-sm font-medium leading-[140%] ${
                    selectedPaymentType === 'basic'
                      ? 'text-[#F47120]'
                      : 'text-[#252525]'
                  }`}
                >
                  Basic Pay
                </span>
                {selectedPaymentType === 'basic' && <CheckIcon />}
              </button>
              <button
                onClick={() => {
                  onLoanCalculatorOpen()
                  setSelectedPaymentType('net')
                }}
                className={`flex items-center justify-between gap-2 rounded-lg px-3 py-3 ${
                  selectedPaymentType === 'net'
                    ? 'bg-[rgba(244,113,32,0.12)]'
                    : ''
                }`}
              >
                <span
                  className={`flex-1 text-left text-sm font-medium leading-[140%] ${
                    selectedPaymentType === 'net'
                      ? 'text-[#F47120]'
                      : 'text-[#252525]'
                  }`}
                >
                  Net Pay
                </span>
                {selectedPaymentType === 'net' && <CheckIcon />}
              </button>
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-2 rounded-3xl border border-[#E8ECF4] px-3 py-1.5 md:px-4 md:py-2">
              <span className="text-sm font-normal capitalize text-black md:text-base">
                Sort By
              </span>
              <svg
                className="h-5 w-5 md:h-6 md:w-6"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.9201 8.95L13.4001 15.47C12.6301 16.24 11.3701 16.24 10.6001 15.47L4.08008 8.95"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="w-[210px] rounded-2xl bg-white p-4 shadow-[0_4px_24px_0_rgba(37,37,37,0.08)]"
          >
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setSelectedSort('price-low-high')}
                className={`flex items-center justify-between gap-2 rounded-lg px-3 py-3 ${
                  selectedSort === 'price-low-high'
                    ? 'bg-[rgba(244,113,32,0.12)]'
                    : ''
                }`}
              >
                <span
                  className={`flex-1 text-left text-sm font-normal leading-[140%] ${
                    selectedSort === 'price-low-high'
                      ? 'text-[#F47120]'
                      : 'text-[#252525]'
                  }`}
                >
                  Price: Low to High
                </span>
                {selectedSort === 'price-low-high' && <CheckIcon />}
              </button>
              <button
                onClick={() => setSelectedSort('price-high-low')}
                className={`flex items-center justify-between gap-2 rounded-lg px-3 py-3 ${
                  selectedSort === 'price-high-low'
                    ? 'bg-[rgba(244,113,32,0.12)]'
                    : ''
                }`}
              >
                <span
                  className={`flex-1 text-left text-sm font-normal leading-[140%] ${
                    selectedSort === 'price-high-low'
                      ? 'text-[#F47120]'
                      : 'text-[#252525]'
                  }`}
                >
                  Price: High to Low
                </span>
                {selectedSort === 'price-high-low' && <CheckIcon />}
              </button>
              <button
                onClick={() => setSelectedSort('name-ascending')}
                className={`flex items-center justify-between gap-2 rounded-lg px-3 py-3 ${
                  selectedSort === 'name-ascending'
                    ? 'bg-[rgba(244,113,32,0.12)]'
                    : ''
                }`}
              >
                <span
                  className={`flex-1 text-left text-sm font-normal leading-[140%] ${
                    selectedSort === 'name-ascending'
                      ? 'text-[#F47120]'
                      : 'text-[#252525]'
                  }`}
                >
                  Name Ascending
                </span>
                {selectedSort === 'name-ascending' && <CheckIcon />}
              </button>
              <button
                onClick={() => setSelectedSort('name-descending')}
                className={`flex items-center justify-between gap-2 rounded-lg px-3 py-3 ${
                  selectedSort === 'name-descending'
                    ? 'bg-[rgba(244,113,32,0.12)]'
                    : ''
                }`}
              >
                <span
                  className={`flex-1 text-left text-sm font-normal leading-[140%] ${
                    selectedSort === 'name-descending'
                      ? 'text-[#F47120]'
                      : 'text-[#252525]'
                  }`}
                >
                  Name Descending
                </span>
                {selectedSort === 'name-descending' && <CheckIcon />}
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
