import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    
    isLoggedIn: false,
    userData: {},
      posts: [],
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action) {
            state.isLoggedIn = true;
            state.userData = action.payload;
        },

        logout(state, action) {
            state.isLoggedIn = false;
        },
        setPosts(state,action){
                state.posts = action.payload
            
        }
    },
});

export const { login, logout, setPosts } = authSlice.actions;

export default authSlice.reducer;
