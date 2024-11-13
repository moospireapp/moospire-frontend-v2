import type { Metadata } from "next";
import { CreateAccountFormGroup } from "@/app/_components";

export const metadata: Metadata = {
  title: "Create an account",
};

const CreateAccount = () => {
  return <CreateAccountFormGroup />;
};

export default CreateAccount;
