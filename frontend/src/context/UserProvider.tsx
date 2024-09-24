import { useState } from "react";
import { UserContext, UserType } from "./UserContext";

const UserProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [userLoading, setUserLoading] = useState<boolean>(false);

  return (
    <UserContext.Provider
      value={{ user, setUser, userLoading, setUserLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
