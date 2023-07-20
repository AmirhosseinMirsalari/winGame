import React, { useState } from "react";

type openLoginContextObj = { openLogin: boolean; setOpenLogin: any };

const OpenLoginContext = React.createContext<openLoginContextObj>({
  openLogin: false,
  setOpenLogin: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const OpenLoginContextProvider: React.FC<Props> = ({ children }) => {
  const [openLogin, setOpenLogin] = useState(false);

  const contextValue: openLoginContextObj = {
    openLogin,
    setOpenLogin,
  };
  return (
    <OpenLoginContext.Provider value={contextValue}>
      {children}
    </OpenLoginContext.Provider>
  );
};

export default OpenLoginContext;
