import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = '/api/users/';

const initialState = {
  users: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, thunkAPI) => {
  try {
    let token = thunkAPI.getState().auth.user.token;
    let ah = new Headers();
    ah.append('Content-Type', 'application/json');
    ah.append('Authorization', token);
    let response = await fetch(API_URL, { 
          method: 'GET',
          headers: ah
        });
    return await response.json();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});


const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    reset: () => initialState
  },
  extraReducers: (bldr) => {
    bldr.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
    });
    
    bldr.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
      if (state.users) {
        state.isSuccess = true;
        state.isError = false;
      } else {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.msg;
      }
    });

    bldr.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload;
    });
  }
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;