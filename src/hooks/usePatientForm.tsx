"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { authPatientForm, AuthPatientValues } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react'
import { useForm } from 'react-hook-form';

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

  const onSubmit = (values:AuthPatientValues) => {
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
 
  return { isLoading, form, onSubmit }
}
