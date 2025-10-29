export async function sendOTP(phoneNumber) {
  try {
    const response = await fetch('/api/auth/send-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phoneNumber }),
    })

    if (!response.ok) {
      throw new Error('Failed to send OTP')
    }

    return await response.json()
  } catch (error) {
    console.error('Error sending OTP:', error)
    throw error
  }
}

export async function verifyOTP(phoneNumber, otp) {
  try {
    const response = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phoneNumber, otp }),
    })

    if (!response.ok) {
      throw new Error('Invalid OTP')
    }

    return await response.json()
  } catch (error) {
    console.error('Error verifying OTP:', error)
    throw error
  }
}

export function isValidPhoneNumber(phoneNumber) {
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/
  return phoneRegex.test(phoneNumber)
}

export function formatPhoneNumber(phoneNumber) {
  const cleaned = phoneNumber.replace(/\D/g, '')
  
  if (cleaned.length <= 3) {
    return cleaned
  } else if (cleaned.length <= 6) {
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`
  } else {
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 10)}`
  }
}

export function maskPhoneNumber(phoneNumber) {
  if (!phoneNumber || phoneNumber.length < 4) {
    return phoneNumber
  }
  
  const cleaned = phoneNumber.replace(/\D/g, '')
  const firstPart = cleaned.slice(0, 4)
  const lastPart = cleaned.slice(-0)
  
  return `${firstPart}****${lastPart}`
}
