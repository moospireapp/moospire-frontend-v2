"use client";

import React, { useLayoutEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { IInputType } from "@/app/_types/form-type";
import { AuthContainer, TextInputField } from "@/app/_components";
import { useToast } from "@/app/_context/ToastContext";
import { useBtnClick } from "@/app/_hooks";
import useStore from "@/app/_app-store";

const ResetPasswordFormGroup = () => {
  const router = useRouter();
  const params = useParams();

  const { showToast } = useToast();
  const { passwordReset } = useStore();

  const [_, setProcessing] = useState(false);
  const { buttonRef, updateButtonState } = useBtnClick("Reset password");

  const [resetPassword, setResetPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [resetToken, setResetToken] = useState<string>("");

  const [passwordValidity, setPasswordValidity] = useState<boolean>(false);

  const updateButtonClicks = (status: boolean) => {
    setProcessing(status);
    updateButtonState(status);
  };

  const isActionReady = () => {
    return !(resetPassword && passwordValidity);
  };

  const handleResetPassword = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    updateButtonClicks(true);

    if (resetPassword !== confirmPassword) {
      showToast("Passwords do not match.", "error");
      updateButtonClicks(false);
      return;
    }

    try {
      const response = await passwordReset({
        password: resetPassword,
        token: resetToken,
      });

      updateButtonClicks(false);

      if (response.code === 200) {
        showToast(response.message, "success");
        setTimeout(() => router.push("/login"), 3000);
      } else {
        showToast(response?.message || response?.error, "error");
      }
    } catch {
      updateButtonClicks(false);
    }
  };

  useLayoutEffect(() => {
    setResetToken(params.token as string);
  }, [params]);

  return (
    <AuthContainer
      primaryText="Reset Your Password"
      secondaryText="Provide your new password to access your account."
      showSocialAuth={false}
      placeCenter={true}
    >
      {/* FORM BLOCK */}
      <form className="form-block" onSubmit={handleResetPassword}>
        {/* PASSWORD INPUT */}
        <TextInputField
          labelId="password"
          labelTitle="New password"
          inputType={IInputType.Password}
          inputPlaceholder="Enter new password"
          isRequired={true}
          onInputValidated={(validity) => setPasswordValidity(validity)}
          onInputChange={(value) => setResetPassword(value)}
          errorHandler={{ validator: "validatePasswordStrength" }}
        />

        {/* PASSWORD INPUT */}
        <TextInputField
          labelId="confirmPassword"
          labelTitle="Confirm new password"
          inputType={IInputType.Password}
          inputPlaceholder="Re-enter new password"
          isRequired={true}
          onInputChange={(value) => setConfirmPassword(value)}
          errorHandler={{ validator: "validateRequired" }}
        />

        {/* ACTION BUTTON */}
        <button
          ref={buttonRef}
          className="btn btn-md btn-primary w-full"
          disabled={isActionReady()}
        >
          Reset Password
        </button>
      </form>
    </AuthContainer>
  );
};

export default ResetPasswordFormGroup;
