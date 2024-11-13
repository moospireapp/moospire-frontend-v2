import type { Metadata } from "next";
import { ResetPasswordFormGroup } from "@/app/_components";

export const metadata: Metadata = {
  title: "Reset your password",
};

const ResetPassword = () => {
  return <ResetPasswordFormGroup />;
};

export default ResetPassword;
