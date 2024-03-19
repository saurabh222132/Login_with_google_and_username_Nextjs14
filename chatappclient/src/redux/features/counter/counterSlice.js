"use client";
import { createSlice } from "@reduxjs/toolkit";
import incCount from "./counterAPI";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  status: "ideal",
  value: 1,
};

export const countAsync = createAsyncThunk(
  "counter/asyncCounterValue",
  async (amount) => {
    console.log(amount);
    const value = await incCount({ incvalue: 4 });
    return value;
  }
);
const CounterSlice = createSlice({
  name: "counterSlice",
  initialState,
  reducers: {
    addValue: (state, action) => {
      state.value++;
    },
    subValue: (state, action) => {
      state.value--;
    },
    addByAmount: (state, action) => {
      console.log(action.payload, typeof action.payload);
      state.value = state.value + action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(countAsync.pending, (state, action) => {
        console.log("Value pending : ", state.counter.value);
      })
      .addCase(countAsync.fulfilled, (state, action) => {
        console.log("Value Fullfilled : ", state.counter.value);
      });
  },
});

export const { addValue, subValue, addByAmount } = CounterSlice.actions;
export const seeCountvalue = (state) => state.counter.value;

export const CounterReducer = CounterSlice.reducer;
