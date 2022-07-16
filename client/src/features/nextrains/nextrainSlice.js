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

const addStation = createAsyncThunk('nextrains/addstation', async (station, thunkAPI) => {
  try {
    let token = thunkAPI.getState().auth.user.token;
    return await nextrainService.addStation(token, station);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message)
  }
});

const deleteStation = createAsyncThunk('nextrains/deletestation', async (station, thunkAPI) => {
  try {
    let token = thunkAPI.getState().auth.user.token;
    return await nextrainService.deleteStation(token, station);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message)
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
    /* getNextrains */
    bldr.addCase(getNextrains.pending, (state) => {
      state.isLoading = true;
    });
    
    bldr.addCase(getNextrains.fulfilled, (state, action) => {
      state.isLoading = false;
      state.nextrains = action.payload.nextrains;
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

    /* addStation */
    bldr.addCase(addStation.pending, (state) => {
      state.isLoading = true;
    });
    
    bldr.addCase(addStation.fulfilled, (state, action) => {
      state.isLoading = false;
      state.nextrains = action.payload.nextrains;
      if (state.nextrains) {
        state.isSuccess = true;
        state.isError = false;
      } else {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.msg;
      }
    });

    bldr.addCase(addStation.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload;
    });

    /* deleteStation */
    bldr.addCase(deleteStation.pending, (state) => {
      state.isLoading = true;
    });
    
    bldr.addCase(deleteStation.fulfilled, (state, action) => {
      state.isLoading = false;
      state.nextrains = action.payload.nextrains;
      if (state.nextrains) {
        state.isSuccess = true;
        state.isError = false;
      } else {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.msg;
      }
    });

    bldr.addCase(deleteStation.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload;
    });
  }
});

export { getNextrains, addStation, deleteStation }
export const { reset } = nextrainSlice.actions;
export default nextrainSlice.reducer;
