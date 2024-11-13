import useStore from "@/app/_app-store";

const useAuth = () => {
  const { authUser } = useStore();
  return authUser;
};

export default useAuth;
