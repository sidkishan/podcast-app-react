import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slices/userSlice";
import podcastSlice from "./Slices/podcastSlice";
const store = configureStore({
  reducer: {
    user: userSlice,
    podcasts: podcastSlice,
  },
});
export default store;
