import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiGet, ApiPost, ApiPostNoAuth, ApiPut, formDataHeader } from "../../helpers/API/ApiData";
import { setToken, setUser } from "../../helpers/utils/auth.util";
// import toast from "react-hot-toast";
const initialState = {
  user: {},
  users: {},
  authLoader: false,
  isLoggedIn: false,
  errorSignIn: false,
  status: "idle",
  error: null,
};

export const signUp = createAsyncThunk("auth/signup", async (body) => {
  try {
    const response = await ApiPostNoAuth(`auth/signup`, body);

    return response;
  } catch (error) {
    return error.response;
  }
});
export const signIn = createAsyncThunk("api/auth/login", async (body) => {
  console.log(body, "responseresponseresponse");
  try {
    const response = await ApiPostNoAuth(`api/auth/login`, body);
    console.log("++", response.data.token);
    localStorage.setItem("authToken", response.data.token);
    setToken(response?.data?.token);
    return response;
  } catch (error) {
    return error.response;
  }
});
export const googleLogin = createAsyncThunk("auth/google/login", async (body) => {
  try {
    const response = await ApiPostNoAuth(`auth/google/login`, body);
    return response;
  } catch (e) {
    return e.response;
  }
});
export const verifyOtp = createAsyncThunk("auth/verify-otp", async (body) => {
  try {
    const response = await ApiPostNoAuth(`auth/verify-otp`, body);
    return response;
  } catch (error) {
    return error.response;
  }
});
export const forgotPassword = createAsyncThunk("auth/forgot-password-send-otp", async (body) => {
  try {
    const response = await ApiPostNoAuth(`auth/forgot-password-send-otp-v1`, body);
    return response;
  } catch (error) {
    return error.response;
  }
});

export const updateUser = createAsyncThunk("/auth/update-profile", async (body) => {
  try {
    const response = await ApiPost(`auth/update-profile-v1`, body);
    return response;
  } catch (error) {
    return error;
  }
});

export const updateUserProfile = createAsyncThunk("/auth/update", async (body) => {
  const formData = new FormData();
  formData.append("profileImage", body?.profileImage);
  try {
    const response = await ApiPut(`auth/update-profile-v1`, formData, formDataHeader);
    return response;
  } catch (error) {
    return error;
  }
});

export const resetPassword = createAsyncThunk("/auth/reset-forgot-password", async (body) => {
  try {
    const response = await ApiPost(`auth/reset-forgot-password-v1`, body);
    return response;
  } catch (error) {
    return error.response;
  }
});

export const chnagePassword = createAsyncThunk("/auth/change-password", async (body) => {
  try {
    const response = await ApiPost(`auth/change-password`, body);
    return response;
  } catch (error) {
    return error.response;
  }
});
export const resendOtp = createAsyncThunk("/auth/signup-resend-otp", async (body) => {
  try {
    const response = await ApiPostNoAuth(`auth/signup-resend-otp`, body);
    return response;
  } catch (error) {
    return error.response;
  }
});

export const getUsers = createAsyncThunk("api/admin/view_All_User", async (body) => {
  try {
    const response = await ApiGet(`auth/get-all-user`);
    return response;
  } catch (error) {
    return error.response;
  }
});
export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logout: () => {},
  },
  extraReducers(builder) {
    builder
      .addCase(signIn.pending, (state) => {
        state.status = "loading";
        state.authLoader = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (!action?.payload?.data?.success) {
          // toast.error(action?.payload?.data?.message);
          return;
        }
        if (action?.payload?.data?.error !== "EMAIL_NOT_VERIFIED") {
          setToken(action?.payload?.data?.data?.token);
          state.user = action?.payload?.data?.data?.user;
          setUser(action?.payload?.data?.data?.user);
          state.authLoader = false;
          state.isLoggedIn = true;
        }
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = "rejected";
        state.authLoader = false;
      })
      .addCase(googleLogin.pending, (state) => {
        state.status = "loading";
        state.authLoader = true;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.status = "succeeded";

        if (action?.payload?.status !== 200) {
          // toast.error(action?.payload?.data?.detail);
          return;
        }

        if (action?.payload?.data?.error !== "EMAIL_NOT_VERIFIED") {
          setToken(action?.payload?.data?.data?.token);
          state.user = action?.payload?.data?.data?.user;
          setUser(action?.payload?.data?.data?.user);
          state.authLoader = false;
          state.isLoggedIn = true;
        }
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.status = "rejected";
        state.authLoader = false;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.status = "loading";
        state.authLoader = true;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (!action?.payload?.data?.success) {
          // toast.error(action?.payload?.data?.detail)
          return;
        }
        if (action?.payload?.data?.data?.error !== "EMAIL_NOT_VERIFIED") {
          // toast.success("Registration completed successfully");
          setToken(action?.payload?.data?.data?.token);
          state.user = action?.payload?.data?.data?.user;
          setUser(action?.payload?.data?.data?.user);
          state.authLoader = false;
          state.isLoggedIn = true;
        }
      })
      .addCase(verifyOtp.rejected, (state) => {
        state.status = "rejected";
        state.authLoader = false;
      })
      .addCase(signUp.pending, (state) => {
        state.status = "loading";
        state.authLoader = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.authLoader = false;
        if (action?.payload?.status !== 200) {
          // toast.error(action?.payload?.data?.detail);
        }
      })
      .addCase(signUp.rejected, (state) => {
        state.status = "rejected";
        state.authLoader = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
        state.authLoader = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.authLoader = false;
        state.isLoggedIn = true;
        if (!action?.payload?.data?.success) {
          return;
        }
        state.user = action?.payload?.data?.data;
        setUser(action?.payload?.data?.data);
      })
      .addCase(updateUser.rejected, (state) => {
        state.status = "rejected";
        state.authLoader = false;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.status = "loading";
        state.authLoader = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.authLoader = false;
        state.isLoggedIn = true;
        state.user = action?.payload?.data?.user;
        setUser(action?.payload?.data?.user);
      })
      .addCase(updateUserProfile.rejected, (state) => {
        state.status = "rejected";
        state.authLoader = false;
      })
      .addCase(resetPassword.pending, (state) => {
        state.status = "loading";
        state.authLoader = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.authLoader = false;
        state.isLoggedIn = false;
        if (action?.payload?.status !== 200) {
          // toast.error(action?.payload?.data?.detail);
        }
      })
      .addCase(resetPassword.rejected, (state) => {
        state.status = "rejected";
        state.authLoader = false;
      })
      .addCase(getUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload.data;
      })
      .addCase(getUsers.rejected, (state) => {
        state.status = "rejected";
      });
  },
});
export const { logout } = authSlice.actions;
export default authSlice;
