import { configureStore } from "@reduxjs/toolkit";
import dealReducer from "./reducers/dealSlice";
import cartSlice from "./reducers/cartSlice";

const store = configureStore({
  reducer: {
    deals: dealReducer,
    cart: cartSlice,
  },
});

export default store;
