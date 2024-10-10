"use client"
import { PatientFormDefaultValues } from '@/constants';
import { registerPatient } from '@/lib/actions/patient.actions';
import { patientFormValidation,RegisterPatientValues } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react'
import { useForm } from 'react-hook-form';

export default function useRegisterForm(userId:string) {
  const router = useRouter()
  const [isLoading,setIsLoading] = useState(false)
  const form = useForm<RegisterPatientValues>({
    resolver: zodResolver(patientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues
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
        userId,
        name: values.name,
        email: values.email,
        phone: values.phone,
        birthDate: new Date(values.birthDate),
        gender: values.gender,
        address: values.address,
        occupation: values.occupation,
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
      console.log(newPatient)

      if (newPatient) {
        router.push(`/patients/${userId}/new-appointment`);
      }
    } catch (error) {
      console.log('Error register patient',error);
    } finally {
      setIsLoading(false);
    }

  };
  return { isLoading, form, onSubmit }
}
