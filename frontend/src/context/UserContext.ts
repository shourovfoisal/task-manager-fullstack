import { createContext } from "react";

export type UserType = { name: string; email: string } | null;

export type UserContextType = {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
  userLoading: boolean;
  setUserLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  userLoading: false,
  setUserLoading: () => {},
});
