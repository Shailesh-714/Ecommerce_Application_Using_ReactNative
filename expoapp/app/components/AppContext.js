import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [loginStatus, setLoginStatus] = useState(false);
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
  const [totalAmount, setTotalAmount] = useState(0);
  const [profilePicture, setProfilePicture] = useState("");

  return (
    <AppContext.Provider
      value={{
        loginStatus,
        setLoginStatus,
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
        totalAmount,
        setTotalAmount,
        profilePicture,
        setProfilePicture,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
