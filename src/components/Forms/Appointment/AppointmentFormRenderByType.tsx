import React from "react";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { Doctors } from "@/constants";
import { SelectItem } from "@/components/ui/select";
import Image from "next/image";
import { Control } from "react-hook-form";

interface AppointmentFormRenderByType {
  type: string;
  control: Control
}

export default function AppointmentFormRenderByType({type,control}: AppointmentFormRenderByType) {
  
  return (
    <>
      {type === "create" && (
        <section className="mb-12 space-y-4">
          <h1 className="header">New Appointment</h1>
          <p className="text-dark-700">
            Request a new appointment in 10 seconds.
          </p>
        </section>
      )}

      {type !== "cancel" && (
        <>
          <CustomFormField
            type={FormFieldType.SELECT}
            control={control}
            name="primaryPhysician"
            label="Doctor"
            placeholder="Select a doctor"
          >
            {Doctors.map((doctor, i) => (
              <SelectItem
                key={doctor.name + i}
                value={doctor.name}
                className="hover:bg-gray-700 transition-colors duration-200 ease-in"
              >
                <div className="flex cursor-pointer items-center gap-2">
                  <Image
                    src={doctor.image}
                    width={32}
                    height={32}
                    alt="doctor"
                    className="rounded-full border border-dark-500"
                  />
                  <p>{doctor.name}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>

          <CustomFormField
            type={FormFieldType.DATE_PICKER}
            control={control}
            name="schedule"
            label="Expected appointment date"
            showTimeSelect
            dateFormat="MM/dd/yyyy  -  h:mm aa"
          />

          <div
            className={`flex flex-col gap-6  ${
              type === "create" && "xl:flex-row"
            }`}
          >
            <CustomFormField
              type={FormFieldType.TEXTAREA}
              control={control}
              name="reason"
              label="Appointment reason"
              placeholder="Annual montly check-up"
              disabled={type === "schedule"}
            />

            <CustomFormField
              type={FormFieldType.TEXTAREA}
              control={control}
              name="note"
              label="Comments/notes"
              placeholder="Prefer afternoon appointments, if possible"
              disabled={type === "schedule"}
            />
          </div>
        </>
      )}

      {type === "cancel" && (
        <CustomFormField
          type={FormFieldType.TEXTAREA}
          control={control}
          name="cancellationReason"
          label="Reason for cancellation"
          placeholder="Urgent meeting came up"
        />
      )}
    </>
  );
}
