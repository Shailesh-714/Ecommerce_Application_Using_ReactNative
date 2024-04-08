import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [userAge, setUserAge] = useState("");

  return (
    <AppContext.Provider
      value={{
        userName,
        setUserName,
        userEmail,
        setUserEmail,
        userPhoneNumber,
        setUserPhoneNumber,
        userAge,
        setUserAge,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
