import React from "react";
import Image from "next/image";
import { GoogleIcon, FigmaIcon } from "@/app/_assets";
import { API_VERSION, API_BASE_URL, commonUtil } from "@/app/_utils";
import "./SocialAuth.scss";

const SocialAuth = () => {
  const apiBaseURL = `${API_BASE_URL}${API_VERSION}/oauth`;

  const googleAPIBaseURL = `${apiBaseURL}/google`;
  const figmaAPIBaseURL = `${apiBaseURL}/figma`;

  const handleGoogleSignIn = () => {
    commonUtil.createAndClickAnchor(googleAPIBaseURL);
  };

  const handleFigmaSignIn = () => {
    commonUtil.createAndClickAnchor(figmaAPIBaseURL);
  };

  return (
    <div className="social-auth">
      {/* GOOGLE SIGNIN */}
      <button
        className="btn btn-sm btn-secondary social-btn"
        onClick={handleGoogleSignIn}
      >
        <Image src={GoogleIcon} alt="google-icon" width={22} height={22} />
        <div className="btn-text">Sign up with Google</div>
      </button>

      {/* FIGMA SIGNIN */}
      <button
        className="btn btn-sm btn-secondary social-btn"
        onClick={handleFigmaSignIn}
      >
        <Image src={FigmaIcon} alt="figma-con" width={22} height={22} />
        <div className="btn-text">Connect with Figma</div>
      </button>
    </div>
  );
};

export default SocialAuth;
