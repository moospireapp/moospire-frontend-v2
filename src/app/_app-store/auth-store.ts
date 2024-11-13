import { create } from "zustand";
import { IAuthStore, IAuthType } from "@/app/_types/store-type";
import { MOOSPIRE_AUTH_USER, apiUtil, commonUtil } from "@/app/_utils";

const routes = {
  login: "/auth/login",
  signup: "/auth/signup",
  googleCallback: "oauth/google/callback",
  figmaCallback: "oauth/figma/callback",
  verifyOTP: "/auth/verify-otp",
  resendOTP: "/auth/resend-otp",
  passwordRequest: "/auth/request-password",
  passwordReset: "/auth/reset-password",
  logout: "/auth/logout",
};

export const useAuthStore = create<IAuthStore>((set, _) => ({
  authUser:
    commonUtil.getStorage({
      storage_name: MOOSPIRE_AUTH_USER,
      storage_type: "object",
    }) || {},

  // Method to directly update authUser
  setAuthUser: (newUserData: any) => set({ authUser: newUserData }),

  loginUser: async (payload: Pick<IAuthType, "email" | "password">) => {
    const response = await apiUtil.push(routes.login, { payload });
    mutateAuthUser(set, response);
    return response;
  },

  signupUser: async (
    payload: Pick<IAuthType, "firstName" | "lastName" | "email" | "password">
  ) => {
    const response = await apiUtil.push(routes.signup, { payload });
    mutateAuthUser(set, response);
    return response;
  },

  handleGoogleOAuth: async (authenticationCode: string) => {
    const response = await apiUtil.fetch(
      `${routes.googleCallback}?code=${authenticationCode}`
    );
    mutateAuthUser(set, response);
    return response;
  },

  handleFigmaOAuth: async (authenticationCode: string) => {
    const response = await apiUtil.fetch(
      `${routes.figmaCallback}?code=${authenticationCode}`
    );
    mutateAuthUser(set, response);
    return response;
  },

  verifyUserOTP: async (payload: Pick<IAuthType, "otp">) => {
    return await apiUtil.push(routes.verifyOTP, { payload });
  },

  resendUserOTP: async () => {
    return await apiUtil.push(routes.resendOTP, {});
  },

  passwordRequest: async (payload: Pick<IAuthType, "email">) => {
    return await apiUtil.push(routes.passwordRequest, { payload });
  },

  passwordReset: async (payload: Pick<IAuthType, "token" | "password">) => {
    return await apiUtil.push(routes.passwordReset, { payload });
  },

  logoutUser: async () => {
    const response = await apiUtil.push(routes.logout, {});

    if (response.code === 200) {
      commonUtil.removeStorage(MOOSPIRE_AUTH_USER);
      set({ authUser: {} });
    }

    return response;
  },
}));

// MUTATE AUTH USER DATA
const mutateAuthUser = (setHandler: any, responsePayload: any) => {
  const { code, data } = responsePayload;

  if ([200, 201].includes(code)) {
    const { user } = data;

    commonUtil.setStorage({
      storage_name: MOOSPIRE_AUTH_USER,
      storage_value: user,
      storage_type: "object",
    });

    setHandler({ authUser: user ?? {} }); // Corrected this part
  }
};
