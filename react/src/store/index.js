import { configureStore } from '@reduxjs/toolkit'
import mainSlice from './reducers/mainSlice';

export default configureStore({
    reducer: {
        main: mainSlice
    }
});