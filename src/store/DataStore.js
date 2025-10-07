import { configureStore } from "@reduxjs/toolkit";
import DataSlice from './DataSlice';

const DataStore = configureStore({
  reducer: {
    data: DataSlice,
  },
});

export default DataStore;
