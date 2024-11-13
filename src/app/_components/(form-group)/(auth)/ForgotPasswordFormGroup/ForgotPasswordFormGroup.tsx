"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IInputType } from "@/app/_types/form-type";
import { AuthContainer, TextInputField } from "@/app/_components";
import { useToast } from "@/app/_context/ToastContext";
import { useBtnClick } from "@/app/_hooks";
import useStore from "@/app/_app-store";

type IForgotPasswordInputType = {
  email: string;
};

const ForgotPasswordFormGroup = () => {
  const router = useRouter();

  const { showToast } = useToast();
  const { passwordRequest } = useStore();

  const [_, setProcessing] = useState(false);
  const { buttonRef, updateButtonState } = useBtnClick("Send reset link");

  const [forgotPasswordPayload, setForgotPasswordPayload] =
    useState<IForgotPasswordInputType>({
      email: "",
    });

  const [emailValidity, setEmailValidity] = useState<boolean>(false);

  const updateForgotPasswordPayload = (value: string, field: string) => {
    setForgotPasswordPayload({ ...forgotPasswordPayload, [field]: value });
  };

  const updateButtonClicks = (status: boolean) => {
    setProcessing(status);
    updateButtonState(status);
  };

  const isActionReady = () => {
    return !(forgotPasswordPayload.email && emailValidity);
  };

  const handleForgotPassword = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    updateButtonClicks(true);

    try {
      const response = await passwordRequest(forgotPasswordPayload);
      updateButtonClicks(false);

      if (response.code === 200) {
        showToast(response.message, "success");

        setTimeout(() => {
          const email = encodeURIComponent(forgotPasswordPayload.email);
          router.push(`/email-sent/${email}`);
        }, 1000);
      } else {
        showToast(response?.message || response?.error, "error");
      }
    } catch {
      updateButtonClicks(false);
    }
  };

  return (
    <AuthContainer
      primaryText="Forgot Your Password"
      secondaryText="No worries! We’ll help you reset it. Provide your registered email address below."
      showSocialAuth={false}
      placeCenter={true}
    >
      {/* FORM BLOCK */}
      <form className="form-block" onSubmit={handleForgotPassword}>
        {/* EMAIL INPUT */}
        <TextInputField
          labelId="email"
          labelTitle="Email address"
          inputType={IInputType.Email}
          inputPlaceholder="Enter your email address"
          isRequired={true}
          onInputValidated={(validity) => setEmailValidity(validity)}
          onInputChange={(value) => updateForgotPasswordPayload(value, "email")}
          errorHandler={{ validator: "validateEmail" }}
        />

        {/* ACTION BUTTON */}
        <button
          ref={buttonRef}
          className="btn btn-md btn-primary w-full"
          disabled={isActionReady()}
        >
          Send reset link
        </button>

        <div className="helper-row justify-center mt-4">
          <div className="text">
            Remember your password?
            <Link href="/login">login</Link>
          </div>
        </div>
      </form>
    </AuthContainer>
  );
};

export default ForgotPasswordFormGroup;
