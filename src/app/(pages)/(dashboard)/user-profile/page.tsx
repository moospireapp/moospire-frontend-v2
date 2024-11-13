import React from "react";
import { UserProfileFormGroup, DeleteUserFormGroup } from "@/app/_components";

const UserProfile = () => {
  return (
    <div className="mt-2 mb-16 pt-8 px-6 sm:px-3">
      <div className="w-[48%] md:w-3/5 sm:w-4/5 xs:w-full mx-auto">
        {/* USER PROFILE FORM GROUO */}
        <div className="pb-12 border-b border-b-grey-100/70">
          <UserProfileFormGroup />
        </div>

        <div className="pt-12 pb-8 border-b border-b-grey-100/70">
          <DeleteUserFormGroup />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
