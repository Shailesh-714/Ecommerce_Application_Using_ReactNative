import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loadWishlistFromStorage } from "../redux/reducers/dealSlice";
import { loadCartFromStorage } from "../redux/reducers/cartSlice";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
  const [profilePicture, setProfilePicture] = useState(
    "https://t4.ftcdn.net/jpg/03/40/12/49/360_F_340124934_bz3pQTLrdFpH92ekknuaTHy8JuXgG7fi.jpg"
  );
  const dispatch = useDispatch();

  const init = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const storedUserName = await AsyncStorage.getItem(`${token}userName`);
        if (storedUserName) {
          setUserName(storedUserName);
        }

        const storedUserEmail = await AsyncStorage.getItem(`${token}userEmail`);
        if (storedUserEmail) {
          setUserEmail(storedUserEmail);
        }

        const storedUserPhoneNumber = await AsyncStorage.getItem(
          `${token}userPhoneNumber`
        );
        if (storedUserPhoneNumber) {
          setUserPhoneNumber(storedUserPhoneNumber);
        }

        const storedUserAge = await AsyncStorage.getItem(`${token}userAge`);
        if (storedUserAge) {
          setUserAge(storedUserAge);
        }

        const storedUserAddresses = await AsyncStorage.getItem(
          `${token}userAddresses`
        );
        if (storedUserAddresses) {
          setUserAddresses(JSON.parse(storedUserAddresses));
        }

        const storedProfilePicture = await AsyncStorage.getItem(
          `@MyApp:ProfilePicture:${storedUserEmail}`
        );
        if (storedProfilePicture) {
          setProfilePicture(storedProfilePicture);
        }
        dispatch(loadWishlistFromStorage(storedUserEmail));
        dispatch(loadCartFromStorage(storedUserEmail));
      }
      return true;
    } catch (error) {
      console.error("Error initializing app:", error);
    }
  });

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
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
        init,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
