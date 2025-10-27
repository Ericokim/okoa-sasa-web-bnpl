/* eslint-disable prefer-const */
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { EncryptStorage } from 'encrypt-storage'
import { parsePhoneNumber } from 'libphonenumber-js/min'

let encryptStorage = new EncryptStorage(`SJKXSAJJ898NMSNxs89SJs9snOXNS8}`, {
  prefix: '@',
  encAlgorithm: 'Rabbit', //'AES' | 'Rabbit' | 'RC4' | 'RC4Drop';
  doNotEncryptValues: false,
})
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const setStorageData = (key, value) => {
  return encryptStorage.setItem(key, JSON.stringify(value))
}

export const getStorageData = (key) => {
  const value = encryptStorage.getItem(key)
  return value
}

export const clearStorageData = () => {
  // Preserve theme and other UI settings during logout
  const preserveKeys = ['vite-ui-theme']
  const preserved = {}

  // Save items to preserve
  preserveKeys.forEach((key) => {
    const value = localStorage.getItem(key)
    if (value) {
      preserved[key] = value
    }
  })

  // Clear only specific auth-related keys instead of clearing everything
  const authKeys = ['userInfo', 'token', 'name']
  authKeys.forEach((key) => {
    encryptStorage.removeItem(key)
  })

  // Clear encrypted storage
  encryptStorage.clear()

  // Ensure theme is still there (redundant safety check)
  Object.entries(preserved).forEach(([key, value]) => {
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, value)
    }
  })
}

export const clearSelectedRows = (tableInstance) => {
  if (!tableInstance) return
  tableInstance.toggleAllRowsSelected(false)
}

export const clearSelectedColumns = (tableInstance) => {
  if (!tableInstance) return
  tableInstance.toggleAllColumnsSelected(false)
}

export const downloadData = (item, fileName = 'receipt') => {
  if (!item) return
  const anchor = document.createElement('a')
  anchor.href = item
  anchor.setAttribute('download', `${fileName}`)
  anchor.click()
}

export const comma = (num) => {
  if (!num) return num
  const number = Number(num).toLocaleString().split('.')
  number[0] = number[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return number.join('.')
}

export const getInitials = (name) => {
  if (!name) return '' // Handle null/undefined

  let initials
  const nameSplit = name.trim().split(/\s+/) // Trim and split on any whitespace
  const nameLength = nameSplit.length

  if (nameLength > 1) {
    initials =
      nameSplit[0].substring(0, 1).toUpperCase() +
      '.' +
      nameSplit[nameLength - 1].substring(0, 1).toUpperCase()
  } else if (nameLength === 1) {
    initials = nameSplit[0].substring(0, 1).toUpperCase()
  } else {
    return ''
  }

  return initials
}

export const formatEmail = (email) => {
  if (!email) return 'N/A'
  if (email.length > 20) {
    return email.substring(0, 15) + '...'
  }
  return email
}

export const formatNoteContent = (content) => {
  if (!content) return ''

  // Simple markdown parsing for display
  let formatted = content
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<strong>$1</strong>')
    .replace(/_([^_]+)_/g, '<em>$1</em>')
    .replace(/~([^~]+)~/g, '<del>$1</del>')
    .replace(/@(\w+)/g, '<span style="color: #3b82f6;">@$1</span>')

  return formatted
}

// Function to disable any accidental use of console logs
export const GlobalDebug = (function () {
  var savedConsole = console
  /**
   * @param {boolean} debugOn
   * @param {boolean} suppressAll
   */
  return function (debugOn, suppressAll) {
    var suppress = suppressAll || false
    if (debugOn === false) {
      // supress the default console functionality
      console = {}
      console.log = function () {}
      // supress all type of consoles
      if (suppress) {
        console.info = function () {}
        console.warn = function () {}
        console.error = function () {}
      } else {
        console.info = savedConsole.info
        console.warn = savedConsole.warn
        console.error = savedConsole.error
      }
    } else {
      console = savedConsole
    }
  }
})()

export const formatPhoneNumber = (msisdn) => {
  if (!msisdn) return
  const {
    countryCallingCode: countryCallingCode,
    country: country,
    number: phone,
  } = parsePhoneNumber(msisdn)
  let phoneNumber = phone.replace('+', '')
  return { phoneNumber, country, countryCallingCode }
}

// Format currency helper with KES guarantee
export const formatCurrency = (amount) => {
  const formatted = new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    currencyDisplay: 'code', // Prefer KES
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount || 0)

  // Extra safety: ensure no "Ksh" sneaks in
  return formatted.replace(/Ksh|KSh/gi, 'KES')
}

