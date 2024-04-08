import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { deals } from "../../data/DealsData";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  cartList: deals,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleAddedtocart: (state, action) => {
      const { id, userEmail } = action.payload;
      const item = state.cartList.find((item) => item.id === id);
      if (item) {
        if (item.addedtocart === false) {
          item.count = 1;
        } else {
          item.count = 0;
        }
        item.addedtocart = !item.addedtocart;
        saveCartToStorage(state.cartList, userEmail);
      }
    },
    setCart: (state, action) => {
      state.cartList = action.payload;
    },
    incrementCount: (state, action) => {
      const { id, userEmail } = action.payload;
      const item = state.cartList.find((item) => item.id === id);
      if (item) {
        item.count = item.count + 1;
        saveCartToStorage(state.cartList, userEmail);
      }
    },
    decrementCount: (state, action) => {
      const { id, userEmail } = action.payload;
      const item = state.cartList.find((item) => item.id === id);
      if (item) {
        if (item.count <= 1) {
          item.count = 0;
          item.addedtocart = !item.addedtocart;
        } else {
          item.count = item.count - 1;
        }
        saveCartToStorage(state.cartList, userEmail);
      }
    },
  },
});

export const { toggleAddedtocart, setCart, incrementCount, decrementCount } =
  cartSlice.actions;

export const selectCartList = (state) => state.cart.cartList;

export const selectCartItems = createSelector([selectCartList], (cartList) =>
  cartList.filter((item) => item.addedtocart)
);

const saveCartToStorage = async (cartData, userEmail) => {
  try {
    const CART_STORAGE_KEY = `@MyApp:cart:${userEmail}`;
    await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartData));
  } catch (error) {
    console.error("Error saving cart data to AsyncStorage:", error);
  }
};

export const loadCartFromStorage = (mail_id) => async (dispatch) => {
  try {
    const CART_STORAGE_KEY = `@MyApp:cart:${mail_id}`;
    const cartData = await AsyncStorage.getItem(CART_STORAGE_KEY);
    if (cartData) {
      dispatch(setCart(JSON.parse(cartData)));
    }
  } catch (error) {
    console.error("Error loading cart data from AsyncStorage:", error);
  }
};
export default cartSlice.reducer;
