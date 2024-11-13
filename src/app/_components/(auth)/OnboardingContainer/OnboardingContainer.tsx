import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PatternLines } from "@/app/_assets";
import "./OnboardingContainer.scss";

type OnboardingContainerType = {
  children: React.ReactNode;
  progressCounter: number;
  skipRoute: string;
  isWelcomeView?: boolean;
  primaryText?: string;
  secondaryText?: string;
};

const OnboardingContainer = ({
  children,
  progressCounter = 1,
  skipRoute,
  isWelcomeView = false,
  primaryText,
  secondaryText,
}: OnboardingContainerType) => {
  const getPercentValue = () => {
    return `${(progressCounter / 5) * 100}%`;
  };

  return (
    <div className="onboarding-container">
      {/* BACKGROUND IMAGE */}
      {isWelcomeView && (
        <Image
          src={PatternLines}
          alt="Moospire pattern lines"
          width={380}
          height={260}
          className="pattern-bg"
        />
      )}

      {/* TOP ROW */}
      <div className="top-row">
        <div className="progress-section">
          <div className="progress-bar">
            <div
              className="progress-bar--fill"
              style={{ width: getPercentValue() }}
            ></div>
          </div>

          <div className="progress-step">{progressCounter} of 5</div>
        </div>

        <Link href={skipRoute} className="action-item">
          Skip
        </Link>
      </div>

      {/* BASE ROW */}
      <div className="base-row">
        {!isWelcomeView && (
          <>
            <div className="primary-text">{primaryText}</div>
            <div className="secondary-text">{secondaryText}</div>
          </>
        )}

        {children}
      </div>
    </div>
  );
};

export default OnboardingContainer;
