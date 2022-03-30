import { createSlice } from '@reduxjs/toolkit';

const roadmapSlice = createSlice({
    name: 'roadmap',
    initialState: { 
        currentQuarter: "0",
        // Quarter 1: 0, Quarter 2: 1, Quarter 3: 2, Quarter 4: 3, Future: 4
    },
    reducers: {
        newQuarter(state, action) {
            state.currentQuarter = action.payload.quarter;
        },
    }
});

export const roadmapActions = roadmapSlice.actions;
export default roadmapSlice;