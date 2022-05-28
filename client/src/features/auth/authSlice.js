import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
  try {
    return await authService.register(user);
  } catch (error) {
    let message = (error.response &&
      error.response.data &&
      error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message)
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
  },
  extraReducers: (bldr) => {
    
    bldr.addCase(register.pending, (state) => {
      state.isLoading = true;
    });
    
    bldr.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      if (state.user) {
        state.isSuccess = true;
        state.isError = false;
      } else {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.msg;
      }
    });

    bldr.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload;
      state.user = null;
    });

  }
});

export { register, authSlice }
export const { reset } = authSlice.actions;
export default authSlice.reducer;
