import { createSlice } from "@reduxjs/toolkit";


const saveSlice = createSlice({
  name: "save",
  initialState: {
    information: [],
    savedNewsIds: [],
  },
  reducers: {
    setInformation: (state, action) => {
      const newItem = action.payload;
      state.information.push(newItem);
      state.savedNewsIds.push(newItem.id);
    },
    removeInformation: (state, action) => {
      const idToRemove = action.payload.id;
      
      const indexToRemove = state.information.findIndex(
        (item) => item.id === idToRemove
      );
    
      if (indexToRemove !== -1) {
        state.information.splice(indexToRemove, 1);
        
        state.savedNewsIds = state.savedNewsIds.filter(
          (id) => id !== idToRemove
        );
      }
    },
    
  },
});

export const { setInformation, removeInformation } = saveSlice.actions;
export default saveSlice.reducer;
