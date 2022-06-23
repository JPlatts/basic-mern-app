import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import stationService from './stationService'

const initialState = {
  stations: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

const searchStations = createAsyncThunk('stations/searchstations', async (searchRequest, thunkAPI) => {
  try {
    let token = thunkAPI.getState().auth.user.token;
    return await stationService.searchStations(searchRequest, token);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const stationSlice = createSlice({
  name: 'stations',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
      state.stations = [];
    },
  },
  extraReducers: (bldr) => {
    bldr.addCase(searchStations.pending, (state) => {
      state.isLoading = true;
    });
    
    bldr.addCase(searchStations.fulfilled, (state, action) => {
      state.isLoading = false;
      state.stations = action.payload.records;
      if (state.stations) {
        state.isSuccess = true;
        state.isError = false;
      } else {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.msg;
      }
    });

    bldr.addCase(searchStations.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload;
    });
  }
});

export { searchStations }
export const { reset } = stationSlice.actions;
export default stationSlice.reducer;
