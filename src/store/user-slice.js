import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: { 
        loggedin: false,
        publicKey: "",
        profilePic: "",
        userName: "",
    },
    reducers: {
        logIn(state, action) {
            state.loggedin = true;
            state.publicKey = action.payload.key;
            state.profilePic = action.payload.profilePic;
            state.userName = action.payload.userName;
        },
        logOut(state, action) {
            console.log("logging out...");
            state.loggedin = false;
            state.publicKey = "";
            state.profilePic = "";
            state.userName = "";
        }
    }
});

export const userActions = userSlice.actions;
export default userSlice;