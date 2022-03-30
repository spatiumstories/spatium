import { configureStore } from "@reduxjs/toolkit";
import roadmapSlice from "./roadmap-slice";

const store = configureStore({
    reducer: {
        roadmap: roadmapSlice.reducer,
    }
});

export default store;