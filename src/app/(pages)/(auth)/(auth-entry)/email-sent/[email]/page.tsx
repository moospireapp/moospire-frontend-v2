import type { Metadata } from "next";
import { EmailSentFormGroup } from "@/app/_components";

export const metadata: Metadata = {
  title: "Email Sent",
};

const EmailSent = () => {
  return <EmailSentFormGroup />;
};

export default EmailSent;
