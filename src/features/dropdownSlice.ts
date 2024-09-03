import { createSlice } from '@reduxjs/toolkit';

const dropdownSlice = createSlice({
  name: 'dropdown',
  initialState: {
    isOpen: false,
  },
  reducers: {
    openDropdown: (state) => {
      state.isOpen = true;
    },
    closeDropdown: (state) => {
      state.isOpen = false;
    },
    toggleDropdown: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { openDropdown, closeDropdown, toggleDropdown } = dropdownSlice.actions;
export default dropdownSlice.reducer;