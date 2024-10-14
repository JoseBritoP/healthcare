import RegisterForm from "@/components/Forms/RegisterForm/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import * as Sentry  from '@sentry/nextjs'
export default async function RegisterPage({
  params,
}: {
  params: { userId: string };
}) {

  const user = await getUser(params.userId);
  Sentry.metrics.set('user_view_register',user.name)
  if (!user) redirect("/");
  return (
    <div className="flex h-screen max-h-screen">
      {/* TODO: OTP Verification */}
      <section className="container">
        <div className="sub-cintainer max-w-[860px] flex-1 flex-col py-10">
          <Image
            src={"/assets/icons/logo-full.svg"}
            height={1000}
            width={1000}
            className="mb-12 h-10 w-fit"
            alt="CarePulse Logo"
          />

          <RegisterForm user={user} />

          <p className="copyright py-12">
            © 2024 CarePulse
          </p>
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
