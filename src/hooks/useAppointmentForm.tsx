/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { z } from "zod";
import { useState } from "react";
import { getAppointmentSchema } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  createAppointment,
  updateAppointment,
} from "@/lib/actions/appointment.actionts";
import { AppointmentFormProps } from "@/components/Forms/Appointment/AppointmentForm";
import { toast } from "react-toastify";

export default function useAppointmentForm({userId,patientId,type,appointment,open,setOpen}: AppointmentFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const AppointmentFormValidation = getAppointmentSchema(type);

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: appointment ? appointment?.primaryPhysician : "",
      schedule: appointment
        ? new Date(appointment.schedule!)
        : new Date(Date.now()),
      reason: appointment ? appointment.reason : "",
      note: appointment?.note || "",
      cancellationReason: appointment?.cancellationReason || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof AppointmentFormValidation>) => {
    setIsLoading(true);

    let status;
    switch (type) {
      case "schedule":
        status = "scheduled";
        break;
      case "cancel":
        status = "cancelled";
        break;
      default:
        status = "pending";
    }

    try {
      if (type === "create") {
        const appointment = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason!,
          status: status as Status,
          note: values.note,
        };

        const newAppointment = await createAppointment(appointment);

        if (!newAppointment) throw new Error("Error creating appointment");

        form.reset();
        router.push(
          `/patients/${userId}/new-appointment/success?appointmentId=${newAppointment.$id}`
        );
        toast.success("Your appointment was successfully created!");
      } else {
        if (appointment === undefined) throw new Error(`Appointment Id is undefined`);

        const appointmentToUpdate = {
          userId,
          appointmentId: appointment.$id,
          appointment: {
            primaryPhysician: values.primaryPhysician,
            schedule: new Date(values.schedule),
            status: status as Status,
            cancellationReason: values.cancellationReason,
          },
          type,
        };
        const updatedAppointment = await updateAppointment(appointmentToUpdate);

        if (!updatedAppointment) throw new Error("Error updating appointment");

        if (open) {
          if(setOpen) setOpen(false)};
        form.reset();
        if(status === 'cancel'){
          toast.success("The appointment was cancelled");
        }
        if(status === 'schedule'){
          toast.success("The appointment was successfully schedule!");
        }
      }
    } catch (error) {
      console.log("An error ocurred creating appointment", error);
      toast.error("Try again later");
    }
    setIsLoading(false);
  };

  let buttonLabel;
  switch (type) {
    case "cancel":
      buttonLabel = "Cancel Appointment";
      break;
    case "schedule":
      buttonLabel = "Schedule Appointment";
      break;
    default:
      buttonLabel = "Submit Apppointment";
  }

  return { isLoading, buttonLabel, onSubmit, form };
}