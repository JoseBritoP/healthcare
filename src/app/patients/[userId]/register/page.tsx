import RegisterForm from "@/components/shared/Forms/RegisterForm/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function RegisterPage({params}:{params:{userId:string}}) {

  const user = await getUser(params.userId)
  if(!user) redirect('/');
  return (
    <div className="flex h-screen max-h-screen">
      {/* TODO: OTP Verification */}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-cintainer max-w-[496px]">
          <Image
            src={"/assets/icons/logo-full.svg"}
            height={1000}
            width={1000}
            className="mb-12 h-10 w-fit"
            alt="CarePulse Logo"
          />

          <RegisterForm user={user}/>

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
        src={"/assets/images/register-img.png"}
        alt="Register"
        height={1000}
        width={1000}
        className="side-img max-w-[390px]"
      />
    </div>
  );
}
