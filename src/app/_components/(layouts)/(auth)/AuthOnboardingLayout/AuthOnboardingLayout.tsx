"use client";

import React, { ReactNode } from "react";
import Image from "next/image";
// import { useAuth } from "@/app/_hooks";
import { CircleYellowEllipse } from "@/app/_assets";
import "./AuthOnboardingLayout.scss";

const AuthEntryLayout = ({ children }: { children: ReactNode }) => {
  //   const { isAuthenticated, isLoading } = useAuth(); // Protect the route
  //   if (isLoading) return null; // Prevent flashing before the check

  return (
    <div className="auth-onboarding-layout">
      {/* BACKGROUND ELLIPSE */}
      <Image
        src={CircleYellowEllipse}
        alt="Moospire yellow ellipse"
        width={320}
        height={320}
        className="ellipse-img"
      />

      <div className="app-container">
        <div className="onboarding-area">{children}</div>
      </div>
    </div>
  );
};

export default AuthEntryLayout;
