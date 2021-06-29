import { configureStore } from '@reduxjs/toolkit'
import sessionReducer from './features/authentication/sessionSlice'
import viewsReducer from './features/views/viewsSlice'
import trainerReducer from './features/trainer/trainerSlice'

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    views: viewsReducer,
    trainer: trainerReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
