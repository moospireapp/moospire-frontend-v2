"use client";

import React, { useLayoutEffect, useState } from "react";
import { IInputType } from "@/app/_types/form-type";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthContainer, TextInputField } from "@/app/_components";
import { useToast } from "@/app/_context/ToastContext";
import { useBtnClick, useAuth } from "@/app/_hooks";
import useStore from "@/app/_app-store";

const VerifyEmailFormGroup = () => {
  const router = useRouter();
  const authUser = useAuth();
  const searchParams = useSearchParams();

  const { showToast } = useToast();
  const { verifyUserOTP, resendUserOTP } = useStore();

  const [isSendingCode, setIsSendingCode] = useState<boolean>(false);

  const [userEmailAddress, setUserEmailAddress] = useState<string | null>(null);
  const [verificationCode, setVerificationCode] = useState<string | null>(null);

  const [_, setProcessing] = useState(false);
  const { buttonRef, updateButtonState } = useBtnClick("Verify email");

  const updateButtonClicks = (status: boolean) => {
    setProcessing(status);
    updateButtonState(status);
  };

  const isBtnReady = () => {
    return !(userEmailAddress && verificationCode);
  };

  const handleCodeVerification = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    updateButtonClicks(true);

    try {
      const OTPPayload = {
        otp: verificationCode,
      };

      const response = await verifyUserOTP(OTPPayload);
      updateButtonClicks(false);

      if (response.code === 200) {
        showToast(response.message, "success");

        setTimeout(() => {
          if (authUser.isOnboarded) router.push("/dashboard");
          else router.push("/welcome");
        }, 1000);
      } else {
        showToast(response.message, "error");
        setVerificationCode("");
      }
    } catch {
      updateButtonClicks(false);
    }
  };

  const handleResendCode = async () => {
    setIsSendingCode(true);

    try {
      const response = await resendUserOTP();
      setIsSendingCode(false);

      if (response.code === 200) {
        showToast(response.message, "success");
      } else {
        showToast(response.message, "error");
      }
    } catch {
      setIsSendingCode(false);
    }
  };

  useLayoutEffect(() => {
    const email = searchParams.get("email");

    if (email) {
      setUserEmailAddress(decodeURIComponent(email as string));
    }
  }, [searchParams]);

  return (
    <AuthContainer
      primaryText="Verify Your Email"
      secondaryText="A verification code was sent to your email"
      showSocialAuth={false}
      placeCenter={true}
    >
      {/* FORM BLOCK */}
      <form className="form-block" onSubmit={handleCodeVerification}>
        {/* EMAIL DISPLAY */}
        <div className="text-[13.5px] text-orange-500 font-medium -mt-[30px] mb-9">
          {userEmailAddress ? userEmailAddress : "Loading user email..."}
        </div>

        {/* VERIFICATION INPUT */}
        <TextInputField
          labelId="code"
          labelTitle="Verification code"
          inputType={IInputType.Text}
          inputPlaceholder="Enter the verification code"
          isRequired={true}
          hasBottomPadding={false}
          onInputChange={(value) => setVerificationCode(value)}
          errorHandler={{
            validator: "validateRequired",
            message: "Verification code is a required field",
          }}
        />

        <div className="helper-row mt-4 mb-6">
          <div className="text flex justify-start items-center gap-x-1.5">
            {`Didn't get a code?`}
            {isSendingCode ? (
              <div className="text-orange-300/80">Resending...</div>
            ) : (
              <div
                onClick={handleResendCode}
                className="text-orange-500 font-medium cursor-pointer"
              >
                Resend
              </div>
            )}
          </div>
        </div>

        {/* ACTION BUTTON */}
        <button
          ref={buttonRef}
          className="btn btn-md btn-primary w-full"
          disabled={isBtnReady()}
        >
          Verify email
        </button>
      </form>
    </AuthContainer>
  );
};

export default VerifyEmailFormGroup;
