import type { Metadata } from "next";
import { LoginFormGroup } from "@/app/_components";

export const metadata: Metadata = {
  title: "Login to your dashboard",
};

const Login = () => {
  return <LoginFormGroup />;
};

export default Login;
