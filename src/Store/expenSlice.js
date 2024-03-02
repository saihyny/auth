import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  expenses: [],
  total: 0,
  darkMode:false,
};
const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addItems: (state, action) => {
      state.expenses = action.payload;
      const sumOfMon = action.payload.reduce((acc, curr) => acc + parseInt(curr.mon), 0);
      state.total=sumOfMon;
    },
    removeItems: () => {},
    editItems: () => {},
    theme:(state)=>{
       state.darkMode=!state.darkMode;
    }
  },
});
export default expensesSlice.reducer;
export const { addItems, removeItems, editItems,theme } = expensesSlice.actions;
