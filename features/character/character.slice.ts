import { createSlice } from '@reduxjs/toolkit';

export const CharacterSlice = createSlice({
  name: 'character',
  initialState: {
    name: "",
    race: ""
  },
  reducers: {
    setCharacterName: (state, action) => {
      state.name = action.payload
    },
    resetCharacterName: (state) => {
      state.name = ""
    },
    setCharacterRace: (state, action) => {
      state.race = action.payload
    },
  },
});

// Actions
export const {
  setCharacterName, resetCharacterName,
  setCharacterRace
} = CharacterSlice.actions

export const characterReducer = CharacterSlice.reducer;
