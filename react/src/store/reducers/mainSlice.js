import { createSlice } from '@reduxjs/toolkit';

export const mainSlice = createSlice({
    name: 'main',
    initialState: {
        darkMode: localStorage.getItem('theme') === 'dark',
    },
    reducers: {
        setDarkMode: (state, action) => {
            state.darkMode = action.payload
        },
    }
})

// Action creators are generated for each case reducer function
export const { setDarkMode } = mainSlice.actions

export default mainSlice.reducer