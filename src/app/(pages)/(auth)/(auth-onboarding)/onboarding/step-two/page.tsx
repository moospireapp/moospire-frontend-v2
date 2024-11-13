"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";
import { OnboardingContainer, ItemChecker } from "@/app/_components";
import { useToast } from "@/app/_context/ToastContext";
import { useBtnClick } from "@/app/_hooks";
import useStore from "@/app/_app-store";

type goalType = {
  label: string;
  isSelected: boolean;
};

const StepTwo = () => {
  const router = useRouter();

  const { showToast } = useToast();
  const { updateProfileGoal } = useStore();

  const [_, setProcessing] = useState(false);
  const { buttonRef, updateButtonState } = useBtnClick("Next");

  const updateButtonClicks = (status: boolean) => {
    setProcessing(status);
    updateButtonState(status);
  };

  const [checkedGoal, setCheckedGoals] = useState<goalType[]>([
    { label: "Creating moodboards for design projects", isSelected: false },
    {
      label: "Generating visual inspiration for marketing campaigns",
      isSelected: false,
    },
    { label: "Presenting concepts to stakeholders", isSelected: false },
    { label: "Other", isSelected: false },
  ]);

  const handleGoalSelection = (selectedGoal: goalType) => {
    setCheckedGoals(
      checkedGoal.map((goal) =>
        goal.label === selectedGoal.label
          ? { ...goal, isSelected: !goal.isSelected }
          : goal
      )
    );
  };

  const updateUserGoal = () => {
    return checkedGoal
      .filter((goal) => goal.isSelected)
      .map((goal) => goal.label);
  };

  const isAnyGoalSelected = checkedGoal.some((goal) => goal.isSelected);

  const handleUserGoalUpdate = async () => {
    updateButtonClicks(true);

    try {
      const response = await updateProfileGoal({
        user_data: updateUserGoal(),
      });

      updateButtonClicks(false);

      if (response.code === 200) {
        showToast(response.message, "success");
        setTimeout(() => router.push("/onboarding/step-three"), 400);
      } else {
        showToast(response?.message || response?.error, "error");
      }
    } catch {
      updateButtonClicks(false);
    }
  };

  return (
    <OnboardingContainer
      progressCounter={3}
      skipRoute="/onboarding/step-three"
      primaryText="Define Your Goals"
      secondaryText="What do you primarily want to use Moospire for?"
    >
      {/* SELECTION ROW */}
      <div className="selection-row">
        {checkedGoal.map((goal, index) => (
          <ItemChecker
            item={goal}
            updateSelection={() => handleGoalSelection(goal)}
            key={index}
          />
        ))}
      </div>

      {/* ACTION ROW */}
      <div className="action-row">
        <Link
          href="/onboarding/step-one"
          className="btn btn-lg btn-secondary hover:text-grey-800"
        >
          <ArrowLongLeftIcon className="size-6 min-w-6 min-h-6" /> Back
        </Link>

        <button
          ref={buttonRef}
          className="btn btn-lg btn-primary"
          onClick={handleUserGoalUpdate}
          disabled={!isAnyGoalSelected} // Disable if no goal is selected
        >
          Next
        </button>
      </div>
    </OnboardingContainer>
  );
};

export default StepTwo;
