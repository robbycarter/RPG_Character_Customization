import { createSlice } from '@reduxjs/toolkit';

export const AttributesSlice = createSlice({
    name: 'attributes',
    initialState: {
        strength: 0,
        agility: 0,
        intelligence: 0,
        charisma: 0,
        life: 3,
        evasion: 10,
        vigor: 0
    },
    reducers: {
        incrementCharacterStrength: (state => {
            state.strength += 1
            state.life += 1
        }),
        decrementCharacterStrength: (state => {
            state.strength -= 1
            state.life -= 1
        }),
        incrementCharacterAgility: (state => {
            state.agility += 1
            state.evasion += 1
            state.vigor = state.agility + state.intelligence
        }),
        decrementCharacterAgility: (state => {
            state.agility -= 1
            state.evasion -= 1
            state.vigor = state.agility + state.intelligence
        }),
        incrementCharacterIntelligence: (state => {
            state.intelligence += 1
            state.vigor = state.agility + state.intelligence
        }),
        decrementCharacterIntelligence: (state => {
            state.intelligence -= 1
            state.vigor = state.agility + state.intelligence
        }),
        incrementCharacterCharisma: (state => {
            state.charisma += 1
        }),
        decrementCharacterCharisma: (state => {
            state.charisma -= 1
        }),
        setAttribute: (state, action) => {
            state.strength = (action.payload.strength) ? action.payload.strength : 0
            state.agility = (action.payload.agility) ? action.payload.agility : 0
            state.intelligence = (action.payload.intelligence) ? action.payload.intelligence : 0
            state.charisma = (action.payload.charisma) ? action.payload.charisma : 0
            state.life = (action.payload.life) ? action.payload.life : 0
            state.evasion = (action.payload.evasion) ? action.payload.evasion : 0
            state.vigor = (action.payload.vigor) ? action.payload.vigor : 0
        }
    },
});

// Actions
export const {
    incrementCharacterStrength, decrementCharacterStrength,
    incrementCharacterAgility, decrementCharacterAgility,
    incrementCharacterIntelligence, decrementCharacterIntelligence,
    incrementCharacterCharisma, decrementCharacterCharisma,
    setAttribute
} = AttributesSlice.actions

export const attributesReducer = AttributesSlice.reducer;
