import type { Metadata } from "next";
import React, { Suspense } from "react";
import { VerifyEmailFormGroup } from "@/app/_components";

export const metadata: Metadata = {
  title: "Verify your email",
};

const VerifyEmail = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailFormGroup />
    </Suspense>
  );
};

export default VerifyEmail;
