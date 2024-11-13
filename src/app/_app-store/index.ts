import { useAuthStore } from "./auth-store";
import { useProfileStore } from "./profile-store";

const useStore = () => ({
  ...useAuthStore(),
  ...useProfileStore(),
});

export default useStore;
