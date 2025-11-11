import { create } from 'zustand'

const EMPTY_PERSONAL_INFO = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  role: '',
  ID: '',
  location: '',
  company: '',
  employeeId: '',
  avatar: null,
}

const preferString = (...candidates) => {
  for (const value of candidates) {
    if (typeof value === 'string' && value.trim().length > 0) {
      return value.trim()
    }
  }
  return ''
}

const buildPersonalInfoFromUser = (user) => {
  if (!user || typeof user !== 'object') {
    return { ...EMPTY_PERSONAL_INFO }
  }

  const firstNameCandidate = preferString(
    user.firstName,
    user.first_name,
    user.givenName,
    user.given_name,
  )
  const lastNameCandidate = preferString(
    user.lastName,
    user.last_name,
    user.familyName,
    user.family_name,
    user.surname,
  )
  const fullName = preferString(user.fullName, user.full_name, user.name)
  const nameParts = fullName ? fullName.split(/\s+/).filter(Boolean) : []
  const resolvedFirstName = firstNameCandidate || nameParts[0] || ''
  const resolvedLastName =
    lastNameCandidate || nameParts.slice(1).join(' ').trim() || ''

  const email = preferString(
    user.email,
    user.emailAddress,
    user.email_address,
    user.contactEmail,
  )

  const avatar = preferString(
    user.profilePhoto?.url,
    user.profilePhoto?.secure_url,
    typeof user.profilePhoto === 'string' ? user.profilePhoto : '',
    user.avatar,
    user.photoURL,
    user.photoUrl,
  )

  return {
    ...EMPTY_PERSONAL_INFO,
    firstName: resolvedFirstName,
    lastName: resolvedLastName,
    email: email || '',
    phone:
      preferString(
        user.phoneNumber,
        user.phone_number,
        user.msisdn,
        user.phone,
      ) || '',
    role:
      preferString(
        user.role,
        user.roleName,
        Array.isArray(user.roles) ? user.roles[0]?.name : '',
      ) || '',
    ID:
      preferString(
        user.idNumber,
        user.id_number,
        user.nationalId,
        user.national_id,
      ) || '',
    location:
      preferString(
        user.location,
        user.city,
        user.address,
        user?.addresses?.[0]?.city,
        user?.addresses?.[0]?.location,
      ) || '',
    company:
      preferString(user.company, user.employer, user.organization) || '',
    employeeId:
      preferString(
        user.employeeId,
        user.employee_id,
        user.employeeNumber,
        user.employee_number,
      ) || '',
    avatar: avatar || null,
  }
}

export const useAccountStore = create((set) => ({
  personalInfo: { ...EMPTY_PERSONAL_INFO },
  addresses: [
    {
      type: 'office',
      street:
        'Okoa Sasa Headquarters Jubilee House, 4th Floor Waiyaki Way, West Lands, Nairobi, Kenya',
      city: 'Nairobi',
      state: 'Nairobi',
      zip: '00100',
      country: 'Kenya',
    },
    {
      type: 'home',
      street: 'House No. 23, Milimani Estate Kisumu, Kenya',
      city: 'Kisumu',
      state: 'Kisumu',
      zip: '40100',
      country: 'Kenya',
    },
  ],
  notifications: {
    transactions: true,
    promotions: false,
    systemUpdates: true,
  },

  updatePersonalInfo: (info) =>
    set((state) => ({
      personalInfo: { ...state.personalInfo, ...info },
    })),

  updateAvatar: (url) =>
    set((state) => ({
      personalInfo: {
        ...state.personalInfo,
        avatar: url,
      },
    })),

  updateAddress: (type, address) =>
    set((state) => ({
      addresses: state.addresses.map((addr) =>
        addr.type === type ? { ...addr, ...address } : addr,
      ),
    })),

  toggleNotification: (key) =>
    set((state) => ({
      notifications: {
        ...state.notifications,
        [key]: !state.notifications[key],
      },
    })),

  syncFromUser: (user) =>
    set(() => ({
      personalInfo: buildPersonalInfoFromUser(user),
    })),
}))
