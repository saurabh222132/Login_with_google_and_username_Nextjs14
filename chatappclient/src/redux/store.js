import { configureStore } from "@reduxjs/toolkit";
import { CounterReducer } from "./features/counter/counterSlice";
import { AuthReducer } from "./features/auth/AuthSlice";
const Store = configureStore({
  reducer: {
    counter: CounterReducer,
    auth: AuthReducer,
  },
});

export default Store;
