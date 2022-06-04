import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import deciderReducer from '../features/deciders/deciderSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        deciders: deciderReducer
    }
});