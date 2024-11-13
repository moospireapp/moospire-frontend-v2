"use client";

import React, { useState, useLayoutEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { AuthContainer } from "@/app/_components";
import { useToast } from "@/app/_context/ToastContext";
import { useBtnClick } from "@/app/_hooks";
import useStore from "@/app/_app-store";

const EmailSentFormGroup = () => {
  const params = useParams();

  const { showToast } = useToast();
  const { passwordRequest } = useStore();

  const [_, setProcessing] = useState(false);
  const { buttonRef, updateButtonState } = useBtnClick("Resend reset link");

  const [userEmail, setUserEmail] = useState<string>("");

  const updateButtonClicks = (status: boolean) => {
    setProcessing(status);
    updateButtonState(status);
  };

  const handleForgotPassword = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    updateButtonClicks(true);

    try {
      const response = await passwordRequest({ email: userEmail });
      updateButtonClicks(false);

      if (response.code === 200) {
        showToast(response.message, "success");
      } else {
        showToast(response?.message || response?.error, "error");
      }
    } catch {
      updateButtonClicks(false);
    }
  };

  useLayoutEffect(() => {
    setUserEmail(decodeURIComponent(params.email as string));
  }, [params]);

  return (
    <AuthContainer
      primaryText="Reset Email Sent"
      secondaryText="Please check your email for a link to reset your password."
      showSocialAuth={false}
      placeCenter={true}
    >
      {/* FORM BLOCK */}
      <form className="form-block -mt-3" onSubmit={handleForgotPassword}>
        {/* EMAIL VIEW */}
        <div className="flex justify-start items-center gap-2 mb-6">
          <CheckCircleIcon className="text-orange-500 w-[22px] h-[22px]" />
          <div className="text-orange-500 text-[15.5px] font-medium">
            {userEmail ? userEmail : "Loading user email..."}
          </div>
        </div>

        <div className="helper-row my-2">
          <div className="text">{`Didn't get an email reset link?`}</div>
        </div>

        {/* ACTION BUTTON */}
        <button ref={buttonRef} className="btn btn-md btn-primary w-full">
          Resend reset link
        </button>

        <div className="helper-row justify-center mt-4">
          <div className="text">
            Need to login now?
            <Link href="/login">login</Link>
          </div>
        </div>
      </form>
    </AuthContainer>
  );
};

export default EmailSentFormGroup;