// Unified Safe & Flexible Date Formatter
const formatDateCore = (
  dateString,
  { withTime = false, useKenyaTZ = false, locale = 'en-US' } = {},
) => {
  if (!dateString) return 'N/A'

  try {
    const date = new Date(dateString)

    if (isNaN(date.getTime())) {
      return 'Invalid Date'
    }

    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      ...(withTime && { hour: '2-digit', minute: '2-digit' }),
      ...(useKenyaTZ && { timeZone: 'Africa/Nairobi' }),
    }

    return date.toLocaleString(locale, options)
  } catch {
    return 'Invalid Date'
  }
}

// Public API — keeps your old function names intact
export const formatDate = (dateString, opts = {}) =>
  formatDateCore(dateString, { ...opts, withTime: false })

export const formatDateTime = (dateString, opts = {}) =>
  formatDateCore(dateString, { ...opts, withTime: true })

// utils/deriveAmounts.js
export const deriveAmounts = (invoice) => {
  const toNum = (v) => Number(v ?? 0) || 0

  const discount = toNum(invoice?.discount)
  const amountDue = toNum(invoice?.amountDue)
  const amountPaid = toNum(invoice?.amountPaid)
  const balance = toNum(invoice?.balance)
  const amountFld = invoice?.amount != null ? toNum(invoice?.amount) : null

  const businessTotal = Array.isArray(invoice?.business)
    ? invoice.business.reduce((sum, b) => sum + toNum(b?.amount), 0)
    : 0

  // Preferred sources for original (pre-discount) amount, in order of trust:
  // 1) Sum of business line items (single or consolidated)
  // 2) amountDue + discount
  // 3) "amount" field if provided
  const originalFromBusiness = businessTotal > 0 ? businessTotal : null
  const originalFromDueDisc =
    amountDue || discount ? amountDue + discount : null

  const originalAmount =
    originalFromBusiness ?? originalFromDueDisc ?? amountFld ?? 0

  // Expectations & checks
  const expectedAmountDue = Math.max(originalAmount - discount, 0)
  const computedBalance = Math.max(amountDue - amountPaid, 0)

  const TOL = 1 // shilling rounding tolerance
  const dueMismatch =
    amountDue > 0 && Math.abs(expectedAmountDue - amountDue) > TOL
  const balanceMismatch =
    balance > 0 && Math.abs(computedBalance - balance) > TOL

  const effectiveDiscountPercent =
    originalAmount > 0
      ? Number(((discount / originalAmount) * 100).toFixed(2))
      : 0

  const percentMismatch =
    invoice?.discountPercent != null
      ? Math.abs(effectiveDiscountPercent - toNum(invoice?.discountPercent)) >
        0.5
      : false

  const isConsolidated =
    Array.isArray(invoice?.business) && invoice.business.length > 1

  return {
    // core numbers
    originalAmount,
    businessTotal,
    expectedAmountDue,
    computedBalance,
    effectiveDiscountPercent,

    // flags
    dueMismatch,
    balanceMismatch,
    percentMismatch,
    isConsolidated,
  }
}

export const maskPhoneNumber = (str) => {
  if (!str) return
  let phone = str?.startsWith(0) ? '254' + str.slice(1, str.length) : str
  const regex = /^(\d{4})\d{5}(\d{3})$/
  const match = phone.match(regex)
  if (match) {
    return match[1] + '*****' + match[2]
  }
  return null
}
