import { createSlice } from '@reduxjs/toolkit';

const mobileSlice = createSlice({
    name: 'mobile',
    initialState: { 
        showMenu: false,
        activeMenu: 0,
    },
    reducers: {
        toggleMenu(state) {
            state.showMenu = !state.showMenu;
        },
        changeMenu(state, action) {
            state.activeMenu = action.payload.menu;
        }
    }
});

export const mobileActions = mobileSlice.actions;
export default mobileSlice;