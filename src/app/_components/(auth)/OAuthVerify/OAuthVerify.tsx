"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useStore from "@/app/_app-store";

const OAuthVerify = () => {
  const router = useRouter();
  const params = useSearchParams();
  const { handleGoogleOAuth, handleFigmaOAuth } = useStore();

  const handleAuthRedirect = (response: any) => {
    if (response.code === 200) {
      const { isOnboarded, isVerified, email } = response.data.user;

      if (isVerified && isOnboarded) {
        router.push("/dashboard");
      } else if (isVerified && !isOnboarded) {
        router.push("/welcome");
      } else if (!isVerified && !isOnboarded) {
        router.push(`/verify-email?email=${encodeURIComponent(email)}`);
      }
    } else {
      router.push("/login");
    }
  };

  useEffect(() => {
    const authenticateUser = async () => {
      const code = params.get("code");
      if (!code) return;

      const isGoogleAuth = window.location.href.includes("googleapis");
      const response = isGoogleAuth
        ? await handleGoogleOAuth(code)
        : await handleFigmaOAuth(code);

      handleAuthRedirect(response);
    };

    authenticateUser();
  }, [params, handleGoogleOAuth, handleFigmaOAuth]);

  return (
    <div className="flex justify-start items-center gap-x-2 p-4">
      <div className="icon-spinner-ios text-3xl text-orange-700 animate-spin"></div>
      <div className="text text-grey-700 text-[15px]">
        Authenticating user profile...
      </div>
    </div>
  );
};

export default OAuthVerify;
