import { create } from 'zustand';

export const useAccountStore = create((set) => ({
  personalInfo: {
    firstName: 'James',
    lastName: 'Taylor',
    email: 'JamesTaylor@gmail.com',
    phone: '+023 456 789',
    role: 'Employer',
    location: 'London, United Kingdom',
  },
  addresses: [
    {
      type: 'office',
      street: 'Okoa Sasa Headquarters Jubilee House, 4th Floor Waiyaki Way, West Lands, Nairobi, Kenya',
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
  updateAddress: (type, address) =>
    set((state) => ({
      addresses: state.addresses.map((addr) =>
        addr.type === type ? { ...addr, ...address } : addr
      ),
    })),
  toggleNotification: (key) =>
    set((state) => ({
      notifications: {
        ...state.notifications,
        [key]: !state.notifications[key],
      },
    })),
}));
