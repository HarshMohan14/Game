// src/redux/slices/randomWordSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getrandomWord = createAsyncThunk(
    "getrandomWord",
    async (thunkAPI) => {
      try {
        let validWord = '';
        while (!validWord) {
            const response = await axios.get('https://random-word-api.herokuapp.com/word?number=3');
            validWord = response.data.find(word => word.length >= 7) || '';
        }
        return validWord.toUpperCase();
      } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message });
      }
    }
);

const RandomWord = createSlice({
    name: "RandomWord",
    initialState: {
        randomWord: '',
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
      builder
        .addCase(getrandomWord.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getrandomWord.fulfilled, (state, action) => {
          state.loading = false;
          state.randomWord = action.payload;
        })
        .addCase(getrandomWord.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
});

export default RandomWord.reducer;
