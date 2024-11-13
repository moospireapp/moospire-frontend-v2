"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";
import { OnboardingContainer, ItemChecker } from "@/app/_components";
import { useToast } from "@/app/_context/ToastContext";
import { useBtnClick } from "@/app/_hooks";
import useStore from "@/app/_app-store";

type roleType = {
  label: string;
  isSelected: boolean;
};

const StepOne = () => {
  const router = useRouter();

  const { showToast } = useToast();
  const { updateProfileRole } = useStore();

  const [_, setProcessing] = useState(false);
  const { buttonRef, updateButtonState } = useBtnClick("Next");

  const updateButtonClicks = (status: boolean) => {
    setProcessing(status);
    updateButtonState(status);
  };

  const [checkedRoles, setCheckedRoles] = useState<roleType[]>([
    { label: "Product Designer", isSelected: false },
    { label: "UI Designer", isSelected: false },
    { label: "UX Designer", isSelected: false },
    { label: "Brand Designer", isSelected: false },
    { label: "Graphic Designer", isSelected: false },
    { label: "Product Manager", isSelected: false },
    { label: "Marketer", isSelected: false },
    { label: "Graphics Designer", isSelected: false },
    { label: "Other", isSelected: false },
  ]);

  const handleRoleSelection = (selectedRole: roleType) => {
    setCheckedRoles(
      checkedRoles.map((role) =>
        role.label === selectedRole.label
          ? { ...role, isSelected: !role.isSelected }
          : role
      )
    );
  };

  const updateUserRole = () => {
    return checkedRoles
      .filter((role) => role.isSelected)
      .map((role) => role.label);
  };

  const isAnyRoleSelected = checkedRoles.some((role) => role.isSelected);

  const handleUserRoleUpdate = async () => {
    updateButtonClicks(true);

    try {
      const response = await updateProfileRole({
        user_data: updateUserRole(),
      });

      updateButtonClicks(false);

      if (response.code === 200) {
        showToast(response.message, "success");
        setTimeout(() => router.push("/onboarding/step-two"), 400);
      } else {
        showToast(response?.message || response?.error, "error");
      }
    } catch {
      updateButtonClicks(false);
    }
  };

  return (
    <OnboardingContainer
      progressCounter={2}
      skipRoute="/onboarding/step-two"
      primaryText="Tell Us About Yourself"
      secondaryText="What best describes your role?"
    >
      {/* SELECTION ROW */}
      <div className="selection-row">
        {checkedRoles.map((role, index) => (
          <ItemChecker
            item={role}
            updateSelection={() => handleRoleSelection(role)}
            key={index}
          />
        ))}
      </div>

      {/* ACTION ROW */}
      <div className="action-row">
        <Link
          href="/welcome"
          className="btn btn-lg btn-secondary hover:text-grey-800"
        >
          <ArrowLongLeftIcon className="size-6 min-w-6 min-h-6" /> Back
        </Link>

        <button
          ref={buttonRef}
          className="btn btn-lg btn-primary"
          onClick={handleUserRoleUpdate}
          disabled={!isAnyRoleSelected} // Disable if no role is selected
        >
          Next
        </button>
      </div>
    </OnboardingContainer>
  );
};

export default StepOne;
