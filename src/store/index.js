import { configureStore } from "@reduxjs/toolkit";
import roadmapSlice from "./roadmap-slice";
import mobileSlice from "./mobile-slice";
import userSlice from "./user-slice";

const store = configureStore({
    reducer: {
        roadmap: roadmapSlice.reducer,
        mobile: mobileSlice.reducer,
        user: userSlice.reducer,
    }
});

export default store;