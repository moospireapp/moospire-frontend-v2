"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IInputType } from "@/app/_types/form-type";
import { AuthContainer, TextInputField } from "@/app/_components";
import { useToast } from "@/app/_context/ToastContext";
import { useBtnClick } from "@/app/_hooks";
import useStore from "@/app/_app-store";

type ILoginInputType = {
  email: string;
  password: string;
};

const LoginFormGroup = () => {
  const router = useRouter();

  const { showToast } = useToast();
  const { loginUser } = useStore();

  const [_, setProcessing] = useState(false);
  const { buttonRef, updateButtonState } = useBtnClick("Log in");

  const [loginPayload, setLoginPayload] = useState<ILoginInputType>({
    email: "",
    password: "",
  });

  const [emailValidity, setEmailValidity] = useState<boolean>(false);

  const updateLoginPayload = (value: string, field: string) => {
    setLoginPayload({ ...loginPayload, [field]: value });
  };

  const updateButtonClicks = (status: boolean) => {
    setProcessing(status);
    updateButtonState(status);
  };

  const isLoginReady = () => {
    return !(
      loginPayload.email &&
      loginPayload.password.length > 6 &&
      emailValidity
    );
  };

  const handleUserLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateButtonClicks(true);

    try {
      const response = await loginUser(loginPayload);
      updateButtonClicks(false);

      if (response.code === 200) {
        showToast(response.message, "success");

        // CHECK USER PAYLOAD AND APPLY REDIRECTS
        const { isOnboarded, isVerified, email } = response.data.user;

        setTimeout(() => {
          // REDIRECT TO DASHBOARD
          if (isVerified && isOnboarded) {
            router.push("/dashboard");
          }
          // REDIRECT TO STEP ONE ONBOARDING PAGE
          else if (isVerified && !isOnboarded) {
            router.push("/welcome");
          }
          // REDIRECT TO EMAIL VERIFICATION PAGE
          else if (!isVerified && !isOnboarded) {
            router.push(`/verify-email?email=${encodeURIComponent(email)}`);
          }
        }, 1000);
      } else {
        showToast(response.error, "error");
      }
    } catch {
      updateButtonClicks(false);
    }
  };

  return (
    <AuthContainer
      primaryText="Welcome Back!"
      secondaryText="Sign in to continue creating and sharing inspiring moodboards."
      showSocialAuth={true}
    >
      {/* FORM BLOCK */}
      <form className="form-block" onSubmit={handleUserLogin}>
        {/* EMAIL INPUT */}
        <TextInputField
          labelId="email"
          labelTitle="Email address"
          inputType={IInputType.Email}
          inputPlaceholder="Enter your email address"
          isRequired={true}
          onInputValidated={(validity) => setEmailValidity(validity)}
          onInputChange={(value) => updateLoginPayload(value, "email")}
          errorHandler={{ validator: "validateEmail" }}
        />

        {/* PASSWORD INPUT */}
        <TextInputField
          labelId="password"
          labelTitle="Password"
          inputType={IInputType.Password}
          inputPlaceholder="Enter your password"
          hasBottomPadding={false}
          isRequired={true}
          onInputChange={(value) => updateLoginPayload(value, "password")}
          errorHandler={{
            validator: "validateRequired",
            message: "Password is a required field",
          }}
        />

        <div className="helper-row mt-[13px] mb-6">
          <div className="text">
            Forgot your password?
            <Link href="/forgot-password">Reset it</Link>
          </div>
        </div>

        {/* ACTION BUTTON */}
        <button
          ref={buttonRef}
          className="btn btn-md btn-primary w-full"
          disabled={isLoginReady()}
        >
          Log in
        </button>

        <div className="helper-row justify-center mt-4">
          <div className="text">
            {` Don't have an account yet?`}
            <Link href="/create-account">Create account</Link>
          </div>
        </div>
      </form>
    </AuthContainer>
  );
};

export default LoginFormGroup;
