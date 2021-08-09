import { configureStore } from '@reduxjs/toolkit';
import { characterReducer } from 'features/character/character.slice';
import { attributesReducer } from 'features/attributes/attributes.slice';
import { skillsReducer } from 'features/skills/skills.slice'

export const store = configureStore({
  reducer: {
    character: characterReducer,
    attributes: attributesReducer,
    skills: skillsReducer
  },
  devTools: true,
});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch