import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { deals } from "../../data/DealsData";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  dealsList: deals,
};

const dealSlice = createSlice({
  name: "deals",
  initialState,
  reducers: {
    toggleWishlist: (state, action) => {
      const { id, userEmail } = action.payload;
      const item = state.dealsList.find((item) => item.id === id);
      if (item) {
        item.wishlisted = !item.wishlisted;
        saveWishlistToStorage(state.dealsList, userEmail);
      }
    },
    setWishlist: (state, action) => {
      state.dealsList = action.payload;
    },
  },
});

export const { toggleWishlist, setWishlist } = dealSlice.actions;

export const selectDealsList = (state) => state.deals.dealsList;

export const selectWishlistedItems = createSelector(
  [selectDealsList],
  (dealsList) => dealsList.filter((item) => item.wishlisted)
);

const saveWishlistToStorage = async (wishlistData, userEmail) => {
  try {
    const CART_STORAGE_KEY = `@MyApp:wishlist:${userEmail}`;
    await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(wishlistData));
  } catch (error) {
    console.error("Error saving cart data to AsyncStorage:", error);
  }
};

export const loadWishlistFromStorage = (mail_id) => async (dispatch) => {
  try {
    const CART_STORAGE_KEY = `@MyApp:wishlist:${mail_id}`;
    const wishlistData = await AsyncStorage.getItem(CART_STORAGE_KEY);
    if (wishlistData) {
      dispatch(setWishlist(JSON.parse(wishlistData)));
    }
  } catch (error) {
    console.error("Error loading cart data from AsyncStorage:", error);
  }
};

export default dealSlice.reducer;
