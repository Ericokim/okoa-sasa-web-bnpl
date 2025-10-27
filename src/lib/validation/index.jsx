import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { isValidPhoneNumber } from 'libphonenumber-js/min';

const nameRegex = /^[a-zA-Z '.-]*$/;
const numberRegex = /^[0-9]*$/;

const phoneValidation = (value) => {
  if (!value) return false;
  return isValidPhoneNumber(value, 'KE');
};
// Export only the ready-to-use resolver
export const LoginSchema = zodResolver(
  z.object({
    email: z
      .string()
      .min(1, { message: 'Email is required' })
      .email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(4, { message: 'Password must be at least 4 characters.' })
      .max(40, { message: 'Password must not exceed 40 characters' })
      .nonempty({ message: 'Password Required!' }),
  }),
);

export const RegisterSchema = zodResolver(
  z.object({
    fullName: z
      .string()
      .min(1, { message: 'Full name is required' })
      .regex(nameRegex, { message: 'Enter a valid name' }),
    phone: z
      .string()
      .min(1, { message: 'Phone number is required' })
      .refine(phoneValidation, { message: 'Phone number is not valid' }),
    email: z
      .string()
      .min(1, { message: 'Email is required' })
      .email({ message: 'Invalid email address' }),
  }),
);

export const AddAgentSchema = zodResolver(
  z.object({
    name: z
      .string()
      .min(1, { message: 'Full name is required' })
      .regex(nameRegex, { message: 'Enter a valid name' }),
    phone: z
      .string()
      .min(1, { message: 'Phone number is required' })
      .refine(phoneValidation, { message: 'Phone number is not valid' }),
    location: z.string().min(1, { message: 'Location is required' }),
    nationalID: z
      .string()
      .regex(numberRegex, { message: 'National ID must contain only numbers' })
      .min(6, { message: 'National ID must be at least 6 digits' })
      .max(9, { message: 'National ID must not exceed 9 digits' })
      .optional(),
  }),
);

export const ManualPaymentSchema = zodResolver(
  z.object({
    amount: z
      .string()
      .min(1, { message: 'Amount is required' })
      .refine(
        (val) => {
          const num = parseFloat(val);
          return !isNaN(num) && num > 0;
        },
        { message: 'Amount must be a valid number greater than 0' },
      )
      .refine(
        (val) => {
          const num = parseFloat(val);
          return num <= 10000000;
        },
        { message: 'Amount cannot exceed 10,000,000' },
      )
      .transform((val) => parseFloat(val)),
    transactionId: z
      .string()
      .min(1, { message: 'Transaction ID is required' })
      .min(3, { message: 'Transaction ID must be at least 3 characters' })
      .max(50, { message: 'Transaction ID must not exceed 50 characters' })
      .regex(/^[A-Za-z0-9]+$/, {
        message: 'Transaction ID can only contain letters and numbers',
      }),
    transactionTime: z
      .union([z.string(), z.date()])
      .refine(
        (val) => {
          const date = val instanceof Date ? val : new Date(val);
          return !isNaN(date.getTime());
        },
        { message: 'Please select a valid date' },
      )
      .refine(
        (val) => {
          const date = val instanceof Date ? val : new Date(val);
          const now = new Date();
          return date <= now;
        },
        { message: 'Transaction date cannot be in the future' },
      )
      .transform((val) => (val instanceof Date ? val : new Date(val))),

    narratives: z
      .array(
        z.object({
          // Accept both string and array of strings
          narrative: z
            .union([z.string(), z.array(z.string())])
            .refine(
              (val) => {
                // If it's a string, check it's not empty
                if (typeof val === 'string') {
                  return val.trim().length > 0;
                }
                // If it's an array, check it has at least one non-empty string
                if (Array.isArray(val)) {
                  return (
                    val.length > 0 &&
                    val.every((item) => typeof item === 'string' && item.trim().length > 0)
                  );
                }
                return false;
              },
              { message: 'Invoice number(s) cannot be empty' },
            )
            .transform((val) => {
              // Normalize to array format
              if (typeof val === 'string') {
                return [val.trim()];
              }
              return val.map((item) => item.trim());
            }),
        }),
      )
      .refine(
        (narratives) => {
          // Extract all narrative arrays and flatten them
          const all = narratives.flatMap((n) => n.narrative);
          const unique = new Set(all);
          return unique.size === all.length;
        },
        { message: 'Duplicate invoice numbers are not allowed' },
      )
      .transform((narratives) => {
        // Extract all narrative arrays, flatten them, and remove duplicates
        const all = narratives.flatMap((n) => n.narrative);
        const unique = [...new Set(all)];
        return unique.join(',');
      }),
  }),
);

export const UpdatePaymentSchema = zodResolver(
  z.object({
    phone: z
      .string()
      .optional()
      .refine(phoneValidation, { message: 'Phone number is not valid' }),

    narratives: z
       .array(
        z.object({
          // Accept both string and array of strings
          narrative: z
            .union([z.string(), z.array(z.string())])
            .refine(
              (val) => {
                // If it's a string, check it's not empty
                if (typeof val === 'string') {
                  return val.trim().length > 0;
                }
                // If it's an array, check it has at least one non-empty string
                if (Array.isArray(val)) {
                  return (
                    val.length > 0 &&
                    val.every((item) => item.trim().length > 0)
                  );
                }
                return false;
              },
              { message: 'Invoice number(s) cannot be empty' },
            )
            .transform((val) => {
              // Normalize to array format
              if (typeof val === 'string') {
                return [val.trim()];
              }
              return val.map((item) => item.trim());
            }),
        }),
      )
      .refine(
        (narratives) => {
          const allNarratives = narratives
            ?.flatMap((item) => item.narrative || [])
            .filter(Boolean);
          return allNarratives && allNarratives.length > 0;
        },
        { message: 'At least one payment narrative is required' },
      ),
  }),
);
