import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import deciderService from './deciderService'

const initialState = {
  deciders: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

const getDeciders = createAsyncThunk('deciders/getdeciders', async (_, thunkAPI) => {
  try {
    let token = thunkAPI.getState().auth.user.token;
    return await deciderService.getDeciders(token);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const addItem = createAsyncThunk('deciders/additem', async (deciderItem, thunkAPI) => {
  try {
    let token = thunkAPI.getState().auth.user.token;
    return await deciderService.addItem(token, deciderItem);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message)
  }
});


const deleteItem = createAsyncThunk('deciders/deleteitem', async (deciderItem, thunkAPI) => {
  try {
    let token = thunkAPI.getState().auth.user.token;
    return await deciderService.deleteItem(token, deciderItem);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message)
  }
});

const deciderSlice = createSlice({
  name: 'deciders',
  initialState,
  reducers: {
    reset: () => initialState,
    decide: (state, action) => {
      let dec = state.deciders.find(d => d._id === action.payload);
      let ix = Math.floor(Math.random() * dec.items.length);
      while (dec.items[ix].isChosen) { //never choose what is currently chosen
        ix = Math.floor(Math.random() * dec.items.length);
      }
      dec.items.map((i) => i.isChosen = false);
      dec.items[ix].isChosen = true;
    }
  },
  extraReducers: (bldr) => {
    bldr.addCase(getDeciders.pending, (state) => {
      state.isLoading = true;
    });
    
    bldr.addCase(getDeciders.fulfilled, (state, action) => {
      state.isLoading = false;
      state.deciders = action.payload.deciders;
      if (state.deciders) {
        state.isSuccess = true;
        state.isError = false;
      } else {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.msg;
      }
    });

    bldr.addCase(getDeciders.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload;
    });


    bldr.addCase(addItem.pending, (state) => {
      state.isLoading = true;
    });
    
    bldr.addCase(addItem.fulfilled, (state, action) => {
      state.isLoading = false;
      
      if (action.payload.decider) {
        state.isSuccess = true;
        state.isError = false;
        let dec = state.deciders.find((d) => d._id === action.payload.decider._id);
        dec.items = action.payload.decider.items;
      } else {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.msg;
      }
    });

    bldr.addCase(addItem.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload;
    });

    bldr.addCase(deleteItem.pending, (state) => {
      state.isLoading = true;
    });
    
    bldr.addCase(deleteItem.fulfilled, (state, action) => {
      state.isLoading = false;
      
      if (action.payload.decider) {
        state.isSuccess = true;
        state.isError = false;
        let dec = state.deciders.find((d) => d._id === action.payload.decider._id);
        dec.items = action.payload.decider.items;
      } else {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.msg;
      }
    });

    bldr.addCase(deleteItem.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload;
    });

    



  }
});

export { getDeciders, addItem, deleteItem }
export const { reset, decide } = deciderSlice.actions;
export default deciderSlice.reducer;