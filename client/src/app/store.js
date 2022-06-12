import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import deciderReducer from '../features/deciders/deciderSlice';
import nextrainReducer from '../features/nextrains/nextrainSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        deciders: deciderReducer,
        nextrains: nextrainReducer
    }
});