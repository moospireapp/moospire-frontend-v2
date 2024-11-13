"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";
import { OnboardingContainer, ItemChecker } from "@/app/_components";
import { useToast } from "@/app/_context/ToastContext";
import { useBtnClick } from "@/app/_hooks";
import useStore from "@/app/_app-store";

type userType = {
  label: string;
  isSelected: boolean;
};

const StepFour = () => {
  const router = useRouter();

  const { showToast } = useToast();
  const { updateProfileType } = useStore();

  const [_, setProcessing] = useState(false);
  const { buttonRef, updateButtonState } = useBtnClick("Next");

  const updateButtonClicks = (status: boolean) => {
    setProcessing(status);
    updateButtonState(status);
  };

  const [checkedUser, setCheckedUser] = useState<userType[]>([
    { label: "Beginner", isSelected: false },
    { label: "Intermediate", isSelected: false },
    { label: "Advanced", isSelected: false },
  ]);

  const handleUserSelection = (selectedUser: userType) => {
    setCheckedUser(
      checkedUser.map((user) =>
        user.label === selectedUser.label
          ? { ...user, isSelected: true }
          : { ...user, isSelected: false }
      )
    );
  };

  const updateUserType = (): string | null => {
    const selectedUser = checkedUser.find((user) => user.isSelected);
    return selectedUser ? selectedUser.label : null;
  };

  const isAnyUserTypeSelected = checkedUser.some((pref) => pref.isSelected);

  const handleUserTypeUpdate = async () => {
    updateButtonClicks(true);

    try {
      const userType = updateUserType();
      if (!userType) return;

      const response = await updateProfileType({
        user_type: userType,
      });

      updateButtonClicks(false);

      if (response.code === 200) {
        showToast(response.message, "success");
        setTimeout(() => router.push("/dashboard"), 400);
      } else {
        showToast(response?.message || response?.error, "error");
      }
    } catch {
      updateButtonClicks(false);
    }
  };

  return (
    <OnboardingContainer
      progressCounter={5}
      skipRoute="/dashboard"
      primaryText="Ready to Get Started?"
      secondaryText="How familiar are you with creating moodboards?"
    >
      {/* SELECTION ROW */}
      <div className="selection-row">
        {checkedUser.map((pref, index) => (
          <ItemChecker
            item={pref}
            updateSelection={() => handleUserSelection(pref)}
            key={index}
          />
        ))}
      </div>

      {/* ACTION ROW */}
      <div className="action-row">
        <Link
          href="/onboarding/step-three"
          className="btn btn-lg btn-secondary hover:text-grey-800"
        >
          <ArrowLongLeftIcon className="size-6 sm:size-5 min-w-6 sm:min-w-5 min-h-6 sm:min-h-5" />{" "}
          Back
        </Link>

        <button
          ref={buttonRef}
          className="btn btn-lg btn-primary"
          onClick={handleUserTypeUpdate}
          disabled={!isAnyUserTypeSelected} // Disable if no user is selected
        >
          Next
        </button>
      </div>
    </OnboardingContainer>
  );
};

export default StepFour;
