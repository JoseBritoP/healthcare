import { z } from 'zod'

const name = z.string().min(2,{ message:'Name must be at least 2 characters.'}).max(50,"Name muest be at most 50 characters.");
const email = z.string().email("Invalid email address");
const phone = z.string().refine((phone)=>/^\+?[1-9]\d{1,14}$/.test(phone),"Invalid phone number");
const birthDate = z.coerce.date();
const address =z.string().min(5, "Address must be at least 5 characters").max(500, "Address must be at most 500 characters")
const gender =  z.enum(["male", "female", "other"]);
const occupation = z.string().min(2, "Occupation must be at least 2 characters").max(500, "Occupation must be at most 500 characters")
export const authPatientForm = z.object({
  name,
  email,
  phone
});

export type AuthPatientValues = z.infer< typeof authPatientForm>

export const patientFormValidation = z.object({
  name,
  email,
  phone,
  birthDate,
  gender,
  address,
  occupation,
  emergencyContactName: z
    .string()
    .min(2, "Contact name must be at least 2 characters")
    .max(50, "Contact name must be at most 50 characters"),
  emergencyContactNumber: z
    .string()
    .refine(
      (emergencyContactNumber) => /^\+\d{10,15}$/.test(emergencyContactNumber),
      "Invalid phone number"
    ),
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  insuranceProvider: z
    .string()
    .min(2, "Insurance name must be at least 2 characters")
    .max(50, "Insurance name must be at most 50 characters"),
  insurancePolicyNumber: z
    .string()
    .min(2, "Policy number must be at least 2 characters")
    .max(50, "Policy number must be at most 50 characters"),
  allergies: z.string().optional(),
  currentMedication: z.string().optional(),
  familyMedicalHistory: z.string().optional(),
  pastMedicalHistory: z.string().optional(),
  identificationType: z.string().optional(),
  identificationNumber: z.string().optional(),
  identificationDocument: z.custom<File[]>().optional(),
  treatmentConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must consent to treatment in order to proceed",
    }),
  disclosureConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must consent to disclosure in order to proceed",
    }),
  privacyConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must consent to privacy in order to proceed",
    }),
});

export type RegisterPatientValues = z.infer<typeof patientFormValidation >