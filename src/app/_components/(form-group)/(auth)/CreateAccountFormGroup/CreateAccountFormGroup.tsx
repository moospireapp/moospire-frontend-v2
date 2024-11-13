"use client";

import React, { useState } from "react";
import Link from "next/link";
import { IInputType } from "@/app/_types/form-type";
import { AuthContainer, TextInputField } from "@/app/_components";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/_context/ToastContext";
import { useBtnClick } from "@/app/_hooks";
import useStore from "@/app/_app-store";

type ISignupInputType = {
  fullname: string;
  email: string;
  password: string;
};

const CreateAccountFormGroup = () => {
  const { showToast } = useToast();
  const { signupUser } = useStore();

  const router = useRouter();

  const [_, setProcessing] = useState(false);
  const { buttonRef, updateButtonState } = useBtnClick("Sign up");

  const [signupPayload, setSignupPayload] = useState<ISignupInputType>({
    fullname: "",
    email: "",
    password: "",
  });

  const [fullNameValidity, setFullNameValidity] = useState<boolean>(false);
  const [emailValidity, setEmailValidity] = useState<boolean>(false);
  const [passwordValidity, setPasswordValidity] = useState<boolean>(false);

  const updateSignupPayload = (value: string, field: string) => {
    setSignupPayload({ ...signupPayload, [field]: value });
  };

  const updateButtonClicks = (status: boolean) => {
    setProcessing(status);
    updateButtonState(status);
  };

  const isSignupReady = () => {
    return !(
      signupPayload.fullname &&
      signupPayload.email &&
      signupPayload.password.length > 6 &&
      fullNameValidity &&
      emailValidity &&
      passwordValidity
    );
  };

  const handleUserSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateButtonClicks(true);

    try {
      const updatedSignupPayload = {
        firstName: signupPayload.fullname.split(" ")[0],
        lastName: signupPayload.fullname.split(" ")[1],
        email: signupPayload.email,
        password: signupPayload.password,
      };

      const response = await signupUser(updatedSignupPayload);
      updateButtonClicks(false);

      if (response.code === 201) {
        showToast(response.message, "success");

        const email = encodeURIComponent(signupPayload.email);
        setTimeout(() => router.push(`/verify-email?email=${email}`), 1000);
      } else {
        showToast(response.error, "error");
      }
    } catch {
      updateButtonClicks(false);
    }
  };

  return (
    <AuthContainer
      primaryText="Join Moospire Today!"
      secondaryText="Start for free, upgrade to get the spark"
      showSocialAuth={true}
    >
      {/* FORM BLOCK */}
      <form className="form-block" onSubmit={handleUserSignup}>
        {/* FULLNAME INPUT */}
        <TextInputField
          labelId="fullname"
          labelTitle="Full name"
          inputType={IInputType.Text}
          inputPlaceholder="Enter your full name"
          isRequired={true}
          onInputValidated={(validity) => setFullNameValidity(validity)}
          onInputChange={(value) => updateSignupPayload(value, "fullname")}
          errorHandler={{ validator: "validateFullName" }}
        />

        {/* EMAIL INPUT */}
        <TextInputField
          labelId="email"
          labelTitle="Email address"
          inputType={IInputType.Email}
          inputPlaceholder="Enter your email address"
          isRequired={true}
          onInputValidated={(validity) => setEmailValidity(validity)}
          onInputChange={(value) => updateSignupPayload(value, "email")}
          errorHandler={{ validator: "validateEmail" }}
        />

        {/* PASSWORD INPUT */}
        <TextInputField
          labelId="password"
          labelTitle="Password"
          inputType={IInputType.Password}
          inputPlaceholder="Enter a password"
          isRequired={true}
          onInputValidated={(validity) => setPasswordValidity(validity)}
          onInputChange={(value) => updateSignupPayload(value, "password")}
          errorHandler={{ validator: "validatePasswordStrength" }}
        />

        {/* ACTION BUTTON */}
        <button
          ref={buttonRef}
          className="btn btn-md btn-primary w-full"
          disabled={isSignupReady()}
        >
          Sign up
        </button>

        <div className="helper-row justify-center mt-4">
          <div className="text">
            Already have an account?
            <Link href="/login">Log in</Link>
          </div>
        </div>
      </form>
    </AuthContainer>
  );
};

export default CreateAccountFormGroup;
