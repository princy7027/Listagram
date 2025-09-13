import storage from "redux-persist/lib/storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import authSlice from "./slice/authSlice";
import subscriptionSlice from "./slice/planSlice";
import dashboardSlice from "./slice/dashboardSlice";
import projectSlice from "./slice/projectSlice";
import embeddingSlice from "./slice/embeddingSlice";
import dynamicDataSlice from "./slice/dynamicDataSlice";
import settingSlice from "./slice/settingSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage: storage,
};

const appReducer = combineReducers({
  setting: settingSlice.reducer,
  data: dynamicDataSlice.reducer,
  auth: authSlice.reducer,
  subscription: subscriptionSlice.reducer,
  dashboard: dashboardSlice.reducer,
  project:projectSlice.reducer,
  embedding:embeddingSlice.reducer
});

const rootReducer = (state, action) => {
  if (action.type === "auth/logout") {
    storage.removeItem("persist:root");
    storage.removeItem("persist:reducer");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    // localStorage.clear();
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const reduxStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default reduxStore;
