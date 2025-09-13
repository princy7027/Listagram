import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiGet, ApiGetNoAuth, ApiPost } from "../../helpers/API/ApiData";
const initialState = {
    plans:[],
    selectedPlan:{}
};

export const getPlan = createAsyncThunk("subscription_plan/get-all-subscription-plan", async (body) => {
  try {
    const response = await ApiGetNoAuth(`subscription_plan/get-all-subscription-plan`, body);
    return response;
  } catch (error) {
    return error;
  }
});

export const getSubscription = createAsyncThunk("subscription/get-subscription", async (body) => {
  try {
    const response = await ApiGet(`subscription/get-subscription`);
    return response;
  } catch (error) {
    return error;
  }
});

export const createPayment = createAsyncThunk("subscription/create-payment-intent", async (id) => {
  try {
    const response = await ApiGet(`subscription/create-payment-intent/${id}`);
    return response;
  } catch (error) {
    return error.response;
  }
});

export const contactUs = createAsyncThunk("enterprise_subscription/create", async (body) => {
  try {
    const response = await ApiPost(`enterprise_subscription/create`,body);
    return response;
  } catch (error) {
    return error.response;
  }
});
export const subscriptionSlice = createSlice({
  name: "subscription",
  initialState: initialState,
  reducers: {
    logout: () => {},
  },
  extraReducers(builder) {
    builder
      .addCase(getPlan.pending, (state) => {
        state.status = "loading";

      })
      .addCase(getPlan.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.plans=action?.payload?.data?.data
   
      })
      .addCase(getPlan.rejected, (state) => {
        state.status = "rejected";
      
      })
      .addCase(getSubscription.pending, (state) => {
        state.status = "loading";

      })
      .addCase(getSubscription.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedPlan=action?.payload?.data?.data?.subscription
   
      })
      .addCase(getSubscription.rejected, (state) => {
        state.status = "rejected";
      
      })
      .addCase(createPayment.pending, (state) => {
        state.status = "loading";

      })
      .addCase(createPayment.fulfilled, (state, action) => {
        if(!action?.payload?.data?.success){
          return;
        }
        state.status = "succeeded";
        state.selectedPlan=action?.payload?.data?.data?.subscription
   
      })
      .addCase(createPayment.rejected, (state) => {
        state.status = "rejected";
      
      })
  },
});
export default subscriptionSlice;
