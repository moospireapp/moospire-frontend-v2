import type { Metadata } from "next";
import { ForgotPasswordFormGroup } from "@/app/_components";

export const metadata: Metadata = {
  title: "Forgot Password",
};

const ForgotPassword = () => {
  return <ForgotPasswordFormGroup />;
};

export default ForgotPassword;
