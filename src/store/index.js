import { configureStore } from "@reduxjs/toolkit";
import roadmapSlice from "./roadmap-slice";
import mobileSlice from "./mobile-slice";

const store = configureStore({
    reducer: {
        roadmap: roadmapSlice.reducer,
        mobile: mobileSlice.reducer,
    }
});

export default store;