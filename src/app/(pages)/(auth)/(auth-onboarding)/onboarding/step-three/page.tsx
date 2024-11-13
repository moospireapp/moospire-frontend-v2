"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";
import { OnboardingContainer, ItemChecker } from "@/app/_components";
import { useToast } from "@/app/_context/ToastContext";
import { useBtnClick } from "@/app/_hooks";
import useStore from "@/app/_app-store";

type prefType = {
  label: string;
  isSelected: boolean;
};

const StepThree = () => {
  const router = useRouter();

  const { showToast } = useToast();
  const { updateProfilePreference } = useStore();

  const [_, setProcessing] = useState(false);
  const { buttonRef, updateButtonState } = useBtnClick("Next");

  const updateButtonClicks = (status: boolean) => {
    setProcessing(status);
    updateButtonState(status);
  };

  const [checkedPreference, setCheckedPreference] = useState<prefType[]>([
    { label: "Logo design", isSelected: false },
    { label: "UI design", isSelected: false },
    { label: "Marketing Campaigns", isSelected: false },
    { label: "Flyers", isSelected: false },
    { label: "Social media designs", isSelected: false },
    { label: "Web Interaction", isSelected: false },
    { label: "Website design", isSelected: false },
    { label: "Other", isSelected: false },
  ]);

  const handlePreferenceSelection = (selectedPreference: prefType) => {
    setCheckedPreference(
      checkedPreference.map((pref) =>
        pref.label === selectedPreference.label
          ? { ...pref, isSelected: !pref.isSelected }
          : pref
      )
    );
  };

  const updateUserPreference = () => {
    return checkedPreference
      .filter((pref) => pref.isSelected)
      .map((pref) => pref.label);
  };

  const isAnyPreferenceSelected = checkedPreference.some(
    (pref) => pref.isSelected
  );

  const handleUserPreferenceUpdate = async () => {
    updateButtonClicks(true);

    try {
      const response = await updateProfilePreference({
        user_data: updateUserPreference(),
      });

      updateButtonClicks(false);

      if (response.code === 200) {
        showToast(response.message, "success");
        setTimeout(() => router.push("/onboarding/step-four"), 400);
      } else {
        showToast(response?.message || response?.error, "error");
      }
    } catch {
      updateButtonClicks(false);
    }
  };

  return (
    <OnboardingContainer
      progressCounter={4}
      skipRoute="/onboarding/step-four"
      primaryText="Specify Your Preferences"
      secondaryText="What types of moodboards are you most interested in creating?"
    >
      {/* SELECTION ROW */}
      <div className="selection-row">
        {checkedPreference.map((pref, index) => (
          <ItemChecker
            item={pref}
            updateSelection={() => handlePreferenceSelection(pref)}
            key={index}
          />
        ))}
      </div>

      {/* ACTION ROW */}
      <div className="action-row">
        <Link
          href="/onboarding/step-two"
          className="btn btn-lg btn-secondary hover:text-grey-800"
        >
          <ArrowLongLeftIcon className="size-6 min-w-6 min-h-6" /> Back
        </Link>

        <button
          ref={buttonRef}
          className="btn btn-lg btn-primary"
          onClick={handleUserPreferenceUpdate}
          disabled={!isAnyPreferenceSelected} // Disable if no preference is selected
        >
          Next
        </button>
      </div>
    </OnboardingContainer>
  );
};

export default StepThree;
