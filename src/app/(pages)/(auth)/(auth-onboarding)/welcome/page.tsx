import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { OnboardingContainer } from "@/app/_components";
import { MoospireLogoFill } from "@/app/_assets";

export const metadata: Metadata = {
  title: "Welcome to Moospire",
};

const Welcome = () => {
  return (
    <OnboardingContainer
      progressCounter={1}
      skipRoute="/onboarding/step-one"
      isWelcomeView={true}
    >
      {/* BRAND LOGO */}
      <Image
        src={MoospireLogoFill}
        alt="Moospire logo"
        width={72}
        height={72}
        className="brand-logo mb-7 lg:size-[64px] md:size-[60px]"
      />

      {/* PRIMARY TEXT */}
      <h2 className="text-black-accent text-[36px] md:text-[34px] sm:text-[28px] xs:text-[24px] leading-[48px] lg:leading-[44px] sm:leading-[38px] font-bold mb-2.5">
        Welcome to Moospire.
      </h2>

      {/* SECONDARY TEXT */}
      <div className="text-grey-600 text-[15.5px] sm:text-[15px] xs:text-[14.5px] leading-[28px] sm:leading-[26px] xs:leading-[24px] mb-11 w-[65%] sm:w-[90%] xs:w-full">
        {`Your ultimate tool for creating, customizing, and sharing beautiful
        moodboards. Let's get started with a few quick questions to tailor your
        experience.`}
      </div>

      {/* ACTION BUTTON */}
      <Link
        href="/onboarding/step-one"
        className="btn btn-lg btn-primary w-[25%] md:w-[30%] sm:w-[44%] xs:w-[55%] hover:text-white"
      >
        Get started
      </Link>
    </OnboardingContainer>
  );
};

export default Welcome;
