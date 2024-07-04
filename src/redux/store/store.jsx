import { configureStore } from "@reduxjs/toolkit";
import randomword from "../slices/randomword";

const store = configureStore({
  reducer: {
    RandomWord: randomword,
  },
});

export default store;
