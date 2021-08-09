import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    skillOption: [{
        id: 0,
        name: "Attack",
        level: 0,
        max: 4
    }, {
        id: 1,
        name: "Stealth",
        level: 0,
        max: 4
    }, {
        id: 2,
        name: "Archery",
        level: 0,
        max: 4
    }, {
        id: 3,
        name: "Learnability",
        level: 0,
        max: 4
    }, {
        id: 4,
        name: "Survival",
        level: 0,
        max: 4
    }, {
        id: 5,
        name: "Medicine",
        level: 0,
        max: 4
    }, {
        id: 6,
        name: "Intimidation",
        level: 0,
        max: 4
    }, {
        id: 7,
        name: "Insight",
        level: 0,
        max: 4
    }, {
        id: 8,
        name: "Appearance",
        level: 0,
        max: 4
    }, {
        id: 9,
        name: "Manipulation",
        level: 0,
        max: 4
    }]
}

export const SkillsSlice = createSlice({
    name: 'skills',
    initialState,
    reducers: {
        incrementSkill: (state, action) => {

            state.skillOption = state.skillOption.map(skill => {
                // Skill Limit Based On Basic Parameters

                // Attach Power
                if (action.payload.id == 0 && action.payload.attributes.strength == skill.level) return skill;
                // Stealth & Archery
                if (
                    (action.payload.id == 1 || action.payload.id == 2) &&
                    action.payload.attributes.agility == skill.level) return skill;

                // Learnability,Survival & medicine
                if (
                    (action.payload.id == 3 || action.payload.id == 4 || action.payload.id == 5) &&
                    action.payload.attributes.intelligence == skill.level) return skill;

                if (
                    (action.payload.id == 6 || action.payload.id == 7 || action.payload.id == 8 || action.payload.id == 9) &&
                    action.payload.attributes.charisma == skill.level) return skill;


                if (skill.id === action.payload.id && skill.max >= skill.level) skill.level += 1
                return skill
            })
        },
        descrementSkill: (state, action) => {

            state.skillOption = state.skillOption.map(skill => {
                if (skill.id === action.payload.id) skill.level -= 1
                return skill
            })
        },
        setSkillOptions: (state, action) => {
            state.skillOption = (action.payload && action.payload.skillOption) ? action.payload.skillOption : initialState.skillOption
        }
    },
});

// Actions
export const {
    incrementSkill, descrementSkill,
    setSkillOptions
} = SkillsSlice.actions

export const skillsReducer = SkillsSlice.reducer;
