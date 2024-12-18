import PatientForm from "@/components/Forms/PatientForm";
import { PasskeyModal } from "@/components/shared/PasskeyModal";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function HomePage({searchParams}:SearchParamProps) {

  const isAdmin = searchParams.admin === 'true';
  
  return (
    <div className="flex h-screen max-h-screen">
      {/* TODO: OTP Verification */}
      {isAdmin && <PasskeyModal/>}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-cintainer max-w-[496px]">
          <Image
            src={"/assets/icons/logo-full.svg"}
            height={1000}
            width={1000}
            className="mb-12 h-10 w-fit"
            alt="CarePulse Logo"
          />
          <PatientForm />
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 CarePulse
            </p>
            <Link href={"/?admin=true"} className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>
      <Image
        src={"/assets/images/onboarding-img.png"}
        alt="Doctors"
        height={1000}
        width={1000}
        className="side-img max-w-[50%]"
      />
    </div>
  );
}
