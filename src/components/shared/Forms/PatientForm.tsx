/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "./CustomFormField";
import SubmitButton from "./SubmitButton";
import { useRouter } from "next/navigation";

export enum FormFieldType {
  INPUT = 'input',
  CHECKBOX = 'checkbox',
  TEXTAREA = 'textarea',
  PHONE_INPUT = 'phoneInput',
  DATE_PICKER = 'datePricker',
  SELECT = "select",
  SKELETON = 'skeleton'
}
const formSchema = z.object({
  name: z.string().min(2,{ message:'Name must be at least 2 characters.'}).max(50,"Name muest be at most 50 characters."),
  email:z.string().email("Invalid email address"),
  phone:z.string().refine((phone)=>/^\+?[1-9]\d{1,14}$/.test(phone),"Invalid phone number")
});
export default function PatientForm() {
  const router = useRouter()
  const [isLoading,setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email:"",
      phone:""
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    setIsLoading(true)
    try {
      // const user = await createUser(values)
      // if(user) router.push(`/patients/${user.$id}/register`)
      
    } catch (error:any) {
      console.log('Error',error)
    } finally {
      setIsLoading(false)
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi there👋</h1>
          <p className="text-dark-700">Schedule your first appointment.</p>
        </section>
        <CustomFormField
          control={form.control}
          type={FormFieldType.INPUT}
          name="name"
          label="Full name"
          placeholder="John Doe"
          iconSrc='/assets/icons/user.svg'
          iconAlt="user_icon"
        />
        <CustomFormField
          control={form.control}
          type={FormFieldType.INPUT}
          name="email"
          label="Email"
          placeholder="johndoe@gmail.com"
          iconSrc='/assets/icons/email.svg'
          iconAlt="email_icon"
        />
         <CustomFormField
          control={form.control}
          type={FormFieldType.PHONE_INPUT}
          name="phone"
          label="Phone number"
          placeholder="(555) 123-4567"
        />
        <SubmitButton isLoading={isLoading}>Get Started!</SubmitButton>
      </form>
    </Form>
  );
}
