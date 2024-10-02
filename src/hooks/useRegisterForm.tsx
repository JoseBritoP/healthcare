"use client"
import { registerPatient } from '@/lib/actions/patient.actions';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { authPatientForm, AuthPatientValues, RegisterPatientValues } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react'
import { useForm } from 'react-hook-form';

export default function useRegisterForm(userId:string) {
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

  const onSubmit = async (values:RegisterPatientValues) => {
    setIsLoading(true);

    // Store file info in form data as
    let formData;
    if (
      values.identificationDocument &&
      values.identificationDocument?.length > 0
    ) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });

      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.identificationDocument[0].name);
    }

    try {
      const patient = {
        userId: userId,
        name: values.name,
        email: values.email,
        phone: values.phone,
        date: new Date(values.date),
        gender: values.gender,
        address: values.address,
        occupation: values.occupation,
        emergencyContactName: values.emergencyContactName,
        emergencyContactNumber: values.emergencyContactNumber,
        primaryPhysician: values.primaryPhysician,
        insuranceProvider: values.insuranceProvider,
        insurancePolicyNumber: values.insurancePolicyNumber,
        allergies: values.allergies,
        currentMedication: values.currentMedication,
        familyMedicalHistory: values.familyMedicalHistory,
        pastMedicalHistory: values.pastMedicalHistory,
        identificationType: values.identificationType,
        identificationNumber: values.identificationNumber,
        identificationDocument: values.identificationDocument
          ? formData
          : undefined,
        privacyConsent: values.privacyConsent,
      };

      const newPatient = await registerPatient(patient);

      if (newPatient) {
        router.push(`/patients/${userId}/new-appointment`);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return { isLoading, form, onSubmit }
}
