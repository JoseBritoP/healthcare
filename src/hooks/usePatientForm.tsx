"use client"
import { createUser } from '@/lib/actions/patient.actions';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { authPatientForm, AuthPatientValues } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function usePatientForm() {
  const router = useRouter()
  const [isLoading,setIsLoading] = useState(false)
  const form = useForm<AuthPatientValues>({
    resolver: zodResolver(authPatientForm),
    defaultValues: {
      name: "",
      email:"",
      phone:""
    },
  });

  const onSubmit = async (values:AuthPatientValues) => {
    const data = {
      name:values.name,
      email:values.email,
      phone:values.phone
    }
    setIsLoading(true)
    try {
      const user = await createUser(data)
      if(!user) throw new Error('Error creating user');
      router.push(`/patients/${user.$id}/register`);
      toast.success('User create successfully, now complete this form')
    } catch (error:any) {
      console.log('Error',error)
      toast.error('Error creating user');
    } finally {
      setIsLoading(false)
    }
  };
 
  return { isLoading, form, onSubmit }
}
