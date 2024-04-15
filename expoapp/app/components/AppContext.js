import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [userAge, setUserAge] = useState("");
  const [userAddresses, setUserAddresses] = useState([]);
  const [order, setOrder] = useState({
    products: [],
    userEmail: "",
    address: "",
    totalAmount: 0,
    paymentMethod: "",
    paymentStatus: "",
  });

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
        userAddresses,
        setUserAddresses,
        order,
        setOrder,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
