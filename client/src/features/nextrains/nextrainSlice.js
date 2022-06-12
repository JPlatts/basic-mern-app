import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import nextrainService from './nextrainService'

const initialState = {
  nextrains: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

const getNextrains = createAsyncThunk('nextrains/getnextrains', async (_, thunkAPI) => {
  try {
    let token = thunkAPI.getState().auth.user.token;
    return await nextrainService.getNextrains(token);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const nextrainSlice = createSlice({
  name: 'nextrains',
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
    bldr.addCase(getNextrains.pending, (state) => {
      state.isLoading = true;
    });
    
    bldr.addCase(getNextrains.fulfilled, (state, action) => {
      state.isLoading = false;
      state.nextrains = action.payload.records;
      if (state.nextrains) {
        state.isSuccess = true;
        state.isError = false;
      } else {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.msg;
      }
    });

    bldr.addCase(getNextrains.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload;
    });
  }
});

export { getNextrains }
export const { reset } = nextrainSlice.actions;
export default nextrainSlice.reducer;
