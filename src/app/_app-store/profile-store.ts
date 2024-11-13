import { create } from "zustand";
import { IProfileStore } from "@/app/_types/store-type";
import { apiUtil } from "@/app/_utils";
import { MOOSPIRE_AUTH_USER, commonUtil } from "@/app/_utils";
import { useAuthStore } from "./auth-store";

const routes = {
  updateRole: "/profile/user-role",
  updateGoal: "/profile/user-goal",
  updatePreference: "/profile/user-preference",
  updateType: "/profile/user-type",
};

export const useProfileStore = create<IProfileStore>(() => ({
  updateProfileRole: async (payload: { user_data: string[] }) => {
    const response = await apiUtil.update(routes.updateRole, { payload });
    mutateUserProfile(response, "userRole");
    return response;
  },

  updateProfileGoal: async (payload: { user_data: string[] }) => {
    const response = await apiUtil.update(routes.updateGoal, { payload });
    mutateUserProfile(response, "userGoal");
    return response;
  },

  updateProfilePreference: async (payload: { user_data: string[] }) => {
    const response = await apiUtil.update(routes.updatePreference, { payload });
    mutateUserProfile(response, "userPreference");
    return response;
  },

  updateProfileType: async (payload: { user_type: string }) => {
    const response = await apiUtil.update(routes.updateType, { payload });
    mutateUserProfile(response, "userType");
    return response;
  },
}));

// MUTATE AUTH USER DATA
const mutateUserProfile = (responsePayload: any, dataType: string) => {
  const { code, data } = responsePayload;

  if ([200].includes(code)) {
    let userData = commonUtil.getStorage({
      storage_name: MOOSPIRE_AUTH_USER,
      storage_type: "object",
    });

    userData = { ...(userData as object), [dataType]: data };

    commonUtil.setStorage({
      storage_name: MOOSPIRE_AUTH_USER,
      storage_value: userData,
      storage_type: "object",
    });

    // Access auth-store and update the state
    const setAuthUser = useAuthStore.getState().setAuthUser;
    setAuthUser(userData);
  }
};
