import { z } from 'zod'

const name = z.string().min(2,{ message:'Name must be at least 2 characters.'}).max(50,"Name muest be at most 50 characters.");
const email = z.string().email("Invalid email address");
const phone = z.string().refine((phone)=>/^\+?[1-9]\d{1,14}$/.test(phone),"Invalid phone number");

export const authPatientForm = z.object({
  name,
  email,
  phone
});

export type AuthPatientValues = z.infer< typeof authPatientForm>