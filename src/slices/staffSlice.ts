import { createSlice } from "@reduxjs/toolkit";
import { IRestaurant, IStaff } from "../types/deliveriesType";

const initialState: {
  data: IStaff | null;
  restaurantdetails: IRestaurant | null;
} = {
  data: null,
  restaurantdetails: null,
};

const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {
    setStaffDetails: (
      state,
      action: {
        payload: IStaff;
      }
    ) => {
      state.data = action.payload;
    },

    setRestaurantDetails: (state, action) => {
      state.restaurantdetails = action.payload;
    },

    resetStaffDetails: (state) => {
      state.data = null;
      state.restaurantdetails = null;
    },
  },
});

export const staffActions = staffSlice.actions;
export default staffSlice.reducer;
