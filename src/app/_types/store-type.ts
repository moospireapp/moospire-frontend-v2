export type IAuthType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  token: string | undefined;
  fullName?: string;
  image?: any;
  otp?: any;
};

export interface IAuthStore {
  authUser: any;

  setAuthUser: (payload: any) => any;
  loginUser: (payload: Pick<IAuthType, "email" | "password">) => any;
  signupUser: (
    payload: Pick<IAuthType, "firstName" | "lastName" | "email" | "password">
  ) => any;
  handleGoogleOAuth: (authenticationCode: string) => any;
  handleFigmaOAuth: (authenticationCode: string) => any;
  verifyUserOTP: (payload: Pick<IAuthType, "otp">) => any;
  resendUserOTP: () => any;
  passwordRequest: (payload: Pick<IAuthType, "email">) => any;
  passwordReset: (payload: Pick<IAuthType, "token" | "password">) => any;
  logoutUser: () => any;
}

export interface IProfileStore {
  updateProfileRole: (payload: { user_data: string[] }) => any;
  updateProfileGoal: (payload: { user_data: string[] }) => any;
  updateProfilePreference: (payload: { user_data: string[] }) => any;
  updateProfileType: (payload: { user_type: string }) => any;
}
